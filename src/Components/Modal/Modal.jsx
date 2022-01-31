import React, { useState, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import { ModalWindow, Overlay } from './Modal.styled';

const Modal = ({ image, onModalClose, onModalShow }) => {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = useCallback(event => {
    if (event.code === 'Escape') {
      setShowModal(false);
    }
  }, []);

  const onBackdropClick = useCallback(event => {
    if (event.currentTarget === event.target) {
      setShowModal(false);
      window.removeEventListener('click', onBackdropClick);
    }
  }, []);

  useEffect(() => {
    if (!image) {
      return;
    }

    setShowModal(true);
    window.addEventListener('keydown', onCloseModal);

    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  }, [image, onCloseModal]);

  return (
    <>
      {showModal && (
        <Overlay className="overlay" onClick={onBackdropClick}>
          <ModalWindow className="modal">
            <img src={image.large} alt={image.tags} />
          </ModalWindow>
        </Overlay>
      )}
    </>
  );
};

Modal.propTypes = {
  data: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      tags: propTypes.string.isRequired,
      largeImageURL: propTypes.string.isRequired,
      previewURL: propTypes.string.isRequired,
    })
  ),
  closeModal: propTypes.func,
  onModalShow: propTypes.func,
};

export default Modal;
