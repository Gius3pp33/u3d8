import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import CommentList from './CommentList';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=fa8bdbb6&t=${encodeURIComponent(movieId)}`);
        if (!response.ok) {
          throw new Error('Errore nel recupero dei dettagli del film');
        }
        const data = await response.json();
        setMovieDetails(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Errore:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="container-fluid mt-4 mb-5">
      <h2 className="mb-4 ms-2">{movieDetails.Title}</h2>
      <div className="row">
        <div className="col-md-2">
          <img src={movieDetails.Poster} alt={movieDetails.Title}  className="img-fluid" />
        </div>
        <div className="col-md-10 ">
          <p><strong>Year:</strong> {movieDetails.Year}</p>
          <p><strong>Genre:</strong> {movieDetails.Genre}</p>
          <p><strong>Plot:</strong> {movieDetails.Plot}</p>
          <p><strong>Director:</strong> {movieDetails.Director}</p>
          <p><strong>Actors:</strong> {movieDetails.Actors}</p>
          <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>
        <CommentList />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
