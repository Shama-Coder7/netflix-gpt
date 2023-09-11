import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTopRatedMovies } from '../utils/moviesSlice';

const useTopRatedMovies = () => {
  // Fetch Data from TMDB Api and update store
  const dispatch = useDispatch();

  // memoization
  const topRatedMovies = useSelector(
    (store) => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?page=1',
      API_OPTIONS
    );

    const json = await data.json();
    console.log('top-rated', json.results);
    dispatch(addTopRatedMovies(json.results)); // setting all the movies which are stored on pur movie slice
  };

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
