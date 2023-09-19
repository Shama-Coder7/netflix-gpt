import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addUpcomingMovies } from '../utils/moviesSlice';

const useUpcomingMovies = () => {
  // Fetch Data from TMDB Api and update store
  const dispatch = useDispatch();

  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, []);

  const getUpcomingMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?page=1',
      API_OPTIONS
    );

    const json = await data.json();
    console.log('upcoming-movies', json?.results);
    dispatch(addUpcomingMovies(json?.results)); // setting all the movies which are stored on pur movie slice
  };
};

export default useUpcomingMovies;
