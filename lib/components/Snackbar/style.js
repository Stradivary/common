import styled from 'styled-components';
import { theme } from '../../styles/theme';

const coloring = (type) => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: theme.colors.greenShade,
      };
    case 'warning':
      return {
        backgroundColor: theme.colors.yellowShade,
      };
    case 'info':
      return {
        backgroundColor: theme.colors.blue5,
      };
    case 'danger':
      return {
        backgroundColor: theme.colors.darkRed5,
      };
    default:
      return {
        backgroundColor: theme.colors.neutral30,
      };
  }
};

const position = (type) => {
  switch (type) {
    case 'top-left':
      return {
        top: '10px',
        left: '10px',
      };
    case 'top-right':
      return {
        top: '10px',
        right: '10px',
      };
    case 'bottom-left':
      return {
        bottom: '10px',
        left: '10px',
      };
    case 'bottom-right':
      return {
        bottom: '10px',
        right: '10px',
      };
    case 'top-center':
      return {
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'bottom-center':
      return {
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    default:
      return {
        top: '10px',
        left: '10px',
      };
  }
};

const Container = styled.div((props) => {
  const { backgroundColor } = coloring(props.type);
  const { top, left, right, bottom, transform } = position(
    window.innerWidth <= 480 ? 'top-center' : props.position
  );
  return {
    position: 'fixed',
    display: props.isOpen ? 'flex' : 'none',
    backgroundColor,
    bottom,
    right,
    left,
    top,
    transform,
    width: window.innerWidth <= 480 ? '90%' : 580,
    padding: `${theme.spacings.spacing05} ${theme.spacings.spacing04}`,
    borderRadius: theme.radius.small,
    justifyContent: 'space-between',
    zIndex: props.zIndex || 999999,
  };
});

const TextContainer = styled.div(() => ({
  display: 'flex',
  gap: theme.spacings.spacing03,
}));

const ActionContainer = styled.div(() => ({
  display: 'flex',
  gap: theme.spacings.spacing03,
  justifyContent: 'flex-end',
}));

const IconContainer = styled.div(() => ({
  display: 'flex',
}));

export { Container, TextContainer, ActionContainer, IconContainer };
