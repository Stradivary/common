import styled from 'styled-components';
import { theme } from '../../styles/theme';

const defaultPadding = '24px';

export const DrawerContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: ${theme.colors.neutral5};
  overflow-y: auto;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ padding }) => padding || defaultPadding};
`;

export const DrawerContent = styled.div`
  padding: ${({ padding }) => padding || defaultPadding};
`;

export const DrawerFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ padding }) => padding || defaultPadding};
  border-top: 1px solid rgba(216, 216, 216, 1);
  gap: 16px;

  & a {
    padding: 12px 24px;
    color: black;
  }
`;
