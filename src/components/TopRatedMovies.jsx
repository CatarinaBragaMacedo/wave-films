import { useEffect, useState, useRef } from "react";
import MovieCard from "./MovieCard";

import { motion } from 'framer-motion';

import "../pages/MovieDetails.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const TopRatedMovies = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    
    getTopRatedMovies(topRatedUrl);
  }, []);

  //CAROUSEL
  const carousel = useRef()
  const [width, setWidth] = useState(0)
  
  useEffect(()=> {
    console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth)
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
  }, [])

  return (
    <div className="container">
      <h2 className="title">Top rated movies</h2>

      <motion.div whileTap={{cursor: 'grabbing'}} className="motion-container">
          <motion.div drag='x' dragConstraints={{right:0, left: width}} className="movies-container">
            {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
          </motion.div>
      </motion.div>

    </div>
  )
}

export default TopRatedMovies