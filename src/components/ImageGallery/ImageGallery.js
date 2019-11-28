import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, handleClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(el => (
        <ImageGalleryItem
          key={el.id}
          src={el.webformatURL}
          imgURL={el.largeImageURL}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
