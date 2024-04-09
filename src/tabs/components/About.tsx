import React from "react";
import ScreenCapture from "../../lib/ScreenCapture";

function About() {
    const onToggleCapture = async() => {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        console.log("tab", tab)
        const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
        console.log("nay thi heelo", response)
    }

  return (
    <div>
      About
      <div>
        <button onClick={onToggleCapture}>
          Click here to toggle ScreenCapture
        </button>
        <hr />
      </div>
    </div>
  );
}

export default About;
