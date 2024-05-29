import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledNoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledNoDataContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacings.spacing03};

  ${() => theme.responsive.mobile`
    width: 100%;

    #txt-no-data,
    #txt-no-data-body {
      width: 100% !important;
    }
  `}
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  gap: ${({ gap }) => theme.spacings[gap]};
  overflow: ${({ overflow }) => overflow};
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  margin: ${({ margin }) => margin};
  color: ${({ color }) => theme.colors[color]};
  text-align: ${({ textAlign }) => textAlign};
`;
