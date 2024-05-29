/* eslint-disable import/prefer-default-export */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import {
  Wrapper,
  ModalContainer,
  CloseBtn,
  HeaderSection,
  ContentWrapper,
} from './style';

export const Modal = (props) => {
  const ref = useRef(null);
  const {
    visible,
    position,
    zIndex,
    display,
    children,
    padding,
    maxHeight,
    overflow,
    width,
    onClose,
    showCloseBtn,
    title,
    subtitle,
    id,
    className,
    background,
    gap,
    align,
    inset,
    closeBtnColor,
    disableListener,
    disableClickOutside,
  } = props;

  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClose(false);
    }
  };
  // handle when click outside modal auto close
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!disableListener && !disableClickOutside) {
      // Add event listener when the component mounts
      document.addEventListener('mousedown', handleClick);
      return () => {
        // Remove event listener when the component unmounts
        document.removeEventListener('mousedown', handleClick);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <Wrapper
      visible={visible}
      position={position}
      zIndex={zIndex}
      onClick={!disableClickOutside ? onClose : () => {}}
      id={id}
      className={`modalWrapper ${className}`}
      background={background}
      inset={inset}
    >
      <ModalContainer
        maxHeight={maxHeight}
        overflow={overflow}
        width={width}
        gap={gap}
        align={align}
        onClick={(event) => event.stopPropagation()}
        className="modalContainer"
        ref={ref}
      >
        <HeaderSection
          visible={title || showCloseBtn}
          haveTitle={!!title}
          className="modalHeader"
        >
          {title && React.isValidElement(title) ? (
            title
          ) : (
            <Typography
              size="2rem"
              color="blue80"
              weight={700}
              lineHeight="30px"
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              size="1rem"
              color="neutral70"
              weight={500}
              lineHeight="150%"
            >
              {subtitle}
            </Typography>
          )}
          {showCloseBtn && (
            <CloseBtn
              className="modalCloseBtn"
              id={`btn-close-modal-${id}`}
              showTitle={!!title}
            >
              <Icon
                onClick={() => onClose(id)}
                size="2rem"
                iconName={closeBtnColor === 'white' ? 'CloseWhite' : 'Close'}
              />
            </CloseBtn>
          )}
        </HeaderSection>
        <ContentWrapper
          padding={padding}
          display={display}
          className="modalContent"
        >
          {children}
        </ContentWrapper>
      </ModalContainer>
    </Wrapper>
  );
};

Modal.defaultProps = {
  zIndex: 99,
  position: 'fixed',
  display: '',
  padding: '',
  width: 'auto',
  overflow: '',
  visible: false,
  maxHeight: '',
  onClose: () => {},
  showCloseBtn: true,
  title: null,
  subtitle: null,
  id: null,
  className: '',
  background: '',
  gap: '',
  align: 'center',
  inset: '0 0 0 0',
  closeBtnColor: '',
  disableListener: false,
  disableClickOutside: false,
};

Modal.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  zIndex: PropTypes.number,
  position: PropTypes.string,
  display: PropTypes.string,
  padding: PropTypes.string,
  width: PropTypes.string,
  overflow: PropTypes.string,
  visible: PropTypes.bool,
  maxHeight: PropTypes.string,
  onClose: PropTypes.func,
  showCloseBtn: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  background: PropTypes.string,
  gap: PropTypes.string,
  align: PropTypes.string,
  inset: PropTypes.string,
  closeBtnColor: PropTypes.string,
  disableListener: PropTypes.bool,
  disableClickOutside: PropTypes.bool,
};
