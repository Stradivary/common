/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  TextContainer,
  ActionContainer,
  IconContainer,
} from './style';

import { Typography } from '../Typography';
import { Icon } from '../Icon';

const iconName = (type) => {
  switch (type) {
    case 'success':
      return 'Success';
    case 'warning':
      return 'Warning';
    case 'danger':
      return 'FilledBadgeError';
    case 'info':
      return 'Info';
    default:
      return 'Info';
  }
};

export const Snackbar = (props) => {
  const { timeout, type, text, onClose, zIndex, position } = props;
  const [openSnackbar, setOpenSnackbar] = useState(true);

  const handleClose = () => {
    setOpenSnackbar(false);
    onClose();
  };

  useEffect(() => {
    let myTimeout;
    if (openSnackbar) {
      myTimeout = setTimeout(() => {
        handleClose();
      }, timeout);
    }

    return () => {
      clearTimeout(myTimeout);
    };
  }, [openSnackbar]);

  return (
    <Container
      zIndex={zIndex}
      isOpen={openSnackbar}
      type={type}
      position={position}
    >
      <TextContainer>
        <Icon
          iconName={iconName(type)}
          size="2rem"
          style={{ marginRight: '0.8rem' }}
        />
        {text && (
          <Typography size="1.4rem" lineHeight="150%" weight={400}>
            {text}
          </Typography>
        )}
      </TextContainer>
      <ActionContainer>
        <IconContainer id="btn-close" onClick={handleClose}>
          <Icon iconName="Cross" size="20px" style={{ cursor: 'pointer' }} />
        </IconContainer>
      </ActionContainer>
    </Container>
  );
};

Snackbar.propTypes = {
  timeout: PropTypes.number,
  zIndex: PropTypes.number,
  type: PropTypes.oneOf(['info', 'default', 'warning', 'success', 'danger']),
  onClose: PropTypes.func,
  text: PropTypes.string,
  position: PropTypes.oneOf([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]),
};

Snackbar.defaultProps = {
  timeout: 2000,
  zIndex: 999999,
  text: '',
  type: 'default',
  position: 'bottom-right',
  onClose: () => {},
};
