import styled from 'styled-components';
import { media } from '../../styles/breakpoints';

const getWidth = (size, screen) => {
  if (size[screen] === 0)
    return media[screen]`
          display: none;
      `;
  if (!size[screen]) return null;
  return media[screen]`
      width: ${
        typeof size[screen] === 'string'
          ? size[screen]
          : `${(100 / 12) * size[screen]}%`
      };
    `;
};
const getFlex = (flex, screen) => {
  return media[screen]`
    flex: ${flex[screen] || flex};
  `;
};
const getFlexFlow = (flexFlow, screen) => {
  return media[screen]`
    flex-flow: ${flexFlow[screen] || flexFlow};
  `;
};
const getGap = (gap, screen, theme) => {
  return media[screen]`
    gap: ${theme.spacings[gap[screen]] || gap[screen]};
  `;
};
const aligns = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
  'space-between': 'space-between',
};
const justifies = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  'space-between': 'space-between',
};
const getValuePadding = (padding, theme) => {
  if (Array.isArray(padding)) {
    return `${theme.spacings[padding[0]] || ''} ${
      theme.spacings[padding[1]] || ''
    } ${theme.spacings[padding[2]] || ''} ${theme.spacings[padding[3]] || ''}`;
  }
  return theme.spacings[padding] || theme.spacings.spacing00;
};

const getValueMargin = (margin, theme) => {
  if (Array.isArray(margin)) {
    return `${theme.spacings[margin[0]] || ''} ${
      theme.spacings[margin[1]] || ''
    } ${theme.spacings[margin[2]] || ''} ${theme.spacings[margin[3]] || ''}`;
  }
  return theme.spacings[margin] || margin;
};

export const FlexContainer = styled.div`
  ${({ position }) => `position: ${position};`}
  display: flex;
  box-sizing: border-box;
  flex-direction: ${({ direction }) => direction || 'row'};
  gap: ${({ gap, theme }) => theme.spacings[gap] || gap};
  padding: ${({ padding, theme }) => getValuePadding(padding, theme)};
  margin: ${({ margin, theme }) => getValueMargin(margin, theme)};
  flex-wrap: ${({ direction, wrap }) => {
    if (wrap) {
      return wrap;
    }
    return direction === 'column' ? 'nowrap' : 'wrap';
  }};
  justify-content: ${({ justify }) => justifies[justify]};
  align-items: ${({ align, alignItems }) => alignItems || aligns[align]};
  align-content: ${({ alignContent }) => alignContent};
  background-color: ${({ bg, theme }) =>
    theme.colors[bg] || theme.colors.transparent};
  max-width: 100%;
  height: ${({ height }) => height || 'fit-content'};
  width: ${({ size, flex, width }) => {
    if (!flex) return `${(100 / 12) * (size?.sp || size || 12)}%`;
    return width;
  }};
  cursor: ${({ cursor }) => cursor};
  border-radius: ${({ radius, theme }) => theme.radius[radius] || radius};
  ${({ size }) => getWidth(size, 'mb')};
  ${({ size }) => getWidth(size, 'tp')};
  ${({ size }) => getWidth(size, 'tl')};
  ${({ size }) => getWidth(size, 'dt')};
  ${({ size }) => getWidth(size, 'dl')};
  ${({ flex }) => getFlex(flex, 'mb')};
  ${({ flex }) => getFlex(flex, 'tp')};
  ${({ flex }) => getFlex(flex, 'tl')};
  ${({ flex }) => getFlex(flex, 'dt')};
  ${({ flex }) => getFlex(flex, 'dl')};
  ${({ flexFlow }) => getFlexFlow(flexFlow, 'mb')};
  ${({ flexFlow }) => getFlexFlow(flexFlow, 'tp')};
  ${({ flexFlow }) => getFlexFlow(flexFlow, 'tl')};
  ${({ flexFlow }) => getFlexFlow(flexFlow, 'dt')};
  ${({ flexFlow }) => getFlexFlow(flexFlow, 'dl')};
  ${({ gap, theme }) => getGap(gap, 'mb', theme)};
  ${({ gap, theme }) => getGap(gap, 'tp', theme)};
  ${({ gap, theme }) => getGap(gap, 'tl', theme)};
  ${({ gap, theme }) => getGap(gap, 'dt', theme)};
  ${({ gap, theme }) => getGap(gap, 'dl', theme)};
`;
