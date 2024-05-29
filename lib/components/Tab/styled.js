/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { RectangleDark, RectangleLight } from '../../assets';
import { theme } from '../../styles/theme';

export const TabContainer = styled.div`
  list-style-type: none;
  display: flex;
  padding: 0;
  padding-right: 9px;
  overflow-x: auto;
  scrollbar-color: theme.colors.blue10;
  scrollbar-width: thin;
  width: ${({ width }) => width};
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ variant }) => variant === 'outer' && `gap: ${theme.spacings.spacing02};`}
  
  ${theme.responsive.mobile`
    flex-wrap: nowrap; 
    justify-content: space-between;
    overflow-x: auto;
    scrollbar-color: ${theme.colors.blue10};
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.blue10};
    }
  `}
  
  ${theme.responsive.tablet`
    justify-content: space-between;
  `}
  
  ${theme.responsive.desktop`
    justify-content: space-between;
  `}
`;

export const InnerTabContainer = styled.div`
  list-style-type: none;
  display: flex;
  padding: 0;
  width: ${({ width }) => width};
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ variant }) => variant === 'outer' && `gap: ${theme.spacings.spacing02};`}

  ${theme.responsive.mobile`
    flex-wrap: nowrap; 
    justify-content: space-between;
    overflow-x: auto;
    scrollbar-color: ${theme.colors.blue10};
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.blue10};
    }
  `}
  
  ${theme.responsive.tablet`
    justify-content: space-between;
  `}

  ${theme.responsive.desktop`
    justify-content: space-between;
  `}
`;

export const Header = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

export const StickyButton = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  left: 10px;
`;

export const LiStyles = styled.li`
  display: flex;
  align-items: center;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  padding: 6px;
  padding-right: 6px;
  ${({ width }) => width && `width: ${width};`}
  border-bottom: 1.5px solid
    ${({ active }) =>
    active ? `${theme.colors.primary}` : `${theme.colors.blue10}`};
  cursor: ${({ disabled }) => (disabled ? 'pointer' : 'pointer')};
  color: ${({ active, disabled }) =>
    active
      ? `${theme.colors.primary}`
      : disabled
        ? `${theme.colors.neutral40}`
        : `${theme.colors.neutral70}`};
  flex-grow: 1;
  text-align: center;
  p {
    margin: auto;
  }
`;

export const SpanStyles = styled.span`
  margin-right: 5px;
  color: ${({ active, disabled }) =>
    active
      ? `${theme.colors.primary}`
      : disabled
        ? `${theme.colors.neutral40}`
        : `${theme.colors.neutral70}`};
`;

export const OuterLiStyles = styled.li`
  display: flex;
  align-items: end;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  padding: 12px;
  padding-right: 6px;
  width: ${({ active, width }) => (active ? 'auto' : width)};
  ${theme.responsive.mobile`
    ${({ active }) => active && 'width: auto; min-width: 50%;'}
    ${({ active }) => active && 'width: auto; max-width: 100%;'}
  `}
  ${theme.responsive.tablet`
    ${({ active }) => active && 'width: auto; min-width: 30%;'}
    ${({ active }) => active && 'width: auto; max-width: 100%;'}
  `}
  ${theme.responsive.tabletsm`
    ${({ active }) => active && 'width: auto; min-width: 30%;'}
    ${({ active }) => active && 'width: auto; max-width: 100%;'}
  `}
  ${theme.responsive.desktop`
    ${({ active }) => active && 'width: auto; min-width: 20%;'}
    ${({ active }) => active && 'width: auto; max-width: 100%;'}
  `}
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
  color: ${({ active, disabled }) =>
    active
      ? `${theme.colors.primary}`
      : disabled
        ? `${theme.colors.neutral30}`
        : `${theme.colors.neutral60}`};
  flex-grow: 1;
  background: ${({ active }) =>
    active ? theme.colors.neutral5 : theme.colors.neutral30};
  border-radius: ${theme.radius.large} ${theme.radius.large} 0 0;
  z-index: ${({ zIndex }) => zIndex && zIndex};
  position: relative;
  &::after {
    position: absolute;
    content: '';
    width: 16px;
    height: 100%;
    right: -9px;
    top: 0;
    background-image: ${({ active }) =>
      active ? `url(${RectangleLight})` : `url(${RectangleDark})`};
  }

  .tooltipContainer {
    position: fixed;
    min-width: max-content;
    display: flex;
    flex: 1;
    width: 100px;
  }

  @media screen and (max-width: 768px) {
    .tooltipContainer {
      right: 100px;
    }
  }

  @media screen and (max-width: 480px) {
    .tooltipContainer {
      right: 50px;
    }
  }

  .tooltipWrapper {
    padding: 10px;
    transform: translateY(-20%) translateX(-35%);
  }

  @media screen and (max-width: 480px) {
    .tooltipWrapper {
      width: 30px;
    }
  }

  .tooltipText {
    line-height: 1.5rem;
  }
`;

export const OuterSpanStyles = styled.span`
  margin-right: 5px;
  color: ${({ active, disabled }) =>
    active
      ? `${theme.colors.primary}`
      : disabled
        ? `${theme.colors.neutral40}`
        : `${theme.colors.neutral70}`};
`;
