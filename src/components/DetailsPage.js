import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import {
  ArrowLeftOutlined,
  StarFilled,
  HeartFilled,
  PlusOutlined,
  HeartOutlined,
  CheckOutlined
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const DetailsPage = () => {
  const location = useLocation();
  const [data, setData] = useState();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const {
    poster_path,
    id,
    title,
    vote_average,
    overview,
    release_date,
    original_language
  } = location.state.details;

  const { genre } = location.state;
  const genres = location.state.allGenres;
  

  const toggleFavorites = () => {
    const { id, details } = location.state ?? {};
    const isFavorite = favoriteMovies.some(movie => movie.id === id);
    let updatedFavorites;
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favoriteMovies.filter(movie => movie.id !== id);
    } else {
      // Add to favorites
      updatedFavorites = [...favoriteMovies, details];
    }
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    setFavoriteMovies(updatedFavorites);
    setAddedToFavorites(!addedToFavorites);
  };
  

  useEffect(() => {
    const storedFavoritesString = localStorage.getItem("favoriteMovies");
    console.log("Stored Favorites String:", storedFavoritesString);
    if (storedFavoritesString !== null) {
      try {
        const storedFavorites = JSON.parse(storedFavoritesString);
        console.log("Parsed Favorites:", storedFavorites);
        if (Array.isArray(storedFavorites)) {
          setFavoriteMovies(storedFavorites);
          const { id } = location.state ?? {};
          const isFavorite = storedFavorites.some(movie => movie.id === id);
          setClickCount(isFavorite ? 1 : 0);
        } else {
          console.error("Stored favorites is not an array:", storedFavorites);
        }
      } catch (error) {
        console.error("Error parsing stored favorites:", error);
      }
    }
  }, [location.state]);
  

  const listGenre = () => {
    const len = genre.length;
    let list = "";
    genre.forEach((item, index) => {
      if (index < len - 1) {
        list += `${item}, `;
      } else {
        list += `${item}`;
      }
    });
    return list;
  };

  const pickGenre = genre_ids => {
    let genre;
    let genreList = [];
    genre_ids.forEach(id => {
      for (genre of genres) {
        if (genre.id === id) {
          genreList.push(genre.name);
        }
      }
    });
    return genreList;
  };

  const fetchData = url => {
    axios
      .get(`${url}`)
      .then(response => {
        setData([...response.data.results]);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=8bf96b7c055b3a4d709c50a5ee6211ab&language=en-US&page=1`
    );
  }, [id]);

  const renderStars = vote_average => {
    let stars = Math.round((vote_average / 10) * 5);
    let string = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= stars) {
        string.push(<StarFilled key={i} className=" star" />);
        continue;
      }
      string.push(<StarFilled key={Math.random()} className=" star star-empty" />);
    }
    return string;
  };

  return (
    <Container fluid className="main-page">
      <Row>
        <Col className="image-view" sm="4" md="3">
            <Col className="details-header">
              <Link className="back" to="/movies">
                <span>
                  <ArrowLeftOutlined
                    className="pr-3"
                    style={{ verticalAlign: 0 }}
                  />
                  Home
                </span>
              </Link>
            </Col>

            <Col sm="12" className="image-container">
              <div className="image">
                <img
                  className="image"
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt="movie here"
                />
              </div>
            </Col>
        </Col>

        <Col className="details-view" sm="8" md="6">
          <Row>
            <Col sm="12" className="details-header">
              <div className="details-nav">
                <span>Details</span>
              </div>
            </Col>

            <Col sm="12" className="description-container">
              <h2 className="description-title">
                {title}
              </h2>
              <p>
                {renderStars(vote_average)}
                <span className="rating">{vote_average}</span>
              </p>
              <Row className="sub-section">
                <Col sm="8">
                  <p>Type: {listGenre()}</p>
                  <p>Release Date: {release_date}</p>
                  <p>Original Language: {original_language}</p>
                </Col>
                <Col sm="4" style={{ textAlign: "right" }}>
                  <Button
                    onClick={toggleFavorites}
                    outline
                    style={{ minWidth: "9rem" }}
                  >
                    <span>
                      {addedToFavorites ? (
                        <>
                          <CheckOutlined
                            className="p-2"
                            style={{ verticalAlign: "middle" }}
                          />
                          Added to Favorites
                        </>
                      ) : (
                        <>
                          <PlusOutlined
                            className="p-2"
                            style={{ verticalAlign: "middle" }}
                          />
                          Add to Favorites
                        </>
                      )}
                    </span>
                  </Button>
                </Col>
                <Col className="description-text">
                  <p>{overview}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col className="details-side" sm="12" md="3">
          <Row>
            <Col sm="12" className="details-header recommendation-header">
              <h2>Movie Recommendation</h2>
            </Col>
            <Col className="recommendation-container">
              {!data && <h3>Loading ...</h3>}
              {data &&
                data.slice(0, 3).map((movie, index) => {
                  let genreList = pickGenre(movie.genre_ids);
                  return (
                    <Link
                      key={index}
                      to={{
                        pathname: "/details",
                        state: {
                          details: movie,
                          genre: genreList,
                          allGenres: genres
                        }
                      }}
                    >
                      <Row className="recommendation-item">
                        <Col sm="5" className="recommendation-image">
                          <img
                            className="item-image"
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt="poster"
                          />
                        </Col>
                        <Col sm="7">
                          <h4>{movie.title}</h4>
                          <p>
                            {renderStars(movie.vote_average)}
                            <br />
                            <span className="other">
                              {movie.original_language}
                            </span>
                          </p>
                        </Col>
                      </Row>
                    </Link>
                  );
                })}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsPage;
