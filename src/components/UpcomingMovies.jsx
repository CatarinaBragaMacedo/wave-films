import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

import "../pages/MovieDetails";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const UpcomingMovies = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const getUpcomingMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setUpcomingMovies(data.results);
  };

  useEffect(() => {
    const upcomingMoviesUrl = `${moviesURL}upcoming?${apiKey}`;
    
    getUpcomingMovies(upcomingMoviesUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Upcoming movies</h2>
      <div className="movies-container">
        {upcomingMovies.length > 0 && upcomingMovies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
      </div>
    </div>
  )
}

export default UpcomingMovies