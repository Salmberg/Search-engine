import React, { useEffect, useState } from 'react';
import './Movies.css'

const Movies = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const apiKey = '6e8f505c75786ea1c4d7fa68159ede64';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=' + apiKey);

        if (!response.ok) {
          throw new Error('Något gick fel vid hämtning av filmer');
        }

        const data = await response.json();

        console.log('API Response:', data);

        if (data && data.results && Array.isArray(data.results)) {
          setMovieData(data.results);
        } else {
          console.error('API Response is not as expected:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, [apiKey]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const filteredMovies = movieData.filter((movie) =>
        movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setMovieData(filteredMovies);
    }
  };


  return (
    <section className='movies-section'>
      <h3>Våra filmer</h3>
      <input
        type="text"
        placeholder="Sök efter filmer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch} // Lägg till onKeyDown-händelsehanterare här
      />
      <div className='movie-list'>
        <ul>
          {movieData
            .filter((movie) =>
              movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((movie, index) => (
              <li key={index}>
                <h4>{movie.title}</h4>
                <p>{movie.overview}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                {/* Visa fler filmattribut här */}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Movies;