import React, { useState } from "react";
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
} from "react-bootstrap";
import "./main-page.styles.scss";

import { StarFill } from "react-bootstrap-icons";

const MainPage = (props) => {
  const { movieData, isLoading, favoriteMovies } = props.mainPage;
  const { handleIsFavorite } = props;
  const [tableColumns, setTableColumns] = useState([
    "Title",
    "Year",
    "imDB ID",
    "",
  ]);
  const [tableData, setTableData] = useState([
    {
      title: "Spiderman 1999",
      year: "1999",
      imdbId: "10391203123",
      favorite: false,
    },
    {
      title: "Spiderman 2000",
      year: "2000",
      imdbId: "10391203123",
      favorite: true,
    },
  ]);
  const [isFavorite, setFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
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
                      <Button
                        size="lg"
                        type="submit"
                        variant="outline-secondary"
                      >
                        Search Movie
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form>
            </div>
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
                      {tableColumns.map((column, index) => (
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
                            onClick={() => handleShowModal()}
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
                                onClick={() => handleIsFavorite(movie.imdbID, false)}
                              />
                            ) : (
                              <StarFill
                                className="main-page--fav-icon-false"
                                onClick={() => handleIsFavorite(movie.imdbID, true)}
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
                    {tableColumns.map((column, index) => (
                      <th key={column + index}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {favoriteMovies.map((movie, index) => (
                    <tr key={index}>
                      <th
                        className="main-page--clickable-title"
                        onClick={() => handleShowModal()}
                      >
                        {movie.Title}
                      </th>
                      <th className="main-page--table-year">{movie.Year}</th>
                      <th className="main-page--table-imdb-id">
                        {movie.imdbID}
                      </th>
                      <th className="main-page--table-favorite">
                        {movie.isFavorite ? (
                          <StarFill
                            className="main-page--fav-icon-true"
                            onClick={() => handleIsFavorite(movie.imdbID, false)}
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
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        scrollable
        size="lg"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
    </Card>
  );
};

const mapStateToProps = ({ mainPage }) => ({
  mainPage: mainPage,
});

export default connect(mapStateToProps, { ...mainPageActions })(MainPage);
