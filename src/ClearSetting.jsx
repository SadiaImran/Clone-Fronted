import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Settings from "./Settings.jsx";

function ClearSetting() {
  const [settingsVisible, setSettingsVisible] = useState(false);

  const showSettings = () => {
    setSettingsVisible(true);
  };

  return (
    <>
      <section className="py-10 md:px-20 md:py-10">
        <article className="flex font-medium tracking-wide text-lg lg:text-xl
        justify-center md:justify-end items-center gap-6">
          <div className="flex cursor-pointer items-center gap-2">
            <FaRegTrashAlt className="text-base md:text-xl lg:text-3xl" />
            <span>Clear Chat</span>
          </div>
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={showSettings}
          >
            <IoSettingsOutline className="text-base md:text-xl lg:text-3xl" />
            <span>Setting</span>
          </div>
        </article>
      </section>
      {/* section 3: Settings section */}
      {settingsVisible && (
        <Settings setSettingsVisible={setSettingsVisible} />
      )}
    </>
  );
}

export default ClearSetting;
