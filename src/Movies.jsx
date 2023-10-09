import React, { useEffect, useState } from 'react';

const Movies = (props) => {
  const [movieData, setMovieData] = useState([]);
  const apiKey = '6e8f505c75786ea1c4d7fa68159ede64';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey);

        if (!response.ok) {
          throw new Error('Något gick fel vid hämtning av filmer');
        }

        const data = await response.json();

        // Logga ut API-svaret för att felsöka
        console.log('API Response:', data);

        // Kontrollera om API-svaret innehåller en lista med filmer
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

  return (
    <section className='movies-section'>
      <h3>Våra filmer</h3>
      <div className='movie-list'>
        <ul>
          {movieData.map((movie, index) => (
            <li key={index}>
              <h4>{movie.title}</h4>
              <p>{movie.overview}</p>
              {/* Visa andra filmattribut här */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Movies;
