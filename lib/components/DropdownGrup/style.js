import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ContainerDropdown = styled.div((props) => ({
  position: 'absolute',
  minWidth: 36,
  top: 37,
  zIndex: 2,
  alignItems: 'center',
  paddingTop: 1,
  borderTop: `1.5px solid ${theme.colors.primary}`,
  right: props.isRight ? 0 : '-100%',
}));

const ContainerItems = styled.div(() => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  padding: theme.spacings.spacing02,
  right: 5,
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacings.spacing02,
  alignSelf: 'stretch',
  userSelect: 'none',
  cursor: 'pointer',
  borderRadius: theme.radius.small,
  border: `0.5px solid ${theme.colors.neutral50}`,
  backgroundColor: 'white',
  maxHeight: 128,
  overflowY: 'scroll',
  overflowX: 'hidden',
  ' &::-webkit-scrollbar': {
    width: '0px',
  },
}));

const DropdownItem = styled.div(() => ({
  display: 'flex',
  minWidth: 20,
  width: 'calc(100% - 8px)',
  height: '100%',
  justifyContent: 'center',
  padding: theme.spacings.spacing02,
  alignItems: 'center',
  borderRadius: 3,
  '&:hover': {
    background: theme.colors.primary,
  },
  '&:hover > p': {
    color: theme.colors.neutral5,
  },
}));

export { ContainerDropdown, DropdownItem, ContainerItems, Container };
