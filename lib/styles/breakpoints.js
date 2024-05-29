import { css } from 'styled-components';

/** The screen breakpoints configuration */
export const screenSizes = {
  /* desktop large */
  dl: [1368, undefined],
  /* desktop */
  dt: [1025, 1367],
  /* tablet landscape */
  tl: [768, 1024],
  /* tablet portrait */
  tp: [600, 767],
  /* mobile */
  mb: [1, 599],
};

export const media = Object.keys(screenSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    // eslint-disable-next-line prettier/prettier
    @media (min-width: ${screenSizes[label][0]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
