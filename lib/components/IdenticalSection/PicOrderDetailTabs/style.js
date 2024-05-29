import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || theme.spacings.spacing05};
  width: 100%;
  ${theme.responsive.mobile`
    .order-id {
      margin-bottom: ${theme.spacings.spacing03};
    }
    #pic-order-2fa-auth-2 {
      display: none;
    }
  `}
  ${theme.responsive.desktop`
    .otp2 {
      display: none;
    }
    #pic-order-2fa-auth-2 {
      transform: translateY(-45px);
    }
  `}
`;

const TitleWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacings.spacing02,
});

const Grid = styled.div`
  display: grid;
  align-items: baseline;
  gap: ${({ gap }) => gap || theme.spacings.spacing04};
  grid-template-columns: repeat(${({ column = 3 }) => 12 / column}, 1fr);
  ${theme.responsive.tablet`
    grid-template-columns: repeat(${({ column, md }) =>
      12 / md || column}, 1fr);
  `}
  ${theme.responsive.tabletsm`
    grid-template-columns: repeat(${({ column, sm }) =>
      12 / sm || column}, 1fr);
  `}
  ${theme.responsive.mobile`
    grid-template-columns: repeat(${({ column, xsm }) =>
      12 / xsm || column}, 1fr);
    gap: 0.6rem
  `}
`;

const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacings.spacing03};
  ${theme.responsive.mobile`
    flex-direction: column;
    margin-bottom: 0.5rem;
  `}
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  gap: ${theme.spacings.spacing03};
`;

export { Container, TitleWrapper, Grid, ToolbarWrapper, ActionButtonWrapper };
