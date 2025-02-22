import { useState, useRef, useEffect } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { TbClipboardText } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { LiaLightbulbSolid } from "react-icons/lia";
import PromptBox from "./PromptBox.jsx";
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AskYourData() {
  const [textareaContent, setTextareaContent] = useState("");
  const [isPromptClicked, setIsPromptClicked] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null); // Ref for scrolling to bottom

  const promptText = [
    `Given that Monsanto made representations about Roundup's efficacy on the label, how can the plaintiffs demonstrate that those representations amounted to an express warranty under the UCC when the plaintiffs did not purchase Roundup directly from Monsanto?`,
    `It’s clear that the EPA classified glyphosate, Roundup's active ingredient, as "not likely to be carcinogenic." However, doesn't the EPA's approval of Roundup's label without a cancer warning lack the force of law required to preempt the plaintiff's state law failure-to-warn claim?`,
    `Assuming the plaintiffs provided timely notice to Monsanto, how can they demonstrate that the limited remedy of just replacing the product failed its essential purpose, given that Monsanto was allegedly unwilling to do so in a timely manner?`
  ];

  // Effect to scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handlePromptClick = (text) => {
    setTextareaContent(text);
    setIsPromptClicked(true);
  };

  const handleArrowClick = () => {
    if (textareaContent.trim() === "") {
      toast.error('Prompt cannot be empty', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
      return;
    }

    setIsPromptClicked(true);
    setIsThinking(true);
    setMessages([...messages, { text: textareaContent, isUser: true }]);
    setTextareaContent(""); // Clear the textarea

    // Simulate 'thinking' period
    setTimeout(() => {
      setIsThinking(false);

      // Simulate async response generation
      const simulatedResponse = `RResponse to: ${textareaContent}`;
      let index = 0;

      const interval = setInterval(() => {
        if (index < simulatedResponse.length) {
          setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage && !lastMessage.isUser) {
              return [
                ...prevMessages.slice(0, -1),
                { text: lastMessage.text + simulatedResponse[index], isUser: false }
              ];
            } else {
              return [...prevMessages, { text: simulatedResponse[index], isUser: false }];
            }
          });
          index++;
        } else {
          clearInterval(interval);
        }
      }, 10); // Adjust delay as needed

    }, 5000); // 5 seconds thinking period
  };

  return (
    <section className={`container md:h-screen flex flex-col items-center ${isPromptClicked ? 'justify-end' : 'justify-center'}`}>
      {!isPromptClicked && (
        <>
          <h1 className="text-center text-4xl sm:text-5xl  md:text-6xl lg:text-7xl font-bold mb-8">Ask your data</h1>
          <div className="flex flex-col items-center w-4/5 gap-10">
            <div className=" w-full py-5 px-6 md:py-10  md:px-12 bg-white rounded-lg flex justify-between items-center">
              <textarea
                id="main-text"
                value={textareaContent}
                onChange={(e) => setTextareaContent(e.target.value)}
                placeholder="Example: Can you provide an overview of the key legal arguments and the court's decision against Monsanto?"
                className="w-full text-xs sm:text-sm lg:text-[1.025rem] outline-none resize-none"
              ></textarea>
              <PiPaperPlaneRightFill
                className="text-arrow text-base md:text-lg lg:text-2xl cursor-pointer"
                onClick={handleArrowClick}
              />
            </div>
            <div className="grid  grid-cols-1 md:grid-cols-3  w-full gap-2 justify-between pb-10 ">
              {promptText.map((text, index) => (
                <PromptBox key={index} text={text} onClick={() => handlePromptClick(text)} />
              ))}
            </div>
          </div>
        </>
      )}

      <div className={`w-full flex flex-col gap-4 overflow-y-auto ${isPromptClicked ? 'pb-20' : 'pb-0'}`}>
        {messages.map((msg, index) => (
          <div key={index} className={`p-4 rounded-lg ${msg.isUser ? 'bg-chatPrompt text-black self-end w-auto max-w-xl break-words' : 'bg-gray-200 self-start break-words'}`}>
            {!msg.isUser && (
              <div className="flex items-center ">
                {msg.text.includes("Response to:") && <LiaLightbulbSolid className="text-yellow-500 mr-2" />}
                {msg.text.includes("Response to:") && <TbClipboardText className="text-blue-500 mr-2" />}
                <span>{msg.text}</span>
              </div>
            )}
            {msg.isUser && <span >{msg.text}</span>}
          </div>
        ))}
        
        {isThinking && (
          <div className="flex justify-center items-center gap-2 self-start bg-gray-200 p-4 rounded-lg break-words">
            <IoSettings />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box for Prompts */}
      {isPromptClicked && (
        <div className=" w-full my-5 py-5 md:py-10 px-6 md:px-12 bg-white rounded-lg flex justify-between items-centerrounded-t-lg shadow-lg">
        <textarea
          id="main-text"
          value={textareaContent}
          onChange={(e) => setTextareaContent(e.target.value)}
          placeholder="Example: Can you provide an overview of the key legal arguments and the court's decision against Monsanto?"
          className="w-full text-sm lg:text-[1.025rem] outline-none resize-none"
        ></textarea>
        <PiPaperPlaneRightFill
          className="text-arrow text-base md:text-lg lg:text-2xl cursor-pointer"
          onClick={handleArrowClick}
        />
      </div>
      )}

      {/* toast error */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
        newestOnTop={true}
        theme="light"
        transition={Flip}
      />
    </section>
  );
}

export default AskYourData;
