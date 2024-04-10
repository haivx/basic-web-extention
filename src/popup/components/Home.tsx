import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const onLogin = () => {
    navigate("/about");
  };
  return (
    <div className="max-w-[300px] mx-auto">
      <p className="mt-10">Welcome back!</p>
      <p className="mb-0">The GCDee, The AI detection system! </p>
      <div className="my-6 flex align-items flex-col">
        <button
          onClick={onLogin}
          type="button"
          className="mx-auto w-[250px] mt-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
