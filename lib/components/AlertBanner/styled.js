import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

const coloring = (type) => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: theme.colors.greenShade,
        borderColor: theme.colors.green,
      };
    case 'warning':
      return {
        backgroundColor: theme.colors.yellowShade,
        borderColor: theme.colors.yellow,
      };
    case 'danger':
      return {
        backgroundColor: theme.colors.darkRed5,
        borderColor: theme.colors.darkRed50,
      };
    default:
      return {
        backgroundColor: theme.colors.blue5,
        borderColor: theme.colors.primary,
      };
  }
};

export const Container = styled.section`
  display: none;
  width: ${({ width }) => width}};
  padding: ${theme.spacings.spacing05};
  ${({ type }) => {
    const { backgroundColor, borderColor } = coloring(type);
    return css`
      border-left: 5px solid ${borderColor};
      background: ${backgroundColor};
    `;
  }}
  position: fixed;
  zIndex: 9999;
  border-radius: ${theme.radius.large};
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  ${({ isOpen }) =>
    isOpen &&
    `
    display: flex;
  `}
`;

export const info = styled(Container)`
  border-left: 5px solid ${theme.colors.primary};
  background: ${theme.colors.blue5};
`;

export const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CloseIconWrapper = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid ${theme.colors.neutral40};
  padding-left: ${theme.spacings.spacing05};
`;
