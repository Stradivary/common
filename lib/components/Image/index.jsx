import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LoaderGIF as Loader, errorImage as BrokenImg } from '../../assets';

export const Image = (props) => {
  const { src, alt, style, threshold, width, height, isLazy } = props;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        const [entry] = entries;
        const isIntersect = entry.isIntersecting;
        if (!isIntersect) return;
        setIsIntersecting(isIntersect);
        entry.target.src = entry.target.dataset.src;
        obs.unobserve(entry.target);
      },
      { threshold }
    );
    if (isLazy) observer.observe(ref.current);

    return () => {
      if (isLazy) observer.disconnect();
    };
  }, [isIntersecting, isLazy]);

  const handleError = () => {
    ref.current.src = BrokenImg;
    ref.current.onerror = null;
  };

  return (
    <img
      src={isLazy ? Loader : src}
      ref={ref}
      data-src={src}
      onError={handleError}
      alt={alt}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
};
Image.defaultProps = {
  src: '',
  alt: '',
  style: {},
  threshold: 0.3, // max is 1, the value is beetwen 0 - 1, use float value
  width: 'auto',
  height: '',
  isLazy: true,
};
Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.shape({}),
  threshold: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  isLazy: PropTypes.bool,
};
