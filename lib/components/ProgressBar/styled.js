import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const ProgressBarContainer = styled.div`
  width: ${({ width }) => width || '250px'};
  ${theme.responsive.mobile`
    width: 100%;
  `}
`;

export const ProgressContainer = styled.div`
  height: ${(props) => (props.size === 'small' ? '4px' : '8px')};
  width: 100%;
  border: 1px solid ${theme.colors.neutral40};
  border-radius: 5px;
  background-color: ${theme.colors.neutral20};
  overflow: hidden;
  margin-left: ${({ withoutMargin }) => (withoutMargin ? '0px' : '3px')};
  display: flex;
  align-items: center;
`;

export const ProgressBarInner = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: ${theme.colors.primary};
  transition: width 0.3s ease-in-out;
`;

export const Label = styled.div`
  font-family: 'Poppins';
  font-size: 16px;
  font-style: bold;
  font-weight: 500;
  line-height: 150%;
  margin-left: 5px;
`;

export const Type = styled.div`
  font-family: 'Poppins';
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-left: 10px;
`;

export const Filename = styled.div`
  font-family: 'Poppins';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-left: 5px;
`;

export const Icons = styled.div`
  font-size: 16px;
  margin-left: 10px;
  margin-top: 2px;
  color: #000;
`;

export const CloseIcon = styled.div`
  font-size: 16px;
  margin-left: 10px;
  color: #000;

  &:hover {
    cursor: pointer;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;
