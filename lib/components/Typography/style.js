import styled, { css } from 'styled-components';
import { get } from 'lodash';
import { theme } from '../../styles/theme';

const availSize = ['dl', 'dt', 'tl', 'tp', 'mb'];

const style = css`
  font-family: 'Poppins';
  ${({ display }) => display && `display: ${display};`}
  ${({ align }) => align && `text-align: ${align};`}
  ${({ color }) => color && `color: ${theme.colors[color] || color};`}
  ${({ hoverColor }) =>
    hoverColor &&
    `&:hover {
    color: ${theme.colors[hoverColor] || hoverColor};
  };`}
  ${({ letterSpacing }) => letterSpacing && `letter-spacing: ${letterSpacing};`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight};`}
  ${({ size }) => size && `font-size: ${size};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ capitalize }) => capitalize && `text-transform: capitalize;`}
  ${({ uppercase }) => uppercase && `text-transform: uppercase;`}
  ${({ wordBreak }) => wordBreak && `word-break: ${wordBreak};`}
  ${({ textDecoration }) =>
    textDecoration && `text-decoration: ${textDecoration};`}
  ${({ fontStyle }) => fontStyle && `font-style: ${fontStyle};`}
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
  ${({ elipsis }) =>
    elipsis &&
    `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
  ${({ lineClamp }) =>
    lineClamp &&
    `
    display: -webkit-box;
    -webkit-line-clamp: ${lineClamp};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
  ${({ size, lineHeight }) => theme.responsive.mobile`
    font-size: ${get(
      size,
      'mb',
      get(size, `${availSize.find((s) => size[s])}`, size)
    )};
    line-height: ${get(
      lineHeight,
      'mb',
      get(lineHeight, `${availSize.find((l) => lineHeight[l])}`, lineHeight)
    )};
  `}
  ${({ size, lineHeight }) => theme.responsive.tabletsm`
    font-size: ${get(
      size,
      'tp',
      get(size, `${availSize.find((s) => size[s])}`, size)
    )};
    line-height: ${get(
      lineHeight,
      'tp',
      get(lineHeight, `${availSize.find((l) => lineHeight[l])}`, lineHeight)
    )};
  `}
  ${({ size, lineHeight }) => theme.responsive.tablet`
    font-size: ${get(
      size,
      'tl',
      get(size, `${availSize.find((s) => size[s])}`, size)
    )};
    line-height: ${get(
      lineHeight,
      'tl',
      get(lineHeight, `${availSize.find((l) => lineHeight[l])}`, lineHeight)
    )};
  `}
  ${({ size, lineHeight }) => theme.responsive.desktop`
    font-size: ${get(
      size,
      'dt',
      get(size, `${availSize.find((s) => size[s])}`, size)
    )};
    line-height: ${get(
      lineHeight,
      'dt',
      get(lineHeight, `${availSize.find((l) => lineHeight[l])}`, lineHeight)
    )};
  `}
  ${({ size, lineHeight }) => theme.responsive.desktopLarge`
    font-size: ${get(size, `${availSize.find((s) => size[s])}`, size)};
    line-height: ${get(
      lineHeight,
      `${availSize.find((l) => lineHeight[l])}`,
      lineHeight
    )};
  `}
`;

export const h1 = styled.h1`
  ${style}
  font-family: 'Telkomsel Batik';
`;
export const h2 = styled.h2`
  ${style}
  font-family: 'Telkomsel Batik';
`;
export const h3 = styled.h3`
  ${style}
  font-family: 'Telkomsel Batik';
`;
export const h4 = styled.h4`
  ${style}
`;
export const h5 = styled.h5`
  ${style}
`;
export const h6 = styled.h6`
  ${style}
`;
export const body = styled.p`
  ${style}
`;
export const label = styled.label`
  ${style}
`;
export const div = styled.div`
  ${style}
`;
