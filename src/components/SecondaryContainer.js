import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies); // subscribing all the movies which are stored on our movie slice
  return (
    // movies or movies.nowPlayingMovies &&
    movies && (
      <div className=" bg-black">
        <div className="-mt-40 relative z-30">
          <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
          {/* <MovieList title={'Trending'} movies={movies.nowPlayingMovies} /> */}
          <MovieList
            title={'Top Rated Movies'}
            movies={movies.addTopRatedMovies}
          />

          <MovieList title={'Popular'} movies={movies.addPopularMovies} />
          <MovieList
            title={'UpComing Movies'}
            movies={movies.addUpcomingMovies}
          />
        </div>

        {/* Movie List- Popular
     -MovieCards * n
     MovieList - Trending
      so on 
 */}
      </div>
    )
  );
};

export default SecondaryContainer;
