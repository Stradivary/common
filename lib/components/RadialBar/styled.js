/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const CircularBar = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: conic-gradient(
    ${(props) =>
        props.status === 'Success'
          ? `${theme.colors.green}`
          : props.status === 'Failed'
            ? `${theme.colors.secondary}`
            : `${theme.colors.primary}`}
      0% ${(props) => props.fillPercentage}%,
    #f6f5f5 ${(props) => props.fillPercentage}% 100%
  );
`;

export const GreyCircle = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100px;
  height: 100px;
  border: 4px solid ${theme.colors.neutral5};
  border-bottom-color: ${theme.colors.neutral40};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WhiteCircle = styled.div`
  position: absolute;
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
  border-radius: 50%;
  background-color: ${theme.colors.neutral5};
  display: flex;
  justify-content: center;
  align-items: center;
`;
