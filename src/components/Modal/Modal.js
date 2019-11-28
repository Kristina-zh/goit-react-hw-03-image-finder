import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default class Modal extends Component {
  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.keyCode !== 27) {
      return;
    }
    this.props.onClose();
  };

  handleBackdropClick = e => {
    const { current } = this.backdropRef;
    if (current && e.target !== e.currentTarget) return;

    this.props.onClose();
  };

  render() {
    const { images, imgURL } = this.props;
    return (
      <div
        onClick={this.handleBackdropClick}
        className={s.Overlay}
        role="presentation"
        ref={this.backdropRef}
      >
        <div className={s.Modal}>
          {images.map(el => (
            <img key={el.id} src={imgURL} alt="" />
          ))}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
