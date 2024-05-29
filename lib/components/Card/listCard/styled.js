import styled from 'styled-components';
import { hexToRGBA } from '../../../utils';
import { theme } from '../../../styles/theme';

export const ListCardWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: ${({ width }) => width || 'fit-content'};
  height: ${({ height }) => height || 'fit-content'};
  border: ${({ border }) =>
    border || `1px solid ${hexToRGBA(theme.colors.neutral80, 0.5)}`};
  border-radius: 8px;
  padding: 2rem;
  background-color: ${({ bgColor }) => bgColor || `${theme.colors.neutral5}`};
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

export const ContentInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #f2f5f7;
  padding: 1.6rem;
  border-radius: 8px;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & div p {
      display: flex;
      align-items: center;
      color: ${theme.colors.neutral70};
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16px;
    }

    & p span {
      color: ${theme.colors.blue80};
      font-size: 14px;
      font-weight: 700;
      margin-right: 0.4rem;
    }
  }
`;
