import React from 'react';
import LoaderComponent from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <LoaderComponent type="Puff" color="gray" height={100} width={100} />
    </div>
  );
};

export default Loader;
