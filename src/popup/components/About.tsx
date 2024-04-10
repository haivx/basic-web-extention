import React from "react";
import ScreenCapture from "../../lib/ScreenCapture";

function About() {
  const onToggleCapture = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const response = await chrome.tabs.sendMessage(tab.id, {
      greeting: "hello",
    });
    console.log("nay thi heelo", response);
  };

  const onCapture = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id,  {greeting: "hello"}, function(response) {
        console.log('response', response)
      });
    });
  }

  return (
    <div className="max-w-[300px] mx-auto flex gap-3">
        <button
          onClick={onCapture}
          type="button"
          className="mx-auto w-[250px] mt-10 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Capture
        </button>
    </div>
  );
}

export default About;
