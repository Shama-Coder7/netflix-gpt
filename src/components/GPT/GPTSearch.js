import React from 'react';
import GPTSearchInput from './GPTSearchInput';
import GPTMovieSuggestions from './GPTMovieSuggestions';
import { NETFLIX_BACKGROUND } from '../../utils/constants';

const GPTSearch = () => {
  return (
    <>
      <div className="absolute inset-0">
        <div className="-z-10 fixed inset-0">
          <img
            className="absolute top-0 left-0 min-w-full min-h-full object-cover"
            src={NETFLIX_BACKGROUND}
            alt="netflix-background"
          />
        </div>
        <div className="">
          <GPTSearchInput />

          <GPTMovieSuggestions />
        </div>
      </div>
    </>
  );
};

export default GPTSearch;
