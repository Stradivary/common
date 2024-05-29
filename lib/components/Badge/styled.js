import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

const getBackgroundColor = (variant) => {
  switch (variant) {
    case 'notification':
    case 'dot':
      return `${theme.colors.secondary}`;
    case 'icon':
      return `${theme.colors.neutral5}`;
    default:
      return `${theme.colors.primary}`;
  }
};

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 18px;
  color: ${theme.colors.neutral5};
  padding: ${({ variant }) => {
    if (variant === 'icon' || variant === 'dot') {
      return '0';
    }
    return `${theme.spacings.spacing01} ${theme.spacings.spacing03}`;
  }};
  border-radius: ${({ variant }) =>
    variant !== 'icon' || variant !== 'dot'
      ? '999px'
      : `${theme.radius.rounded}`};
  background-color: ${({ variant, backgroundColor }) =>
    theme.colors[backgroundColor] || getBackgroundColor(variant)};
  width: ${({ variant }) => {
    if (variant === 'icon') {
      return '13px';
    }
    if (variant === 'dot') {
      return '10px';
    }
    return 'max-content';
  }};
  height: ${({ variant }) => {
    if (variant === 'icon') {
      return '13px';
    }
    if (variant === 'dot') {
      return '10px';
    }
    return 'max-content';
  }};
  ${({ outlineColor }) => outlineColor && `outline: 1px solid ${outlineColor};`}
  ${({ style }) =>
    style &&
    css`
      ${style};
    `}
`;
