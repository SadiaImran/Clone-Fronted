/* eslint-disable react/prop-types */
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

function Settings({ setSettingsVisible }) {
  // Temperature
  const [value, setValue] = useState(0);
  // Search
  const [settingsValue, setSettingsValue] = useState('Select number');
  const [dropDown, setDropDown] = useState(false);
  // Model
  const [modelValue, setModelValue] = useState('Select model');
  const [modelDropDown, setModelDropDown] = useState(false);

  const dropDownRef = useRef(null);
  const modelDropDownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target) &&
        modelDropDownRef.current &&
        !modelDropDownRef.current.contains(event.target)
      ) {
        setDropDown(false);
        setModelDropDown(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function checkPrompt() {
    const content = document.querySelector('.prompt').value;
    const errorPrompt = document.querySelector('.error-prompt');
    const errorTemperature = document.querySelector('.error-temperature');
    const errorSearch = document.querySelector('.error-search');
    const errorModal = document.querySelector('.error-modal');
    
    // Check content in prompt
    if (content.length < 2) {
      errorPrompt.classList.add('visible');
      errorPrompt.classList.remove('hidden');
    } else {
      errorPrompt.classList.add('hidden');
      errorPrompt.classList.remove('visible');
    }
    
    // Check for temperature value
    if (value === 0) {
      errorTemperature.classList.add('visible');
      errorTemperature.classList.remove('hidden');
    } else {
      errorTemperature.classList.add('hidden');
      errorTemperature.classList.remove('visible');
    }
    
    // Check for search value
    if (settingsValue === 'Select number') {
      errorSearch.classList.add('visible');
      errorSearch.classList.remove('hidden');
    } else {
      errorSearch.classList.add('hidden');
      errorSearch.classList.remove('visible');
    }
    
    // Check for model value
    if (modelValue === 'Select model') {
      errorModal.classList.add('visible');
      errorModal.classList.remove('hidden');
    } else {
      errorModal.classList.add('hidden');
      errorModal.classList.remove('visible');
    }
  }

  return (
    <>
      {/* Overlay for dimming background */}
      <div className="fixed inset-0 bg-black bg-opacity-80 z-40"></div>

      {/* Section 3: Settings section */}
      <section className="w-auto h-screen fixed top-0 right-0 z-50 bg-white p-6 overflow-y-auto">
        {/* Article 1: Cross X */}
        <article className="flex justify-between gap-10 items-center mb-10">
          <h3 className="text-lg font-medium">
            Configure Answer Generation
          </h3>
          <RxCross2
            className="cursor-pointer text-xl"
            onClick={() => setSettingsVisible(false)}
          />
        </article>

        {/* Article 2: Prompt template */}
        <article className="mb-8">
          <h4 className="text-md font-normal">Override prompt template</h4>
          <textarea
            placeholder="Tell us a little bit about yourself"
            rows={3}
            className="prompt border-[1px] text-sm rounded-lg border-headerGray w-full mt-2 p-2 overflow-y-auto outline-none"
          ></textarea>
          <div className="error-container">
            <span className="error-prompt text-xs font-medium tracking-wide text-red-500 lowercase mt-2 hidden">Prompt template must be at least 2 characters</span>
          </div>
        </article>

        {/* Article 3: Temperature */}
        <article className="mb-6">
          <h4 className="text-md font-normal mb-2">Temperature</h4>
          <div className="flex gap-4 items-center">
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-10/12 h-1 bg-headerBlack rounded-lg appearance-none cursor-pointer"
            />
            <p>{value}</p>
          </div>
          <div className="error-container">
            <span className="error-temperature text-xs font-medium tracking-wide text-red-500 lowercase mt-2 hidden">Required</span>
          </div>
        </article>

        {/* Article 4: Search Results */}
        <article className="mb-6">
          <h4 className="text-md font-normal">
            Retrieve this many search results:
          </h4>
          <div className="relative mt-2" ref={dropDownRef}>
            <span
              className="flex justify-between items-center cursor-pointer border-[1px] border-headerGray p-2 rounded-lg text-sm"
              onClick={() => setDropDown(!dropDown)}
            >
              {settingsValue}{" "}
              <FaChevronDown className="text-xs text-headerGray" />
            </span>
            {dropDown && (
              <ul className="absolute z-50 w-full border-[1px] border-headerGray bg-white flex flex-col justify-between shadow-lg rounded-lg mt-2 text-sm">
                {[1, 2, 3].map((option) => (
                  <li
                    key={option}
                    className="flex items-center cursor-pointer gap-3 p-3 hover:bg-slate-100"
                    onClick={() => {
                      setSettingsValue(option);
                      setDropDown(false);
                    }}
                  >
                    {settingsValue === option && (
                      <FaCheck className="text-headerBlack" />
                    )}
                    {settingsValue !== option && (
                      <FaCheck className="text-headerBlack opacity-0 pointer-events-none" />
                    )}
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="error-container">
              <span className="error-search text-xs font-medium tracking-wide text-red-500 lowercase mt-2 hidden">Please select any value for search results.</span>
            </div>
          </div>
        </article>

        {/* Article 5: Select Model */}
        <article>
          <h4 className="text-md font-normal">Select Model:</h4>
          <div className="relative mt-2" ref={modelDropDownRef}>
            <span
              className="flex justify-between items-center cursor-pointer border-[1px] border-headerGray p-3 rounded-lg text-sm"
              onClick={() => setModelDropDown(!modelDropDown)}
            >
              {modelValue}
              <FaChevronDown className="text-xs text-headerGray ml-auto" />
            </span>
            {modelDropDown && (
              <ul className="absolute z-50 w-full border-[1px] border-headerGray bg-white flex flex-col shadow-lg rounded-lg mb-2 top-auto bottom-full text-sm">
                {[
                  "GPT-3.0",
                  "GPT-3.5 Turbo",
                  "GPT-4.0",
                  "gemini-1.5-flash",
                ].map((option) => (
                  <li
                    key={option}
                    className="flex items-center cursor-pointer gap-2 p-2 hover:bg-slate-100 text-sm"
                    onClick={() => {
                      setModelValue(option);
                      setModelDropDown(false);
                    }}
                  >
                    {modelValue === option && (
                      <FaCheck className="text-headerBlack" />
                    )}
                    {modelValue !== option && (
                      <FaCheck className="text-headerBlack opacity-0 pointer-events-none" />
                    )}
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="error-container">
              <span className="error-modal text-xs font-medium tracking-wide text-red-500 lowercase mt-2 hidden">Please select any value for model.</span>
            </div>
          </div>
        </article>

        {/* Article 6: Button */}
        <article className="mt-10">
          <button className="bg-button px-4 py-2 rounded-lg font-normal text-md text-white" onClick={checkPrompt}>
            Submit
          </button>
        </article>
      </section>
    </>
  );
}

export default Settings;
