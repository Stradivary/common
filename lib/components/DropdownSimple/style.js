import styled from 'styled-components';
import { theme } from '../../styles/theme';

const ThreeDot = styled.div`
  position: relative;
  minwidth: 36px;
  width: fit-content;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  padding: theme.spacings.spacing00 theme.spacings.spacing02;
  border-radius: ${({ isBorder }) => (isBorder ? theme.radius.small : 0)};
  border: ${({ isBorder }) =>
    isBorder ? `1.5px solid ${theme.colors.neutral50}` : 'none'};
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

const ContainerText = styled.div(() => ({
  minWidth: 36,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacings.spacing03,
  justifyContent: 'center',
}));

const IconContainer = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  cursor: props.disabled ? 'no-drop' : 'pointer',
  transform: props.deg ? `rotate(${props.deg}deg)` : 'rotate(0deg)',
  transition: 'all 30s ease-out',
}));

const ContainerItems = styled.div((props) => ({
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
  maxHeight: props.count * 30 || 150,
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

export {
  ThreeDot,
  ContainerDropdown,
  DropdownItem,
  ContainerItems,
  ContainerText,
  IconContainer,
};
