import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addPopularMovies } from '../utils/moviesSlice';

const usePopularMovies = () => {
  // Fetch Data from TMDB Api and update store
  const dispatch = useDispatch();

  const popularMovies = useSelector((store) => store.movies.popularMovies);

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?page=1',
      API_OPTIONS
    );

    const json = await data.json();
    console.log("popular",json.results);
    dispatch(addPopularMovies(json.results)); // setting all the movies which are stored on pur movie slice
  };

};

export default usePopularMovies;
