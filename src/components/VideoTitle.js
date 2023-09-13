import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[30%] md:pt-[20%] px-8 md:px-20 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-xl py-3 md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="flex">
        <button className="flex bg-white text-black md:mx-0 -my-2 md:my-0 py-0 px-3 md:py-2 md:px-6 text-lg rounded-sm md:hover:bg-opacity-70">
          <FaPlay className="m-1 p-1 md:m-1" /> Play
        </button>
        <button className=" hidden md:inline-block md:flex md:mx-4 bg-gray-500 text-black p-2 px-8 text-lg rounded-sm">
          <IoMdInformationCircleOutline className="m-1" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
