import styled from 'styled-components';

export const LoaderComponent = styled.div(({ theme, isLoading }) => ({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  background: theme.colors.neutral2,
  zIndex: '9990',
  ...(isLoading
    ? {
        display: 'flex',
      }
    : {}),
}));

export const Icon = styled.img(() => ({
  width: '160px',
  height: '160px',
  borderRadius: '100%',
  padding: '12.5px',
}));
