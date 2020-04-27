import React from "react";
import { Modal, Image, Badge } from "react-bootstrap";

import "./components.scss";

const ModalMovie = ({showModal, handleCloseModal, modalMovie}) => {
  return (
    <Modal
    show={showModal}
    onHide={handleCloseModal}
    centered
    scrollable
    size="lg"
  >
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
  );
};

export default ModalMovie;
