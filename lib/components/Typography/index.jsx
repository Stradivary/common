/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import React from 'react';
import * as Types from './style';

export const Typography = ({
  id,
  display,
  align,
  letterSpacing,
  lineHeight,
  children,
  color,
  hoverColor,
  size,
  variant,
  weight,
  elipsis,
  lineClamp,
  capitalize,
  uppercase,
  wordBreak,
  margin,
  textDecoration,
  fontStyle,
  minWidth,
  style,
  dangerInnerHtml,
  className,
}) => {
  const Type = Types[variant] || Types.body;

  return (
    <Type
      id={id}
      display={display}
      align={align}
      letterSpacing={letterSpacing}
      lineHeight={lineHeight}
      color={color}
      hoverColor={hoverColor}
      size={size}
      weight={weight}
      elipsis={elipsis}
      lineClamp={lineClamp}
      capitalize={capitalize}
      uppercase={uppercase}
      wordBreak={wordBreak}
      margin={margin}
      textDecoration={textDecoration}
      fontStyle={fontStyle}
      minWidth={minWidth}
      style={style}
      className={`typography ${className}`}
    >
      {dangerInnerHtml ? (
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: children,
          }}
        />
      ) : (
        children
      )}
    </Type>
  );
};

Typography.defaultProps = {
  id: '',
  display: undefined,
  align: 'left',
  color: 'inherit',
  hoverColor: '',
  letterSpacing: undefined,
  lineHeight: 1,
  margin: '0',
  weight: 400,
  variant: 'body',
  size: 'inherit',
  elipsis: false,
  lineClamp: undefined,
  capitalize: false,
  uppercase: false,
  wordBreak: undefined,
  textDecoration: undefined,
  fontStyle: undefined,
  minWidth: undefined,
  style: {},
  dangerInnerHtml: false,
  className: '',
  children: '',
};
Typography.propTypes = {
  id: PropTypes.string,
  display: PropTypes.string,
  align: PropTypes.string,
  letterSpacing: PropTypes.string,
  lineHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      mb: PropTypes.string,
      dl: PropTypes.string,
      dt: PropTypes.string,
      tl: PropTypes.string,
      tp: PropTypes.string,
    }),
  ]),
  children: PropTypes.node,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      mb: PropTypes.string,
      dl: PropTypes.string,
      dt: PropTypes.string,
      tl: PropTypes.string,
      tp: PropTypes.string,
    }),
  ]),
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'h7',
    'label',
    'body',
    'div',
  ]),
  weight: PropTypes.oneOf([300, 400, 500, 600, 700, 'bold', 'normal']),
  margin: PropTypes.string,
  elipsis: PropTypes.bool,
  lineClamp: PropTypes.number,
  capitalize: PropTypes.bool,
  uppercase: PropTypes.bool,
  wordBreak: PropTypes.string,
  textDecoration: PropTypes.string,
  fontStyle: PropTypes.string,
  minWidth: PropTypes.string,
  style: PropTypes.shape({}),
  dangerInnerHtml: PropTypes.bool,
  className: PropTypes.string,
};
