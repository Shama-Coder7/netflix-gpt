import React, { useRef } from 'react';
import lang from '../../utils/LanguageConstant';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../../utils/openai';
import { API_OPTIONS } from '../../utils/constants';
import { addGptMovieResult } from '../../utils/gptSlice';

const GPTSearchInput = () => {
  const languageKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);

  const dispatch = useDispatch();

  // movie search in TMDB Database

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
        movie +
        '&include_adult=false&language=en-US&page=1',
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };

  const handleSearchGPTClick = async () => {
    console.log(searchText.current.value);

    // Make an API call to gPt api and get movie Results

    const gptQuery =
      'Act as a Movie Recommendation system and suggest some movies for the query : ' +
      searchText.current.value +
      ' only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya ';

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    if (!gptResults.choices) {
      // TODO: Wring Error Handling
    }

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(',');

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    ); // Array of arrays

    console.log(gptResults.choices);
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-9 py-2 p-4 m-2 rounded-sm md:rounded-lg"
          placeholder={lang[languageKey].gptSearchPlaceholder}
        />
        <button
          className=" col-span-3 py-2 p-4 m-2 bg-red-700 text-white rounded-sm md:rounded-lg"
          onClick={handleSearchGPTClick}
        >
          {lang[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchInput;
