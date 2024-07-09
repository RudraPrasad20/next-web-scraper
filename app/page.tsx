"use client";
import { useState } from "react";
import axios from "axios";

function App() {
  const [download, setDownload] = useState("");
  const [input, setInput] = useState("");

  const getDownloads = async () => {
    try {
      const res = await axios.get(`/api/getDownloads?input=${input}`);
      const { downloads } = res.data;
      setDownload(downloads);
    } catch (error) {
      console.error("Error fetching downloads:", error);
      setDownload("Error fetching downloads");
    }
  };

  return (
    <div className="flex flex-col text-center align-middle items-center mt-16">
      <div>
        <h1 className=" font-bold text-3xl">
          You can see the total weekly downloads of any npm package
        </h1>
        <h2 className=" font-bold text-xl">Just enter the package name here</h2>
      </div>
      <input
        type="text"
        value={input}
        className="text-black p-2 border-blue-600 border-2 rounded-lg"
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button
        onClick={getDownloads}
        className="bg-white p-2 rounded-md text-black"
      >
        Enter
      </button>
      <p className=" text-blue-400 text-3xl">
        This package has <span className=" text-rose-400">{download}</span> downloads so far
      </p>
    </div>
  );
}

export default App;
