/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import PropTypes from 'prop-types';
import { FlexContainer } from './style';

export const Flex = ({
  children,
  align,
  bg,
  padding,
  direction,
  justify,
  size,
  gap,
  height,
  width,
  flex,
  radius,
  className,
  style,
  wrap,
  id,
  onClick,
  onKeyDown,
  flexFlow,
  position,
  margin,
  alignItems,
  alignContent,
  cursor,
}) => (
  <FlexContainer
    id={id}
    align={align}
    bg={bg}
    padding={padding}
    direction={direction}
    justify={justify}
    size={typeof size === 'number' ? size : { sp: 12, ...size }}
    gap={gap}
    height={height}
    width={width}
    flex={flex}
    radius={radius}
    className={`flex ${className}`}
    style={style}
    wrap={wrap}
    onClick={onClick}
    onKeyDown={onKeyDown}
    flexFlow={flexFlow}
    position={position}
    margin={margin}
    alignItems={alignItems}
    alignContent={alignContent}
    cursor={cursor}
  >
    {children}
  </FlexContainer>
);
Flex.defaultProps = {
  children: <></>,
  padding: '',
  margin: '',
  bg: '',
  direction: 'row',
  justify: 'left',
  align: 'top',
  size: {
    sp: 12,
  },
  gap: '',
  height: '',
  width: '',
  flex: '',
  radius: 'small',
  className: '',
  style: {},
  wrap: '',
  id: null,
  onClick: null,
  onKeyDown: null,
  flexFlow: '',
  position: null,
  alignItems: '',
  alignContent: '',
  cursor: '',
};
Flex.propTypes = {
  children: PropTypes.node,
  margin: PropTypes.oneOfType(
    [PropTypes.array, PropTypes.string],
    PropTypes.shape({
      sp: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
      tp: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
      tl: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
      dt: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
      dl: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
      mb: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
    })
  ),
  padding: PropTypes.oneOfType(
    [PropTypes.array, PropTypes.string],
    PropTypes.shape({
      sp: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
      tp: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
      tl: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
      dt: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
      dl: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
      mb: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.string]),
    })
  ),
  bg: PropTypes.string,
  direction: PropTypes.oneOf([
    'column',
    'row',
    'row-reverse',
    'column-reverse',
  ]),
  align: PropTypes.oneOf(['top', 'middle', 'bottom', 'stretch']),
  alignItems: PropTypes.oneOf([
    '',
    'stretch',
    'flex-start',
    'flex-end',
    'center',
    'baseline',
    'first baseline',
    'last baseline',
    'start',
    'end',
    'self-start',
  ]),
  alignContent: PropTypes.oneOf([
    '',
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
    'stretch',
    'start',
    'end',
    'baseline',
    'first baseline',
  ]),
  justify: PropTypes.oneOf(['left', 'center', 'right', 'space-between']),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      sp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      tp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      tl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      dt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      dl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      mb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ]),
  height: PropTypes.string,
  gap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      sp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      tp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      tl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      dt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      dl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      mb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ]),
  width: PropTypes.string,
  flex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      sp: PropTypes.string,
      tp: PropTypes.string,
      tl: PropTypes.string,
      dt: PropTypes.string,
      dl: PropTypes.string,
      mb: PropTypes.string,
    }),
  ]),
  flexFlow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      sp: PropTypes.string,
      tp: PropTypes.string,
      tl: PropTypes.string,
      dt: PropTypes.string,
      dl: PropTypes.string,
      mb: PropTypes.string,
    }),
  ]),
  radius: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  wrap: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  position: PropTypes.string,
  cursor: PropTypes.string,
};
