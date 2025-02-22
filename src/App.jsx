/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/App.jsx
import Header from "./Header.jsx";
import ClearSetting from "./ClearSetting.jsx";
import AskYourData from "./AskYourData.jsx";

import React, { useState } from "react";


function App() {
  

  return (
    <>
      <main className="font-Roboto ">
        <Header></Header>
        {/* body section */}
        <body className="bg-bodyWhite">
          {/* section 1 : option Clear and Setting section */}
          <ClearSetting></ClearSetting>
          {/*section 2 :  Ask your data */}
          <AskYourData></AskYourData>
        </body>
      </main>
    </>
  );
}

export default App;
