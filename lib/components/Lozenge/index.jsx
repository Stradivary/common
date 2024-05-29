import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { Wrapper } from './style';

export const Lozenge = (props) => {
  const { text, isOutlined, leftIcon, rightIcon, color, bg } = props;

  return (
    <Wrapper isOutlined={isOutlined} bg={bg}>
      {leftIcon && <Icon iconName={leftIcon} color={color} />}
      <Typography
        color={color}
        size="1rem"
        weight={500}
        letterSpacing="0.2px"
        lineHeight="1.5rem"
      >
        {text}
      </Typography>
      {rightIcon && <Icon iconName={rightIcon} color={color} />}
    </Wrapper>
  );
};
Lozenge.propTypes = {
  isOutlined: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  bg: PropTypes.string,
};
Lozenge.defaultProps = {
  isOutlined: false,
  leftIcon: null,
  rightIcon: null,
  text: 'text here!',
  color: 'neutral5',
  bg: 'neutral90',
};
