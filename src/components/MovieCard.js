import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({ posterPath }) => {
  if (!posterPath)
    return (
      <div className="w-36 md:w-48 pr-4">
        <img
          src="https://cdn.boxofficebuz.com/no_poster_available.svg"
          alt="No-Movie"
        />
      </div>
    );
  return (
    <div className="w-36 md:w-48 pr-4">
      <img src={IMG_CDN_URL + posterPath} alt="MovieCard" />
    </div>
  );
};

export default MovieCard;
