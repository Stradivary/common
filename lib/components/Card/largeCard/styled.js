import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import bgCardBlue from '../../../assets/images/bgCardBlue.webp';

export const LargeCardWrapper = styled.div`
  border-radius: ${theme.radius.large};
  background: ${({ bgColor }) => bgColor || `${theme.colors.blue80}`};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '160px'};
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.1);
  &:nth-child(1) {
    background-image: url(${bgCardBlue});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
`;

export const PaddingCardWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacings.spacing05,
  width: 'auto',
  height: '-webkit-fill-available',
});

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
`;

export const InnerContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
`;
