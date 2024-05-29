import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

const transitionDuration = 0.3;
export const AccordionHeader = styled.div`
  position: relative;
  padding: ${theme.spacings.spacing04} ${theme.spacings.spacing05};
  cursor: ${({ alwaysOpenOnDesktop }) =>
    alwaysOpenOnDesktop ? 'default' : 'pointer'};
  background-color: ${({ variant, headerBackgroundColor }) => {
    if (headerBackgroundColor) return theme.colors[headerBackgroundColor];
    if (variant === 'custom') return theme.colors.neutral;
    if (variant === 'filled') return theme.colors.neutral10;
    return theme.colors.neutral5;
  }};
`;

export const AccordionContent = styled.div`
  transition: height ${transitionDuration}s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow: visible;
  min-height: 0;
  ${({ visible, contentHeight, overflowVisibleWhenOpened }) => {
    if (visible) {
      return {
        height: contentHeight,
        overflow: overflowVisibleWhenOpened ? 'visible' : 'hidden',
      };
    }
    return {
      padding: 0,
      height: 0,
      overflow: 'hidden',
    };
  }}
  ${({ alwaysOpenOnDesktop, contentHeight }) =>
    alwaysOpenOnDesktop &&
    theme.responsive.desktop`
    height: ${contentHeight}px !important;
    overflow: visible;
  `}
`;
export const AccordionInnerContent = styled.div`
  padding: ${({ innerPadding }) =>
    innerPadding || `${theme.spacings.spacing04} ${theme.spacings.spacing05}`};
  ${({ variant }) => {
    if (variant === 'custom')
      return css`
        margin-left: ${theme.spacings.spacing05};
        border-left: 1px solid ${theme.colors.neutral50};
      `;
    return null;
  }}
`;
export const AccordionWrapper = styled.div`
  width: 100%;
  border: 1px solid ${theme.colors.neutral40};
  border-width: ${({ variant }) =>
    variant === 'filled' || variant === 'custom' ? 0 : '1px'};
  position: relative;
  ${({ borderBottom }) => !borderBottom && `border-bottom: none;`};
  ${({ borderTop }) => !borderTop && 'border-top: none;'}
  ${({ borderSide }) => {
    if (!borderSide)
      return {
        borderLeft: 'none',
        borderRight: 'none',
      };
    return null;
  }}
`;
export const WrapperIcon = styled.div`
  position: absolute;
  top: ${theme.spacings.spacing04};
  transition: all ${transitionDuration}s ease-in-out;
  ${({ iconPosition }) =>
    iconPosition === 'left' && `left: ${theme.spacings.spacing04};`}
  ${({ iconPosition }) =>
    iconPosition === 'right' && `right: ${theme.spacings.spacing04};`}
  ${({ visible }) => visible && `transform: rotate(-180deg);`}
  ${({ alwaysOpenOnDesktop }) =>
    alwaysOpenOnDesktop &&
    theme.responsive.desktop`
    display: none;
  `}
`;
