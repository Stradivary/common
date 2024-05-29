/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.spacing03};
  align-items: center;
  ${({ labelPlacement }) => {
    if (labelPlacement === 'left') {
      return {
        flexDirection: 'row',
      };
    }
    if (labelPlacement === 'right') {
      return {
        flexDirection: 'row-reverse',
      };
    }
    return {
      flexDirection: 'column',
      alignItems: 'start',
    };
  }}
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: 'pointer';
`;

export const Rectangle = styled.div`
  width: ${(props) => props.mode.width};
  height: ${(props) => props.mode.height};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 24px 24px 24px 24px;
  z-index: 1;
  background-color: ${(props) =>
    props.isActive ? '#0055B6' : props.disabled ? '#F6F5F5' : '#CCCCCC'};
`;

export const Circle = styled.div`
  width: ${(props) => props.mode.width};
  height: ${(props) => props.mode.height};
  border-radius: 50%;
  background-color: ${(props) => (props.disabled ? '#ADADAD' : 'white')};
  position: absolute;
  left: ${(props) => (props.isActive ? props.mode.left : '4px')};
  z-index: 2;
  transition: left 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
  }
`;
