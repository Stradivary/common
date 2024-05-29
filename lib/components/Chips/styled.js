import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacings.spacing03};
  justify-content: center;
`;

export const ChipItemWrapper = styled.div`
  z-index: 9;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  gap: ${theme.spacings.spacing03};
  padding: ${theme.spacings.spacing03} ${theme.spacings.spacing04};
  border-radius: ${theme.radius.small};
  background: ${({ variant }) => {
    if (variant === 'text') {
      return theme.colors.transparent;
    }
    return theme.colors.blue5;
  }};
  box-shadow: ${({ isSelected, variant }) =>
    isSelected && variant === 'filled'
      ? `inset 0 0 0 1px ${theme.colors.primary}`
      : 'none'};

  & > p {
    color: ${({ isSelected }) =>
      isSelected ? theme.colors.primary : theme.colors.blue80};
  }

  &:hover {
    ${({ isSelected, variant, onClick }) => {
      if (isSelected) {
        if (variant === 'filled') {
          return `
          background: ${theme.colors.blue5};
          box-shadow: inset 0 0 0 1px ${theme.colors.primary};
          p {
            color: ${theme.colors.primary};
          }
          `;
        }
        return `
          background: ${theme.colors.transparent};
          box-shadow: none;
          p {
            color: ${theme.colors.primary};
          }
          `;
      }
      if (variant === 'filled') {
        return `
          background: ${theme.colors.blue5};
          ${
            onClick
              ? `box-shadow: inset 0 0 0 1px ${theme.colors.primary};`
              : 'none'
          }
          p {
            color: ${theme.colors.blue80};
          }
          `;
      }
      return `
          background: ${theme.colors.transparent};
          box-shadow: none;
          p {
            color: ${theme.colors.neutral70};
          }
          `;
    }}
  }

  &:active {
    background: ${({ variant }) =>
      variant === 'filled' ? theme.colors.blue5 : theme.colors.transparent};

    box-shadow: ${({ variant, onClick }) =>
      variant === 'filled' && onClick
        ? `inset 0 0 0 1px ${theme.colors.primary}`
        : 'none'};

    p {
      color: ${({ variant, onClick }) =>
        variant === 'filled' && onClick
          ? theme.colors.primary
          : theme.colors.blue80};
    }
  }
`;

export const ChipIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: ${theme.radius.large};
  background: ${theme.colors.blue80};
`;

export const ChipIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
