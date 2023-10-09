import React, { useEffect, useState } from 'react';

const Movies = (props) => {
  const [movieData, setMovieData] = useState([]);
  const apiKey = '6e8f505c75786ea1c4d7fa68159ede64';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=' + apiKey);

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

  const baseImageUrl = 'https://image.tmdb.org/t/p/';

  // För poster_path
  const posterPath = '/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg'; // Ersätt med den poster_path du har fått
  const posterUrl = baseImageUrl + 'w500' + posterPath; // w500 är bredden på bilden du vill ha
  
  // För backdrop_path
  const backdropPath = '/cHNqobjzfLj88lpIYqkZpecwQEC.jpg'; // Ersätt med den backdrop_path du har fått
  const backdropUrl = baseImageUrl + 'w1280' + backdropPath; // w1280 är bredden på bilden du vill ha
  
  // Nu har du posterUrl och backdropUrl som du kan använda i din komponent för att visa bilderna:
  return (
    <section className='movies-section'>
      <h3>Våra filmer</h3>
      <div className='movie-list'>
        {movieData.length > 0 ? (
          <ul>
            {movieData.map((movie, index) => (
              <li key={index}>
                <h4>{movie.title}</h4>
                <p>{movie.overview}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Använd movie.poster_path för att hämta den specifika bilden för varje film
                  alt={movie.title}
                />
                {/* Visa andra filmattribut här */}
              </li>
            ))}
          </ul>
        ) : (
          <p>Väntar på data...</p>
        )}
      </div>
    </section>
  );
  
};

export default Movies;
