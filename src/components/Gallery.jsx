import React, { Component } from "react";
import { Carousel, Row, Col, Card, Button } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";
import "./Gallery.css";

class Gallery extends Component {
  state = {
    movies: [],
    loading: true,
    error: null,
    showDescriptions: {}, // Stato per gestire la visibilità delle descrizioni
  };

  componentDidMount() {
    console.log("Component did mount");
    this.fetchMovies();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      console.log("query cambiata");
      this.fetchMovies();
    }
  }

  fetchMovies = async () => {
    const { query } = this.props;
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=fa8bdbb6&s=${query}`
      );
      if (!response.ok) {
        throw new Error("Errore nella ricerca");
      }
      const data = await response.json();

      // fetch che recupera dettagli cioè descrizioni per ogni film
      const detailedMovies = await Promise.all(
        data.Search.map(this.fetchMovieDetails)
      );

      this.setState({
        movies: detailedMovies,
        loading: false,
        error: null,
        showDescriptions: {}, // Resetta lo stato delle descrizioni
      });
    } catch (error) {
      console.log("Errore:", error);
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  };

  fetchMovieDetails = async (movie) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=fa8bdbb6&i=${movie.imdbID}&plot=full`
      );
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dettagli del film");
      }
      const details = await response.json();
      return { ...movie, ...details };
    } catch (error) {
      console.log("Errore nel recupero dei dettagli del film:", error);
      return movie; // in caso di errore torna i movie senza dettagli
    }
  };

  // funzione per dividere l'array di film in gruppi di quattro
  splitIntoGroupsOfFour = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length; i += 4) {
      result.push(arr.slice(i, i + 4));
    }
    return result;
  };

  // Funzione per gestire il click e togglare la visibilità della descrizione
  toggleDescription = (imdbID) => {
    this.setState((prevState) => ({
      showDescriptions: {
        ...prevState.showDescriptions,
        [imdbID]: !prevState.showDescriptions[imdbID],
      },
    }));
  };

  render() {
    const { title } = this.props;
    const { movies, loading, error, showDescriptions } = this.state;

    // Gestione dello stato di caricamento e degli errori
    if (loading) return <Loading />;
    if (error) return <Error message={error} />;

    // divido l'array movies in gruppi di quattro
    const movieGroups = this.splitIntoGroupsOfFour(movies);

    return (
      <section
        className={`mb-5 px-0 ${title === "Trending Now" ? "mt-5" : ""}`}
      >
        <h2 className="mb-3 mt-5 ms-3 text-white">{title}</h2>
        <Carousel indicators={false} controls={true}>
          {movieGroups.map((group, index) => (
            <Carousel.Item key={index}>
              <Row className="no-gap">
                {group.map((movie, idx) => (
                  <Col key={idx} xl={3} md={6} sm={12} className="mb-3">
                    <Card bg="dark" text="white" className="movie-card">
                      <Card.Img
                        variant="top"
                        src={movie.Poster}
                        alt={movie.Title}
                        className="card-image"
                      />
                      <Card.Body className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <Card.Title className="card-title mb-0">
                            {movie.Title}
                          </Card.Title>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              this.toggleDescription(movie.imdbID)
                            }
                          >
                            {showDescriptions[movie.imdbID] ? "-" : "+"}
                          </Button>
                        </div>
                        <Card.Text className="card-text">
                          {movie.Year}
                        </Card.Text>
                        {showDescriptions[movie.imdbID] && (
                          <Card.Text className="card-text full-description mt-3">
                            {movie.Plot}
                          </Card.Text>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    );
  }
}

export default Gallery;
