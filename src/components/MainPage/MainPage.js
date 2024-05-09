import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { UserOutlined, BellFilled, SearchOutlined } from "@ant-design/icons";
import { NavLink, Link, useParams, Redirect } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
  const { category } = useParams();
  const [data, setData] = useState();
  const [genres, setGenres] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userData, setUserData] = useState({});

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

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setSearchValue("");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchValue(query);
  
    if (query.length >= 3) {
      searchMovies(query);
    } else {
      setSearchResults([]);
    }
  };
  const searchMovies = (query) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}&api_key=8bf96b7c055b3a4d709c50a5ee6211ab`)
      .then(response => {
        if (response.data && response.data.results) {
          setSearchResults(response.data.results);
        } else {
          setSearchResults([]);
        }
      })
      .catch(error => {
        console.error('Error searching movies:', error);
        setSearchResults([]);
      });
  };


  const fetchData = url => {
    axios
      .get(`${url}`)
      .then(response => {
        setData([...response.data.results]);
      })
      .catch(err => console.log(err));
  };

  const fetchGenres = () => {
    axios
        .get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=8bf96b7c055b3a4d709c50a5ee6211ab`
        )
        .then(response => {
            setGenres([...response.data.genres]);
        })
        .catch(error => {
            console.error('Error fetching genres:', error);
            setGenres([]);
        });
};

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchGenres();

    if (parseInt(category) > 0) {
      setData(null);
      return fetchData(
        `https://api.themoviedb.org/3/discover/movie?api_key=8bf96b7c055b3a4d709c50a5ee6211ab&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${category}`
      );
    }

    fetchData(
      `https://api.themoviedb.org/3/movie/popular?api_key=8bf96b7c055b3a4d709c50a5ee6211ab&language=en-US&page=1`
    );
  }, [category]);

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

  if (
    category === undefined ||
    (!parseInt(category) > 0 &&
      category !== "discover" &&
      category !== "details")
  ) {
    return <Redirect to="/discover" />;
  }

  return (
    <Container fluid className="main-page">
      <Row>
        <Col className="side-panel" xs="5" sm="4" md="3" lg="2">
          <h2 className="heading">M-Frenxy</h2>
          <h3 className="heading2">Browse Movies</h3>
          <div className="category-list">
            <NavLink to="/discover" className="category-class">
              DISCOVER
            </NavLink>
          </div>
          <h3 className="heading2">Categories</h3>
          <div className="category-list">
            {genres &&
              genres.map((genre, index) => {
                return (
                  <NavLink key={index} to={`/${genre.id}`} className="category-class">
                    {genre.name}
                  </NavLink>
                );
              })}
          </div>
        </Col>

        <Col className="main-view" xs="7" sm="8" md="9" lg="10">
          <Row>
            <Col sm="12" className="header">
              {!searchVisible ? (
              <Row className="avatar-container">
                <Col xs="4" sm="2">
                  <span className="notification" onClick={toggleSearch}>
                    <SearchOutlined />
                  </span>
                </Col>
                <Col xs="4" sm="2">
                  <span className="notification">
                    <BellFilled />
                  </span>
                </Col>
                <Col xs="4" sm="3">
                  <UserOutlined className="avatar" />
                </Col>
                <Col xs="12" sm="5" className="avatar-text">
                <Link to="/my-profile">
                  <span>{userData ? userData?.username : "Demo User"}</span>
                  <span>Manage Account</span>
                </Link>
                </Col>
              </Row>
              ) : (
                <Row className="avatar-container">
                  <Col xs="12" sm="12">
                  <div className="search-input-container">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="form-control search-input"
                    placeholder="Search movies..."
                  />
                  <button
                    className="search-clear-button"
                    onClick={toggleSearch}
                  >
                    &#x2715;
                  </button>
                </div>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
          <Row className="content">
          <Col className="content-head" sm="12">
            <h2>Recommended for you</h2>
          </Col>
          {!data && <h2 style={{ marginLeft: "0.8rem" }}>Loading ... </h2>}
          {searchResults.length > 0 ? (
            searchResults.map((movie, index) => {
              let genreList = pickGenre(movie.genre_ids);
              return (
                <Col
                  key={index}
                  className="item"
                  xs="12"
                  sm="5"
                  md="3"
                  lg="2"
                >
                  <Link
                    to={{
                      pathname: "/details",
                      state: {
                        details: movie,
                        genre: genreList,
                        allGenres: genres
                      }
                    }}
                  >
                    <div className="item-content">
                      <img
                        className="item-image"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt="poster"
                      />
                      <div className="item-details">
                        <span className="item-title">
                          {movie.title || movie.name}
                        </span>
                        <p className="item-extra">
                          <span>{`${genreList[0]} . ${new Date(
                            movie.release_date || movie.first_air_date
                          ).getFullYear()}`}</span>
                          <br />
                          <br />
                          <span className="other">
                            {movie.original_language}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })
          ) : (
            data &&
            data.map((movie, index) => {
              let genreList = pickGenre(movie.genre_ids);
              return (
                <Col
                  key={index}
                  onMouseOver={e => {
                    const doc = document.querySelectorAll(".item-extra")[
                      index
                    ];
                    doc.style.display = "block";
                  }}
                  onMouseOut={e => {
                    const doc = document.querySelectorAll(".item-extra")[
                      index
                    ];
                    doc.style.display = "none";
                  }}
                  className="item"
                  xs="12"
                  sm="5"
                  md="3"
                  lg="2"
                >
                  <Link
                    to={{
                      pathname: "/details",
                      state: {
                        details: movie,
                        genre: genreList,
                        allGenres: genres
                      }
                    }}
                  >
                    <div className="item-content">
                      <img
                        className="item-image"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt="poster"
                      />
                      <div className="item-details">
                        <span className="item-title">
                          {movie.title || movie.name}
                        </span>
                        <p className="item-extra">
                          <span>{`${genreList[0]} . ${new Date(
                            movie.release_date || movie.first_air_date
                          ).getFullYear()}`}</span>
                          <br />
                          <br />
                          <span className="other">
                            {movie.original_language}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })
          )}
        </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
