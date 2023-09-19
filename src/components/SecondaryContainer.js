import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies); // subscribing all the movies which are stored on our movie slice
  return (
    // movies or movies.nowPlayingMovies &&
    movies && (
      <div className=" bg-black">
        <div className="m-0 md:-mt-40 relative z-30">
          <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
          {/* <MovieList title={'Trending'} movies={movies.nowPlayingMovies} /> */}
          <MovieList
            title={'Top Rated Movies'}
            movies={movies.topRatedMovies}
          />

          <MovieList title={'Popular'} movies={movies.popularMovies} />
          <MovieList
            title={'UpComing Movies'}
            movies={movies?.upcomingMovies}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
