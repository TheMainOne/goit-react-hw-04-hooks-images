import React, { useState, useEffect, useCallback, useRef } from 'react';
import propTypes from 'prop-types';
import { ModalWindow, Overlay } from './Modal.styled';

const Modal = ({ data, id, onModalClose, onModalShow }) => {
  const [item, setItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = id;
  });
  const prevId = prevCountRef.current;

  const onCloseModal = useCallback(event => {
    if (event.code === 'Escape') {
      setShowModal(false);
      window.removeEventListener('keydown', onCloseModal);
    }
  }, []);

  const onBackdropClickCloseModal = useCallback(event => {
    if (event.target.childNodes.length === 1) {
      setShowModal(false);
      window.removeEventListener('click', onBackdropClickCloseModal);
    }
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    
  const neededItem = data.find(item => item.webformatURL === id);

    
      setItem(neededItem);
      setShowModal(true);
      window.addEventListener('keydown', onCloseModal);
      window.addEventListener('click', onBackdropClickCloseModal)
  }, [data, id, onBackdropClickCloseModal, onCloseModal]);

  return (
    <>
      {showModal && (
        <Overlay className="overlay">
          <ModalWindow className="modal">
            <img src={item.largeImageURL} alt={item.tags} />
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
  id: propTypes.string,
  closeModal: propTypes.func,
  onModalShow: propTypes.func,
};

export default Modal;
