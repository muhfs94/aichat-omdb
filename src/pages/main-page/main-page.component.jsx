import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { mainPageActions } from "../../redux/main-page/main-page.action";
import {
  Tabs,
  Tab,
  Table,
  InputGroup,
  FormControl,
  Form,
  Button,
  Card,
  Modal,
  Spinner,
  Image,
  Badge,
} from "react-bootstrap";
import "./main-page.styles.scss";

import { StarFill } from "react-bootstrap-icons";

const MainPage = (props) => {
  const {
    movieData,
    isLoading,
    favoriteMovies,
    resetSearchResults,
    modalMovie,
    showModal,
    fetchMovieLoading,
    errorMessage,
  } = props.mainPage;
  const { handleIsFavorite, fetchMovie, setShowModal, resetModalMovie } = props;
  const [resultColumns] = useState(["Title", "Year", "imDB ID", ""]);
  const [favoriteColumns] = useState(["Title", "Year", "Language", ""]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    window.addEventListener("beforeunload", handleReload);
    return () => {
      window.removeEventListener("beforeunload", handleReload);
    };
  }, []);

  const handleReload = () => {
    resetSearchResults();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetModalMovie();
  };
  return (
    <Card body className="main-page--container">
      <div className="main-page--image-logo-container">
        <Image
          className="main-page--image-logo"
          src={require("../../assets/search-movies.png")}
          fluid
          rounded
        />
      </div>
      <Tabs defaultActiveKey="search" id="uncontrolled-tab">
        <Tab eventKey="search" title="Search Movie">
          <div className="main-page--search-section">
            <div className="main-page--search-bar">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  props.fetchSearchResults(searchText);
                }}
              >
                <Form.Group controlId="formSearchMovie">
                  <InputGroup>
                    <FormControl
                      value={searchText}
                      size="lg"
                      placeholder="Find your awesome movie title here..."
                      aria-label="Search movie title"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <InputGroup.Append>
                      <Button size="lg" type="submit" variant="secondary">
                        Search Movie
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form>
            </div>
            {!isLoading && errorMessage && movieData.length < 1 ? (
              <div className="fav-tab--empty">
                <h5>{errorMessage}</h5>
              </div>
            ) : null}
            {isLoading ? (
              <div className="main-page--spinner">
                <Spinner animation="border" />
              </div>
            ) : null}
            {movieData && !isLoading && movieData.length > 0 ? (
              <div className="main-page--search-results">
                <Table responsive>
                  <thead>
                    <tr>
                      {resultColumns.map((column, index) => (
                        <th key={column + index}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {movieData.map((movie, index) => {
                      return (
                        <tr key={index}>
                          <th
                            className="main-page--clickable-title"
                            onClick={() => fetchMovie(movie.imdbID)}
                          >
                            {movie.Title}
                          </th>
                          <th className="main-page--table-year">
                            {movie.Year}
                          </th>
                          <th className="main-page--table-imdb-id">
                            {movie.imdbID}
                          </th>
                          <th className="main-page--table-favorite">
                            {movie.isFavorite ? (
                              <StarFill
                                className="main-page--fav-icon-true"
                                onClick={() =>
                                  handleIsFavorite(movie.imdbID, false)
                                }
                              />
                            ) : (
                              <StarFill
                                className="main-page--fav-icon-false"
                                onClick={() =>
                                  handleIsFavorite(movie.imdbID, true)
                                }
                              />
                            )}
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            ) : null}
          </div>
        </Tab>
        <Tab eventKey="favourite" title="My Favourite">
          {favoriteMovies && favoriteMovies.length > 0 ? (
            <div className="main-page--search-results">
              <Table responsive>
                <thead>
                  <tr>
                    {favoriteColumns.map((column, index) => (
                      <th key={column + index}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {favoriteMovies.map((movie, index) => (
                    <tr key={index}>
                      <th
                        className="main-page--clickable-title"
                        onClick={() => fetchMovie(movie.imdbID)}
                      >
                        {movie.Title}
                      </th>
                      <th className="main-page--table-year">{movie.Year}</th>
                      <th className="main-page--table-language">
                        {movie.Language}
                      </th>
                      <th className="main-page--table-favorite">
                        {movie.isFavorite ? (
                          <StarFill
                            className="main-page--fav-icon-true"
                            onClick={() =>
                              handleIsFavorite(movie.imdbID, false)
                            }
                          />
                        ) : (
                          <StarFill
                            className="main-page--fav-icon-false"
                            onClick={() => handleIsFavorite(movie.imdbID, true)}
                          />
                        )}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="fav-tab--empty">
              <h5>Whoops, seems like you haven't starred any movies here..</h5>
            </div>
          )}
        </Tab>
      </Tabs>
      {fetchMovieLoading ? (
        <Modal show={true} dialogAs={Spinner}>
          <div className="main-page--modal-spinner">
            <Spinner animation="border" variant="light" />
          </div>
        </Modal>
      ) : null}
      {!fetchMovieLoading && modalMovie ? (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          scrollable
          size="lg"
        >
          {/* <Modal.Header closeButton /> */}
          <Modal.Body>
            <div className="modal-movie--container">
              <div className="modal-movie--poster-container">
                <Image
                  className="modal-movie--poster"
                  src={modalMovie.Poster}
                  fluid
                  rounded
                />
              </div>
              <div className="modal-movie--content-container">
                <div className="modal-movie--title">
                  <h4>{`${modalMovie.Title} (${modalMovie.Year})`}</h4>
                </div>
                <div className="modal-movie--plot">{modalMovie.Plot}</div>
                <div className="modal-movie--imdb-rating">
                  <b>IMDb Rating:</b> {modalMovie.imdbRating || "-"}/10
                </div>
                <div className="modal-movie--released">
                  <b>Release date:</b> {modalMovie.Released}
                </div>
                <div className="modal-movie--director">
                  <b>Director:</b> {modalMovie.Director}
                </div>
                <div className="modal-movie--actors">
                  <b>Actors:</b> {modalMovie.Actors}
                </div>
                <div className="modal-movie--Language">
                  <b>Language:</b> {modalMovie.Language}
                </div>
                <div className="modal-movie--award">
                  <b>Awards:</b> {modalMovie.Award || "-"}
                </div>
                <div className="modal-movie--genres">
                  {modalMovie.Genre.split(", ").map((genre) => (
                    <Badge className="modal-movie--genre-badge" variant="dark">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
    </Card>
  );
};

const mapStateToProps = ({ mainPage }) => ({
  mainPage: mainPage,
});

export default connect(mapStateToProps, { ...mainPageActions })(MainPage);
