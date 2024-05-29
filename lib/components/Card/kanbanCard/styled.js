import styled from 'styled-components';
import { theme } from '../../../styles/theme';
// import { hexToRGBA } from '../../../utils';

export const KanbanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid ${theme.colors.neutral50};
  width: ${({ width }) => width || 'auto'};
  padding-top: ${({ isWarning }) => !isWarning && '1.2rem'};
  border-radius: 4px;
  margin-bottom: ${({ isMarginBottom }) => (isMarginBottom ? '16px' : '0px')};
  margin-right: 8px;
  background-color: ${({ bgColor }) => bgColor || `${theme.colors.neutral5}`};
  cursor: pointer;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0 1.2rem;

  & p:nth-child(2) {
    display: -webkit-box;
    text-overflow: ellipsis;
  }

  & p span {
    color: ${theme.colors.blue80};
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2px;
  }
`;

export const HeaderWarningWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: ${theme.colors.error};
  padding: 0.8rem;
  border-radius: 4px 4px 0 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0 1.2rem;
  padding-bottom: 1.2rem;
  & div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
