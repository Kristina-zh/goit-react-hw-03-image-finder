import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, handleClick, imgURL }) => {
  return (
    <li
      onClick={() => handleClick(imgURL)}
      className={s.ImageGalleryItem}
      role="presentation"
    >
      <img src={src} alt="" className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
