import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Button } from '../Button';

export const Container = styled.div`
  display: flex;
  gap: ${theme.spacings.spacing05};
  flex-direction: column;
  width: 100%;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  min-width: 100%;
  width: 100%;
  padding: 0;
  position: relative;
  border-radius: ${theme.radius.large};

  * {
    box-sizing: inherit;
  }

  /* Webkit (Chrome, Safari) & Blink (Opera) scrollbar styles */
  @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: ${theme.radius.large};
      background-color: ${theme.colors.neutral40};
    }

    &::-webkit-scrollbar-track {
      background-color: ${theme.colors.neutral20};
    }
  }

  /* Firefox scrollbar styles */
  @media screen and (min--moz-device-pixel-ratio: 0) {
    & {
      scrollbar-width: thin;
      scrollbar-color: ${theme.colors.neutral40} ${theme.colors.neutral20};
    }
  }
`;

export const StyledTable = styled.table`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  border-spacing: 0;
  min-width: 100%;
  font-size: 1.2rem;
  line-height: 150%;
  table-layout: fixed;

  tbody,
  thead {
    overflow: visible;
  }

  thead tr {
    background-color: ${theme.colors.blue80};
    text-align: left;
    width: min-content;

    &:first-child th {
      ${() => theme.responsive.mobile`
        position: static !important;
      `}
      &:first-child {
        border-top-left-radius: ${theme.radius.large};
        ${({ isDataEmpty }) =>
          isDataEmpty && `border-bottom-left-radius: ${theme.radius.large};`}
      }

      &:last-child {
        border-top-right-radius: ${theme.radius.large};
        ${({ isDataEmpty }) =>
          isDataEmpty && `border-bottom-right-radius: ${theme.radius.large};`}
        ${({ isLastColumnGrouped }) =>
          isLastColumnGrouped && `border-bottom-right-radius: 0`}
      }
    }
  }

  ${({ isLastColumnGrouped }) => {
    return (
      isLastColumnGrouped &&
      `thead tr:last-child > th:last-child {
      border-bottom-right-radius: ${theme.radius.large};
      }`
    );
  }}

  th {
    background-color: ${theme.colors.blue80};
    padding: 12px 20px;
    font-weight: 700;
    color: ${theme.colors.neutral5};

    ${theme.responsive.mobile`
      padding: 12px 12px;
    `}
  }

  td {
    color: ${theme.colors.neutral70};
    padding: 12px 20px;
    font-weight: 500;
    /* height: 60px; */
  }

  tbody tr:nth-of-type(odd) {
    background-color: ${theme.colors.neutral5};
    td {
      background-color: ${theme.colors.neutral5};
    }
  }

  tbody tr:nth-of-type(even) {
    background-color: ${theme.colors.neutral20};
    td {
      background-color: ${theme.colors.neutral20};
    }
  }
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
  cursor: ${({ cursor }) => cursor};
`;

export const StyledTd = styled.td`
  overflow: ${({ overflow }) => overflow};
  position: ${({ position }) => position};
`;

export const StyledActionsDropdownWrapper = styled.div`
  position: absolute;
  background-color: ${theme.colors.neutral5};
  border-radius: ${theme.radius.small};
  box-shadow: 0px 0px 2px ${theme.colors.neutral70};
  z-index: 2;
  display: block;
  overflow: visible;
  ${({ position }) => (position ? 'bottom: 50%;' : 'top: 50%;')}
`;

export const StyledActionsDropdown = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  text-align: center;
  padding: 12px;
  gap: ${theme.spacings.spacing03};
  min-width: 200px;
  cursor: pointer;
`;

export const StyledThGroup = styled.th`
  && {
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    padding-top: ${({ paddingTop }) => paddingTop};
    /* height: 20px; */
    width: ${({ width }) => width};
    ${() => theme.responsive.mobile`
        position: static !important;
      `}
  }
