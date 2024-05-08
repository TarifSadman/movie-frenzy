import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap'; //

const favoriteMovies = [
  {
    id: 1,
    title: "Inception",
    genreList: ["Action", "Adventure", "Sci-Fi"],
    releaseDate: "2010-07-16",
    originalLanguage: "English",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    genreList: ["Drama"],
    releaseDate: "1994-09-23",
    originalLanguage: "English",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  },
  {
    id: 3,
    title: "The Dark Knight",
    genreList: ["Action", "Crime", "Drama"],
    releaseDate: "2008-07-18",
    originalLanguage: "English",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  }
];

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="Movie Poster"
      />
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-details">{`${movie.genreList[0]} . ${new Date(
          movie.releaseDate
        ).getFullYear()}`}</p>
        <p className="movie-details">
          <span className="movie-language">{movie.originalLanguage}</span>
        </p>
      </div>
    </div>
  );
};

const Profile = () => {
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
            <p>Demo User</p>
            <span>Aliquam ornare augue ac nulla</span>
          </div>
          <div className="user-profile__image" />
        </div>
      </div>
      <div className="user-posts">
        <h2 style={{ textAlign: "center" }}>Favorites</h2>
        <Row>
          {favoriteMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Row>
      </div>
    </div>
)
};

export default Profile;
