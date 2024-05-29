import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { hexToRGBA } from '../../utils';

const sizing = (size, padding) => {
  let fontSize = '1.4rem';
  let paddingSizing = `${theme.spacings.spacing04} ${theme.spacings.spacing06}`; // large
  if (size === 'medium') {
    fontSize = '1.2rem';
    paddingSizing = `${theme.spacings.spacing03} ${theme.spacings.spacing05}`;
  } else if (size === 'small') {
    fontSize = '1rem';
    paddingSizing = `${theme.spacings.spacing02} ${theme.spacings.spacing03}`;
  }
  paddingSizing = padding || paddingSizing;
  return { fontSize, paddingSizing };
};
const svgRender = (endIcon, startIcon) => `
  svg {
    margin-left: ${endIcon ? theme.spacings.spacing03 : '0'};
    margin-right: ${startIcon ? theme.spacings.spacing03 : '0'};
  }
`;
export const BaseButton = styled.button`
  position: relative;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  border-radius: ${theme.radius.small};
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  height: ${({ height }) => height || '40px'};
  color: ${({ color }) => theme.colors[color]};
  ${({ size, padding }) => {
    const { fontSize, paddingSizing } = sizing(size, padding);
    return css`
      font-size: ${fontSize};
      padding: ${paddingSizing};
    `;
  }}
  ${({ endIcon, startIcon }) => svgRender(endIcon, startIcon)};
  &:active {
    outline: none;
    background-image: linear-gradient(rgb(0 0 0/30%) 0 0);
  }
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 1;
    cursor: not-allowed;
    background-image: none;
  }
  ${({ hideChildrenWhenMobile }) =>
    hideChildrenWhenMobile &&
    theme.responsive.mobile`
    svg {
      margin-left: 0;
      margin-right: 0;
    }
  `}
  ${({ paddingSize }) =>
    paddingSize.mb &&
    theme.responsive.mobile`
    padding: ${paddingSize.mb};
  `}
  ${({ paddingSize }) =>
    paddingSize.tp &&
    theme.responsive.tabletsm`
    padding: ${paddingSize.tp};
  `}
  ${({ paddingSize }) =>
    paddingSize.tl &&
    theme.responsive.tablet`
    padding: ${paddingSize.tl};
  `}
  ${({ paddingSize }) =>
    paddingSize.dt &&
    theme.responsive.desktop`
    padding: ${paddingSize.dt};
  `}
`;
export const Contained = styled(BaseButton)`
  width: ${({ fullWidth, width }) => (fullWidth ? '100%' : width)};
  background-color: ${({ bgColor }) => theme.colors[bgColor]};
  border: 1px solid ${({ bgColor }) => theme.colors[bgColor]};
  &:disabled {
    background-color: ${theme.colors.neutral40};
    color: ${theme.colors.neutral5};
    border: 1px solid ${theme.colors.neutral40};
  }
`;
export const Outlined = styled(BaseButton)`
  background-color: ${theme.colors.transparent};
  border: ${({ border }) => border || `1px solid`}${({ bgColor }) => theme.colors[bgColor]};
  width: ${({ fullWidth, width }) => (fullWidth ? '100%' : width)};
  &:active {
    background-image: none;
  }
  &:disabled {
    border-color: ${theme.colors.neutral40};
    color: ${theme.colors.neutral40};
  }
  border-radius: ${({ borderRadius }) => borderRadius || ''};
  padding: ${({ padding }) => padding};
`;
export const Link = styled(RouterLink)`
  color: ${({ color, disabled }) =>
    disabled ? theme.colors.neutral50 : theme.colors[color]};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ fullWidth, width }) => (fullWidth ? '100%' : width)};
  ${({ padding }) => padding && `padding: ${padding};`}
  display: flex;
  ${({ $endIcon, $startIcon }) => svgRender($endIcon, $startIcon)};
  ${({ size }) => {
    const { fontSize } = sizing(size);
    return css`
      font-size: ${fontSize};
    `;
  }}
  ${({ textDecoration }) =>
    textDecoration && `text-decoration: ${textDecoration};`}
  &:active {
    background-image: none;
  }
`;

export const Floating = styled(BaseButton)`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ fullWidth, width }) => (fullWidth ? '100%' : width)};
  height: ${({ height }) => height || '100%'};
  background-color: ${({ bgColor }) =>
    bgColor ? theme.colors[bgColor] : theme.colors.neutral5};
  border-radius: ${({ borderRadius }) => borderRadius || '45.45px'};
  box-shadow: ${({ boxShadow }) =>
    boxShadow || `0 6px 6px ${hexToRGBA(theme.colors.neutral80, 0.05)}`};
  gap: ${({ gap }) => gap || 0};
  border: none;
  padding: ${({ padding }) => padding || '8px 12px'};
  transition: 0.9s;

  &:active {
    opacity: 0.8;
    background-image: none;
    box-shadow: none;
  }
  &:focus {
    background-color: none;
  }

  &:disabled {
    background-color: ${theme.colors.neutral40};
    color: ${theme.colors.neutral5};
  }
`;

export const ChildrenWrapper = styled.div`
  ${({ hideChildrenWhenMobile }) =>
    hideChildrenWhenMobile &&
    theme.responsive.mobile`
    display: none;
  `}
`;
