import styled from 'styled-components';
import { Button as ButtonComponent } from '../Button';
import { theme } from '../../styles/theme';

export const Button = styled(ButtonComponent)`
  ${theme.responsive.mobile`
    padding: 8px;

    svg {
      margin: 0;
    }
  `}

  > div:first-child {
    display: flex;
    height: 22px;
    align-items: center;

    ${theme.responsive.mobile`
      height: 20px;
      width: ${({ showIconOnlyOnMobileScreen }) =>
        showIconOnlyOnMobileScreen ? '20px' : '70px'};
    `}
  }

  ${({ showIconOnly }) =>
    showIconOnly &&
    `  
    > div:nth-child(n + 2) {
      display: none;
    }
    svg {
      margin: 0;
    }
  `}

  ${theme.responsive.mobile`
    ${({ showIconOnlyOnMobileScreen }) =>
      showIconOnlyOnMobileScreen &&
      `
        > div:nth-child(n + 2) {
          display: none;
        }`} 
    `}
`;

export const RelativeWrapper = styled.div`
  position: relative;
`;

const getPosition = (type) => {
  switch (type) {
    case 'left':
      return {
        left: '0px',
      };
    case 'right':
      return {
        right: '0px',
      };
    default:
      return {
        left: '0px',
      };
  }
};

export const DropdownContainer = styled.div(({ top, minWidth, position }) => {
  const { left, right } = getPosition(position);
  return {
    position: 'absolute',
    top: top ? `calc(80% + ${top}px)` : 'calc(100% + 6px)',
    left,
    right,
    minWidth,
    width: 'max-content',
    backgroundColor: theme.colors.neutral5,
    zIndex: 5,
    boxShadow: `0px 0px 12px 1px ${theme.colors.neutral80}3D`,
    borderRadius: theme.radius.small,
  };
});

export const DropdownItem = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px;
  align-items: center;
  cursor: pointer;
  min-width: ${({ minWidth }) => minWidth};
  background-color: ${theme.colors.neutral5};

  &:first-child {
    border-top-right-radius: ${theme.radius.small};
    border-top-left-radius: ${theme.radius.small};
  }
  &:last-child {
    border-bottom-right-radius: ${theme.radius.small};
    border-bottom-left-radius: ${theme.radius.small};
  }
  ${({ disabled }) =>
    !disabled &&
    `
    &:hover {
      background-color: ${theme.colors.blue5};
    }
  `}
`;
