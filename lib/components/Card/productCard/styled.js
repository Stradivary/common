import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: ${({ width }) => width || 'fit-content'};
  height: ${({ height }) => height || 'auto'};
  background-color: ${({ bgColor }) => bgColor || `${theme.colors.neutral5}`};
  border-radius: 4px;
  gap: 1rem;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 4px;
`;

export const WrapperHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: ${({ isDisable }) =>
    isDisable
      ? theme.colors.neutral50
      : 'radial-gradient(133.69% 133.69% at 0% 6.25%, #dd5c5c 0%, #b90024 49.27%)'};
  border-radius: 4px 4px 0px 0px;
  padding: 16px;
  width: 100%;
  height: 100%;
  gap: 0.8px;
  & > div {
    display: flex;
    justify-content: space-between;
  }

  .tooltipWrapper {
    min-width: max-content;
    padding: 10px;
  }

  .tooltipTextWrapper {
    margin-left: 0;
  }

  .tooltipTitleSpacing {
    padding-bottom: 4px;
  }

  .toolltipContentSpacing {
    display: none;
  }

  .tooltipTitle {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 150%;
  }
  .tooltipText {
    font-size: 1rem;
    font-weight: 400;
    line-height: 150%;
  }
`;

export const ContentWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & button {
    box-sizing: border-box;

    & img {
      margin-right: auto;
    }
  }
`;

export const ContentInner = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 0rem;
  border-bottom: 1px solid rgba(204, 204, 204, 1);
  gap: 0;

  &:last-of-type {
    border-bottom: none;
  }

  & > * {
    padding: 0 2rem;
  }

  & div:first-child {
    display: flex;
    gap: 1rem;
  }

  & div:not(:first-child) {
    display: flex;
    align-items: baseline;
    gap: 0.3rem;
  }
`;
