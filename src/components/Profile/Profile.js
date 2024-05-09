import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'reactstrap'; 

const Profile = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedFavoritesString = localStorage.getItem("favoriteMovies");
    if (storedFavoritesString !== null) {
      try {
        const storedFavorites = JSON.parse(storedFavoritesString);
        if (Array.isArray(storedFavorites)) {
          setFavoriteMovies(storedFavorites);
        } else {
          console.error("Stored favorites is not an array:", storedFavorites);
        }
      } catch (error) {
        console.error("Error parsing stored favorites:", error);
      }
    }
  }, []);

  // console.log(localStorage.getItem("userData"));

  useEffect(() => {
    const storedUserDataString = localStorage.getItem("userData");
    if (storedUserDataString !== null) {
      try {
        const storedUserData = JSON.parse(storedUserDataString);
        setUserData(storedUserData);
        console.log("Stored User Data:", storedUserData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }
  , []);

  const handleRemoveMovie = (movieId) => {
    const updatedFavorites = favoriteMovies.filter(movie => movie.id !== movieId);
    
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container">
      <div className="profile-header">
        <Link to="/movies">
          <div className="back-button">
            <ArrowLeftOutlined />
          </div>
        </Link>
        <h1 className="title">Go Back</h1>
      </div>
      <div className="user-profile">
        <div className="user-profile__wrapper">
          <div className="user-profile__background" />
          <div className="user-profile__name">
            <p>{userData ? userData?.username : "XYZ WSD"}</p>
            <span>{userData ? userData.email : "xyz@mail.to"}</span>
          </div>
          <div className="user-profile__image" />
        </div>
      </div>
      <div className="user-posts">
        <h2 style={{ textAlign: "center" }}>Favorites</h2>
        <Row>
          {favoriteMovies.map(movie => (
            <Col key={movie.id} sm="6" md="4" lg="3">
              <div className="movie-card">
                <img
                  className="movie-poster"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="Movie Poster"
                />
                <div className="movie-info">
                  <h2 className="movie-title">{movie.title}</h2>
                  <p className="movie-details">{`${movie.genreList && movie.genreList.length > 0 ? movie.genreList[0] : ''} . ${movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : ''}`}</p>
                  <p className="movie-details">
                    <span className="movie-language">{movie.originalLanguage}</span>
                  </p>
                </div>
                <button className="remove-button" onClick={() => handleRemoveMovie(movie.id)}>Remove</button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Profile;
