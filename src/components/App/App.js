import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as API from '../services/api';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

export default class App extends Component {
  state = {
    imgURL: '',
    images: [],
    isLoading: false,
    pageNumber: 1,
    isOpen: false,
    query: '',
  };

  componentDidMount() {
    const { pageNumber, query } = this.state;
    this.searchImages(query, pageNumber);
  }

  componentDidUpdate(prProps, prState) {
    const { images } = this.state;
    if (prState.images !== images && images.length > 12) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 1000);
    }
  }

  openModal = imgURL => this.setState({ isOpen: true, imgURL });

  closeModal = () => this.setState({ isOpen: false });

  searchImages = query => {
    this.setState({ isLoading: true, query });

    API.fetchImages(query)
      .then(res =>
        this.setState({
          images: res.data.hits,
        }),
      )
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 1000);
      });
  };

  loadMore = () => {
    console.log('click');
    const { query, pageNumber } = this.state;
    this.setState({
      isLoading: true,
    });

    API.fetchImages(query, pageNumber + 1)
      .then(res =>
        this.setState(state => ({
          images: [...state.images, ...res.data.hits],
          pageNumber: state.pageNumber + 1,
        })),
      )
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 1000);
      });
  };

  render() {
    const { images, isLoading, isOpen, imgURL } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.searchImages} />
        <ImageGallery images={images} handleClick={this.openModal} />
        {isLoading && <Loader />}
        {isOpen && (
          <Modal onClose={this.closeModal} images={images} imgURL={imgURL} />
        )}
        <Button loadMore={this.loadMore} />
      </>
    );
  }
}

App.defaultProp = {
  imgURL: '',
};

App.propTypes = {
  imgURL: PropTypes.string,
  isLoading: PropTypes.bool,
  pageNumber: PropTypes.number,
  isOpen: PropTypes.bool,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ),
};
