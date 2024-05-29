import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const KanbanContainer = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
`;

export const KambanList = styled.div`
  height: calc(-100px + 60vh);
  width: 100%;
  overflow-y: auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

export const KanbanColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '4px',
  alignItems: 'flex-start',
  minWidth: '200px',
  gap: theme.spacings.spacing05,
  flex: '1 0 0',
  padding: '8px 0px 8px 8px',
  background: theme.colors.neutral,
});

export const LoaderComponent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const KanbanHeader = styled.div`
  top: 0;
  position: -webkit-sticky;
  position: sticky;
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
  padding: 8px 8px 16px 8px;
  outline: 1px solid ${theme.colors.neutral20};
  z-index: 1;
`;

export const HeaderTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '1rem',
});

export const Radial = styled.div(({ color, background }) => ({
  display: 'flex',
  width: '24px',
  height: '24px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '35px',
  color: theme.colors[color],
  background: theme.colors[background],
}));

export const Icon = styled.img(() => ({
  width: '160px',
  height: '160px',
  borderRadius: '100%',
}));

export const RelativeWrapper = styled.div`
  position: relative;
`;

const getPosition = (type) => {
  switch (type) {
    case 'left':
      return {
        left: '0px',
      };
    case 'right':
      return {
        right: '0px',
      };
    default:
      return {
        left: '0px',
      };
  }
};

export const DropdownWrapper = styled.div(({ top, minWidth, position }) => {
  const { left, right } = getPosition(position);
  return {
    position: 'absolute',
    top: top ? `calc(80% + ${top}px)` : 'calc(100% + 6px)',
    left,
    right,
    minWidth,
    width: 'max-content',
    backgroundColor: theme.colors.neutral5,
    zIndex: 5,
    boxShadow: `0px 0px 12px 1px ${theme.colors.neutral80}3D`,
    borderRadius: theme.radius.small,
  };
});
