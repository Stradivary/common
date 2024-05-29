/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import * as Icons from '../../assets';

// Generate iconsMapping dynamically
const iconsMapping = Object.fromEntries(
  Object.entries(Icons).map(([key, value]) => [key, { value }])
);
const Wrapper = styled.div`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  svg {
    transform: ${({ scale }) => `scale(${scale})`};
  }
  path {
    // based on design system when icon is not active the color is neutral50
    fill: ${({ color, disabled }) =>
      disabled ? theme.colors.neutral50 : theme.colors[color]};
    stroke: ${({ stroke }) => theme.colors[stroke]};
  }
`;
export const Icon = (props) => {
  const {
    id,
    iconName,
    style,
    size,
    color,
    scale,
    width,
    height,
    stroke,
    onClick,
    className,
    disabled,
  } = props;
  const iconData = iconsMapping[iconName];

  if (!iconData) {
    return <div>Icon not found</div>;
  }

  const invalidFormat = JSON.stringify(iconData.value);
  if (invalidFormat) {
    return <div>Invalid format, .svg only</div>;
  }

  const SVG = iconData.value;

  return (
    <Wrapper
      id={id}
      color={color}
      scale={scale}
      style={style}
      onClick={onClick}
      stroke={stroke}
      className={`icon ${className}`}
      disabled={disabled}
    >
      <SVG
        preserveAspectRatio="none"
        width={size || width}
        height={size || height}
        name={iconName}
        disabled={disabled}
      />
    </Wrapper>
  );
};

Icon.defaultProps = {
  size: null, // when the icon is OK when using same width and height
  style: {},
  color: null,
  stroke: null,
  scale: 1,
  width: '1.6rem',
  height: '1.6rem',
  onClick: () => {},
  className: '',
  id: '',
  disabled: false,
};

Icon.propTypes = {
  iconName: PropTypes.oneOf(Object.keys(iconsMapping)).isRequired,
  size: PropTypes.string,
  style: PropTypes.shape({}),
  color: PropTypes.string,
  stroke: PropTypes.string,
  scale: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
};
