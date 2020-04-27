import React from "react";
import { Modal, Spinner } from "react-bootstrap";

import "./components.scss";

const SpinnerModal = () => {
  return (
    <Modal show={true} dialogAs={Spinner}>
      <div className="main-page--modal-spinner">
        <Spinner animation="border" variant="light" />
      </div>
    </Modal>
  );
};

export default SpinnerModal;
