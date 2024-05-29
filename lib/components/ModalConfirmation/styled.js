import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 466px;
  width: 100%;
  height: 100%;
  ${theme.responsive.tabletsm`
    min-width: 100%;
  `}
  ${theme.responsive.mobile`
    min-width: 100%;
  `}
`;

export const ActionButtonWrapper = styled.div`
  margin: 40px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  ${theme.responsive.mobile`
  & > div {
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
  }

  & .responsive-button {
    width: 260px;
  }
`}
`;

export const ModalWrapper = styled.div({
  textAlign: 'center',
});
