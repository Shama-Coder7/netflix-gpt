import React from 'react'
import GPTSearchInput from './GPTSearchInput'
import GPTMovieSuggestions from './GPTMovieSuggestions';
import { NETFLIX_BACKGROUND } from '../../utils/constants';

const GPTSearch = () => {
  return (
    <div>
     <div className="absolute -z-10">
        <img src={NETFLIX_BACKGROUND} alt="netflix-background" />
      </div>
      <GPTSearchInput/>
      <GPTMovieSuggestions/>
    </div>
  )
}

export default GPTSearch