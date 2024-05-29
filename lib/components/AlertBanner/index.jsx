/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  ContentWrapper,
  ButtonWrapper,
  CloseIconWrapper,
} from './styled';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { Icon } from '../Icon';

export const AlertBanner = (props) => {
  const {
    isOpen,
    type,
    timeout,
    withIcon,
    withButton,
    withCloseIcon,
    title,
    message,
    buttonName,
    onClickButton,
    onClose,
    width,
  } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    setOpen(isOpen);

    let timeoutId;

    if (isOpen) {
      timeoutId = setTimeout(() => {
        handleClose();
      }, timeout);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen, onClose, timeout]);

  const showIcon = () => {
    switch (type) {
      case 'success':
        return (
          <Icon
            iconName="Accept"
            size="2rem"
            style={{ marginRight: '0.8rem', cursor: 'default' }}
            color="green"
          />
        );
      case 'warning':
        return (
          <Icon
            iconName="FilledWarning"
            size="2rem"
            style={{ marginRight: '0.8rem', cursor: 'default' }}
            color="yellow"
          />
        );
      case 'danger':
        return (
          <Icon
            iconName="FilledBadgeError"
            size="2rem"
            style={{ marginRight: '0.8rem', cursor: 'default' }}
            color="error"
          />
        );
      case 'info':
        return (
          <Icon
            iconName="FilledWarning"
            size="2rem"
            style={{ marginRight: '0.8rem', cursor: 'default' }}
            color="primary"
          />
        );
      default:
        return type;
    }
  };

  return (
    <Container isOpen={open} type={type} width={width}>
      {withIcon && showIcon()}
      <ContentWrapper>
        {title && (
          <Typography
            size="1.8rem"
            lineHeight="125%"
            weight="bold"
            margin="0 0.8rem 0.8rem 0"
            letterSpacing="0.04rem"
          >
            {title}
          </Typography>
        )}
        <Typography size="1.4rem" lineHeight="150%" margin="0">
          {message}
        </Typography>
      </ContentWrapper>
      {withButton && (
        <ButtonWrapper>
          <Button
            variant="link"
            size="medium"
            color="primary"
            onClick={onClickButton}
          >
            <Typography weight="bold">{buttonName}</Typography>
          </Button>
        </ButtonWrapper>
      )}
      {withCloseIcon && (
        <CloseIconWrapper onClick={handleClose}>
          <Icon iconName="Cross" size="1.6rem" />
        </CloseIconWrapper>
      )}
    </Container>
  );
};

AlertBanner.propTypes = {
  isOpen: PropTypes.bool,
  timeout: PropTypes.number,
  type: PropTypes.oneOf(['info', 'warning', 'success', 'danger']),
  withIcon: PropTypes.bool,
  withButton: PropTypes.bool,
  withCloseIcon: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  onClickButton: PropTypes.func,
  onClose: PropTypes.func,
  width: PropTypes.string,
};
AlertBanner.defaultProps = {
  isOpen: false,
  timeout: 3000,
  type: 'info',
  withIcon: true,
  withButton: true,
  withCloseIcon: true,
  title: '',
  buttonName: 'Button',
  onClickButton: () => {},
  onClose: () => {},
  width: '400px',
};
