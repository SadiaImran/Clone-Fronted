/* eslint-disable react/prop-types */

function PromptBox({ text, onClick }) {
  return (
    <div
   className="text-headerBlack bg-box rounded-xl py-4 px-6 text-sm lg:text-xl overflow-hidden h-full font-normal cursor-pointer">
    <p className="line-clamp-4" onClick={() => onClick(text)}>
      {text}</p>
    </div>
  );
}

export default PromptBox;
