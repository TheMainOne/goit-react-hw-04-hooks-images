import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import GlobalStyle from './GlobalStyles';
import { fetchImagesWithQuery } from '../API/services';

const App = () => {
  const [filter, setFilter] = useState('');
  const [data, setData] = useState([]);
  let [counter, setCounter] = useState(1);
  const [status, setStatus] = useState('idle');
  const [id, setId] = useState('');
  const [endOfList, setEndOfList] = useState(false);
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = filter;
  });
  const prevFilter = prevCountRef.current;

  useEffect(() => {
    if (filter === '') {
      return;
    }

    if (prevFilter !== filter) {
      setStatus('pending');

      fetchImagesWithQuery(filter, counter)
        .then(response => {
          setData(prevData => [...prevData, ...response]);
          setStatus('resolved');
          setCounter(counter + 1);
        }).catch((error) => console.log(error.message));
    }
  }, [counter, filter, prevFilter]);

  const onHandleSubmit = event => {
    event.preventDefault();
    setStatus('pending');
    const inputValue = event.target.elements.input.value;
    const form = event.target;
    const notify = () => toast.error('Please enter a search query');

    if (inputValue) {
      setData([]);
      setFilter(inputValue);
      setEndOfList(false);
      setCounter((counter = 1));

      form.reset();
    } else {
      notify();
    }
  };

  const onButtonClick = () => {
    setStatus('load');
    setCounter(counter + 1);

    fetchImagesWithQuery(filter, counter).then(response => {
      if (response.length === 0) {
        setEndOfList(true);
      }

      setData([...data, ...response]);
      setCounter(counter + 1);
      setStatus('resolved');
    });
  };

  const onImageClick = event => {
    if (event.target.nodeName === 'IMG') {
      setId(event.target.src);
    }
  };

  if (status === 'idle') {
    return (
      <>
        <GlobalStyle />
        <Searchbar onSubmit={onHandleSubmit} />
        <Toaster position="top-right" />
      </>
    );
  }

  if (status === 'pending') {
    return (
      <>
        <GlobalStyle />
        <Searchbar onSubmit={onHandleSubmit} />
        <Loader />
      </>
    );
  }

  if (status === 'resolved' || status === 'load') {
    return (
      <>
        <GlobalStyle />
        <Searchbar onSubmit={onHandleSubmit} />
        <ImageGallery data={data} onImageClick={onImageClick} />
        <Button
          data={data}
          onClick={onButtonClick}
          endOfList={endOfList}
          status={status}
        />
        <Toaster position="top-right" />
        {data && <Modal data={data} id={id} />}
      </>
    );
  }
};

export default App;
