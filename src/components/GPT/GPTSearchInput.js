import React from 'react';
import lang from '../../utils/LanguageConstant';
import { useSelector } from 'react-redux';

const GPTSearchInput = () => {
  const languageKey = useSelector(store => store.config.lang) 
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="col-span-9 py-2 p-4 m-2"
          placeholder={lang[languageKey].gptSearchPlaceholder}
        />
        <button className=" col-span-3 py-2 p-4 m-2 bg-red-700 text-white rounded-lg">
          {lang[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchInput;
