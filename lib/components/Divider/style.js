import styled from 'styled-components';
import { theme } from '../../styles/theme';

const LineDivider = styled.hr`
  display: block;
  ${({ width }) => width && `width: ${theme.spacings[width] || width}`};
  margin: ${({ margin }) => margin};
  border-style: inset;
  border-top: ${({ linePattern, borderWidth, color }) =>
    `${borderWidth} ${linePattern} ${theme.colors[color] || color}`};
  border-right: none;
  border-bottom: none;
  border-left: none;
  background: none;
  ${({ variant }) => variant === 'inset' && `margin-left: 1.6rem;`}
  ${({ variant }) =>
    variant === 'middle-inset' &&
    `margin-left: 1.6rem;
    margin-right: 1.6rem;`}
  ${({ variant }) => variant === 'vertical' && `transform: rotate(90deg);`}
`;

export { LineDivider };
