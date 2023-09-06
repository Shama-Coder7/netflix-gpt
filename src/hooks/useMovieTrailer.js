import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  // fetching trailer video and updating the store with trailer video data
  //   // either we can create state variable for getting trailer Id
  //   const [trailerId, setTrailerId] = useState(null);

  //   Or we can use Redux Store
  // -> if we use redux then no need to create state variable
  // -> when you made an api call and it return me some video

  useEffect(() => {
    getMovieVideo();
  }, []);

  const getMovieVideo = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/' +
        { movieId } +
        '/videos?language=en-US',
      API_OPTIONS
    );

    // movieId for different movies.

    const json = await data.json();
    // console.log(json);

    const trailer = json.results?.filter((video) => video.type === 'Trailer');

    // const trailer = filterData.length ? filterData[0] : json.results[0];
    // console.log(trailer);
    // it contain the youtube video key

    // setTrailerId(trailer.key);

    dispatch(addTrailerVideo(trailer));
  };
};

export default useMovieTrailer;