`;

export const StyledTooltipWrapper = styled.div`
  position: relative;
`;

export const TagWrapper = styled.td`
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;

    > p {
      width: 100%;
      white-space: nowrap;
      text-align: center;
    }
  }
`;

export const StyledTdTypeLink = styled.td`
  > div {
    width: 100%;
  }
`;

export const Link = styled(Button)`
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;

  &:hover,
  > p:hover {
    color: ${theme.colors.secondary};
  }
`;

export const Sublink = styled(Button)`
  &:hover,
  > p:hover {
    color: ${theme.colors.secondary};
  }
`;

export const StyledTdTypeRadioButton = styled.td`
  > div {
    margin-bottom: 0;
    display: flex;
    justify-content: center;

    > div {
      margin: 0;
    }
  }

  input {
    border: 2px solid ${theme.colors.neutral60};
  }

  input::after {
    width: 8px;
    height: 8px;
    margin: 4px;
    background-color: transparent;
  }
`;

export const StyledThTypeCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  div {
    margin: 0;
  }
  input {
    position: relative;
    appearance: none;
    margin: 0;
    width: 14px;
    height: 14px;
    border: 2px solid ${theme.colors.neutral50};
    border-radius: ${theme.radius.small};

    &:disabled {
      border-color: ${theme.colors.neutral};
      cursor: auto;
    }

    &:disabled::after {
      cursor: auto;
    }
    &:checked {
      border-color: ${theme.colors.primary};
      background: ${theme.colors.primary};
    }

    &:checked::after {
      content: '✔';
      position: absolute;
      left: 8%;
      color: ${theme.colors.neutral5};
      top: 0%;
      background-image: none;
      transform: scale(0.85);
    }
  }

  label {
    display: none;
  }
`;

export const StyledTdTypeCheckbox = styled.td`
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.neutral80};
  }

  * {
    font-size: ${({ fontSize }) => fontSize || '1.4rem'};
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
  }

  div {
    margin: 0;
    margin-left: 3px;
  }

  input {
    position: relative;
    appearance: none;
    margin: 0;
    width: 14px;
    height: 14px;
    border: ${`2px solid ${theme.colors.neutral50}`};
    border-radius: ${theme.radius.small};
    transition: all 0.1s ease-in-out;

    &:checked {
      border-color: ${theme.colors.primary};
      background: ${theme.colors.primary};
    }

    &:checked::after {
      content: '✔';
      position: absolute;
      left: 8%;
      color: ${theme.colors.neutral5};
      top: -20%;
      background-image: none;
      transform: scale(0.85);
    }

    &:focus::after {
      outline: none;
      border-color: ${theme.colors.primary};
    }

    &:disabled {
      border-color: ${({ checkedValue }) =>
        checkedValue ? theme.colors.primary : theme.colors.neutral50};
      background: ${({ checkedValue }) =>
        checkedValue ? theme.colors.primary : theme.colors.neutral5};
      cursor: no-drop;
    }

    &:disabled::after {
      cursor: no-drop;
    }
  }
`;

export const ChipsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

export const StyledNoDataWrapper = styled.div`
  position: sticky;
  left: 0;
  margin: 16px 0 32px 0;
`;

export const StyledNoDataWithHeaderWrapper = styled.div`
  position: sticky;
  top: 50%;
  left: 50%;
  min-height: 30vh;
  transform: translate(-10%, 40%);
  margin: 16px 0 32px 0;
`;

export const TooltipWrapper = styled.div`
  .tooltipWrapper {
    min-width: max-content;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tooltipTextWrapper {
    margin-left: 0;
  }

  .tooltipTitleSpacing {
    padding-bottom: 4px;
  }

  .toolltipContentSpacing {
    display: none;
  }

  .tooltipTitle {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 150%;
  }
  .tooltipText {
    font-size: 1rem;
    font-weight: 400;
    line-height: 150%;
  }
`;
