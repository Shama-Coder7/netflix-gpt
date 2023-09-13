import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addNowPlayingMovies } from '../utils/moviesSlice';

const useNowPlayingMovies = () => {
  // Fetch Data from TMDB Api and update store
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?page=1',
      API_OPTIONS
    );

    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowPlayingMovies(json.results)); // setting all the movies which are stored on pur movie slice
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
    // this will be callwed only when nowPlayingMovies has no data
  }, []);
};

export default useNowPlayingMovies;
