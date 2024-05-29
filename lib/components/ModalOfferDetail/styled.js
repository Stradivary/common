import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const WrapperHeaderModal = styled.div`
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
    gap: 10px;
    align-items: center;
  }
`;

export const ContentWrapperModal = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;

  & button {
    box-sizing: border-box;

    & img {
      margin-right: auto;
    }
  }
`;

export const WrapperContentInner = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 3rem;

  ${theme.responsive.mobile`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

export const ContentInner = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0rem;
  gap: 0;

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

export const Divider = styled.hr`
  margin: 6px 0;
  border-top: 1px solid ${theme.colors.neutral50};
`;

export const Collapse = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContentCollapse = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
`;

export const Ol = styled.ol`
  margin: 0;
  padding: 0;
  padding-left: 30px;
`;
export const Li = styled.li`
  color: ${theme.colors.neutral70};
  margin: 0px;
  padding: 0px;
  font-size: 14px;
`;

export const CloseBtn = styled.div`
  position: absolute;
  cursor: pointer;
  top: ${theme.spacings.spacing05};
  right: ${theme.spacings.spacing05};
`;
