/* eslint-disable prettier/prettier */
import { css } from 'styled-components';
import { screenSizes } from './breakpoints';

export const responsive = {
  mobile: (...args) => css`
    @media (min-width: ${screenSizes.mb[0]}px) and (max-width: ${screenSizes
        .mb[1]}px) {
      ${css(...args)};
    }
  `,
  tabletsm: (...args) => css`
    @media (min-width: ${screenSizes.tp[0]}px) and (max-width: ${screenSizes
        .tp[1]}px) {
      ${css(...args)};
    }
  `,
  tablet: (...args) => css`
    @media (min-width: ${screenSizes.tl[0]}px) and (max-width: ${screenSizes
        .tl[1]}px) {
      ${css(...args)};
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${screenSizes.dt[0]}px) {
      ${css(...args)};
    }
  `,
  desktopLarge: (...args) => css`
    @media (min-width: ${screenSizes.dl[0]}px) {
      ${css(...args)};
    }
  `,
  portrait: (args) => ({ '@media (orientation: portrait)': args }),
};
