import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Wrapper = styled.div`
  background-color: ${({ bg, isOutlined }) =>
    isOutlined ? theme.colors.transparent : theme.colors[bg]};
  border: 1px solid ${({ bg }) => theme.colors[bg]};
  border-radius: ${theme.radius.small};
  padding: ${theme.spacings.spacing01} ${theme.spacings.spacing03};
  display: flex;
  flex-direction: row;
  gap: ${theme.spacings.spacing02};
  width: fit-content;
`;
