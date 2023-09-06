import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="">
        <button className="bg-white text-black p-2 px-8 text-lg rounded-sm hover:bg-opacity-70">
          ▶ Play
        </button>
        <button className="mx-4 bg-gray-500 text-black p-2 px-8 text-lg rounded-sm">
        ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
