import React from 'react';
import PropTypes from 'prop-types';
import { LineDivider } from './style';

const propTypes = {
  variant: PropTypes.oneOf(['full-width', 'inset', 'middle-inset', 'vertical']),
  borderWidth: PropTypes.string,
  linePattern: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
};
const defaultProps = {
  variant: 'full-width',
  borderWidth: '1px',
  linePattern: 'solid',
  color: 'neutral40',
  width: undefined,
  margin: '0 auto',
};

export const Divider = (props) => {
  const { variant, borderWidth, linePattern, color, width, margin } = props;
  return (
    <LineDivider
      variant={variant}
      borderWidth={borderWidth}
      linePattern={linePattern}
      color={color}
      width={width} // use this prop in case divider not being shown and width need to be defined
      margin={margin}
    />
  );
};

Divider.defaultProps = defaultProps;
Divider.propTypes = propTypes;

export default Divider;
