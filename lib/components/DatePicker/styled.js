import styled from 'styled-components';
import { Calendar } from 'react-multi-date-picker';
import { theme } from '../../styles/theme';

export const StyledDatePickerContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledDatePicker = styled(Calendar)`
  :focus-visible {
    outline: none;
  }

  &.rmdp-wrapper {
    background-color: ${theme.colors.neutral5};
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    position: absolute;
    /* width: 100%; // width size following textfield */
    min-width: 320px;

    ${({ placement }) => {
      const placementWords = placement.split(' ');

      if (placementWords.length > 0) {
        const vertical = placementWords[0];
        const horizontal = placementWords[1];

        if (vertical === 'top') {
          if (horizontal === 'right') {
            return `
          bottom: calc(100% - 24px);
          right: 0;
        `;
          }
          return `
        bottom: calc(100% - 24px);
      `;
        }

        if (vertical === 'bottom') {
          if (horizontal === 'right') {
            return `
          top: calc(100% + 8px);
          right: 0;
        `;
          }
          return `
        top: calc(100% + 8px);
      `;
        }
      }

      return `
    top: calc(100% + 8px);
  `;
    }}

    .rmdp-top-class {
      /* display: unset !important; // width size following textfield */

      .rmdp-calendar {
        padding: 12px 8px;
        display: flex;
        flex-direction: column;

        .rmdp-header {
          padding: 0;
          margin: 0;

          & > div {
            display: flex;
            justify-content: space-between;

            .prevNextButtonWrapper {
              display: flex;
              gap: calc(
                ${theme.spacings.spacing03} + ${theme.spacings.spacing01}
              );
              .rmdp-arrow-container {
                width: 16px;
                height: 16px;
                align-items: center;
                justify-content: center;
                border-radius: 0;
                margin: 0;

                &:hover {
                  background: transparent;
                  box-shadow: none;
                }
              }
            }

            .rmdp-header-values {
              width: 100%;
              font-size: 1.4rem;
              font-weight: 600;
              line-height: 21px;
              color: ${theme.colors.blue80};
              display: flex;
              align-items: center;
              gap: ${theme.spacings.spacing01};

              &:nth-child(2):not(:last-child) {
                margin-right: 36px;
                justify-content: flex-end;
              }

              & > span {
                padding: 0;
              }
              & > span:first-child {
                display: ${({ isHideMonthText }) =>
                  isHideMonthText ? 'none' : 'block'};
              }
            }
            .rmdp-arrow-container.rmdp-left,
            .rmdp-arrow-container.rmdp-right {
              .rmdp-arrow {
                border: solid ${theme.colors.blue80};
                border-width: 0 2px 2px 0;
                margin-top: 3px;
              }
            }
            .rmdp-arrow-container.rmdp-left {
              margin: 0 5px 0 0;
            }
            .rmdp-arrow-container.rmdp-right {
              margin: 0 0 0 5px;
            }
          }
        }

        & > div[style] {
          margin: 16px 16px 0;

          .rmdp-day-picker {
            /* display: unset !important; // width size following textfield */
            padding: 0;
            gap: ${theme.spacings.spacing06};

            & > div {
              .rmdp-week {
                .rmdp-week-day {
                  font-size: 1.2rem;
                  font-weight: 400;
                  line-height: 18px;
                  text-align: center;
                  color: ${theme.colors.blue80};
                  width: 40px;
                  height: 20px;
                }
                .rmdp-day {
                  color: ${theme.colors.blue80};
                  width: 40px;
                  height: 40px;
                  & > span {
                    border-radius: 8px;
                    font-size: 1.2rem;
                    font-weight: 500;
                    line-height: 18px;
                    text-align: center;
                    color: ${theme.colors.blue80};

                    &:hover {
                      background-color: ${theme.colors.blue5};
                    }
                    &:active {
                      box-shadow: inset 0 0 0 1px ${theme.colors.primary};
                    }
                  }
                }
                .rmdp-day.rmdp-day-hidden span:hover {
                  background-color: transparent;
                }
                .rmdp-day.rmdp-day-hidden span:active {
                  box-shadow: none;
                }
                .rmdp-day.rmdp-deactive span.sd {
                  color: ${theme.colors.neutral50};
                }
                .rmdp-day.rmdp-today span {
                  background-color: inherit;
                  border-radius: 8px;
                  color: ${theme.colors.blue80};
                  box-shadow: inset 0 0 0 1px ${theme.colors.darkRed50};
                }
                .rmdp-day.rmdp-today span:hover {
                  background-color: ${theme.colors.darkRed5};
                  box-shadow: none;
                }
                .rmdp-day.rmdp-today span:active {
                  background-color: ${theme.colors.darkRed5};
                  box-shadow: inset 0 0 0 1px ${theme.colors.secondary};
                }

                .rmdp-day.rmdp-today.rmdp-selected span {
                  box-shadow: none;
                  background-color: ${theme.colors.secondary};
                  color: ${theme.colors.neutral5};
                }
                .rmdp-day.rmdp-selected span {
                  box-shadow: none;
                  background-color: ${theme.colors.primary};
                  color: ${theme.colors.neutral5};
                }
                .rmdp-day.rmdp-disabled.rmdp-deactive span {
                  color: ${theme.colors.neutral50};

                  &:hover {
                    background-color: transparent;
                  }
                  &:active {
                    box-shadow: none;
                  }
                }
                .rmdp-day.rmdp-disabled span {
                  color: ${theme.colors.neutral50};

                  &:hover {
                    background-color: transparent;
                  }
                  &:active {
                    box-shadow: none;
                  }
                }
              }
            }
          }
          .rmdp-month-picker {
            bottom: 2px;
            left: -16px;
            position: absolute;
            right: -16px;
            top: 0;
            height: ${({ isTimePicker }) =>
              isTimePicker ? 'calc(100% + 90px)' : '100%'};
            z-index: 1000;

            & > div {
              .rmdp-ym {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: ${({ isTwoCalendar }) =>
                  isTwoCalendar ? '0 15%' : '0'};

                .rmdp-day {
                  margin: 0;
                  flex: none;
                  width: 84px;
                  padding: 6px 6px;
                  span {
                    border-radius: 8px;
                    font-weight: 500;

                    &:hover {
                      color: ${theme.colors.blue80};
                      font-weight: 500;
                      background-color: ${theme.colors.blue5};
                      padding: 6px 6px;
                    }
                  }
                }
                .rmdp-day.selected {
                  span {
                    background-color: ${theme.colors.primary};
                    border-radius: 8px;
                    font-weight: 500;
                    box-shadow: none;
                  }
                  span:not(.highlight) {
                    background-color: ${theme.colors.primary};
                    color: ${theme.colors.neutral5};
                    font-weight: 500;
                    box-shadow: none;
                  }
                }
                .rmdp-day.rmdp-today {
                  span {
                    background-color: transparent;
                    box-shadow: none;
                    color: ${theme.colors.secondary};
                    font-weight: 500;
                  }
                }
                .rmdp-day.rmdp-disabled span {
                  background-color: ${theme.colors.neutral20};
                  color: ${theme.colors.neutral50};

                  &:hover {
                    color: ${theme.colors.neutral50};
                  }
                }
              }
            }
          }
          .rmdp-year-picker {
            bottom: 2px;
            left: -16px;
            position: absolute;
            right: -16px;
            top: -4px;
            height: ${({ isTimePicker }) =>
              isTimePicker ? 'calc(100% + 90px)' : '100%'};
            z-index: 1000;

            .rmdp-ym {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: ${({ isTwoCalendar }) => (isTwoCalendar ? '0 15%' : '0')};

              .rmdp-day {
                margin: 0;
                flex: none;
                width: 84px;
                padding: 6px 6px;
                span {
                  border-radius: 8px;
                  font-weight: 500;
                  padding: 12px 26px 12px 24px;
                  position: unset;

                  &:hover {
                    color: ${theme.colors.blue80};
                    font-weight: 500;
                    padding: 12px 26px 12px 24px;
                    background-color: ${theme.colors.blue5};
                  }
                }
              }
              .rmdp-day.selected {
                span {
                  background-color: ${theme.colors.primary};
                  border-radius: 8px;
                  font-weight: 500;
                  box-shadow: none;
                }
                span:not(.highlight) {
                  background-color: ${theme.colors.primary};
                  color: ${theme.colors.neutral5};
                  font-weight: 500;
                  box-shadow: none;
                }
              }
              .rmdp-day.rmdp-today {
                span {
                  background-color: transparent;
                  box-shadow: none;
                  color: ${theme.colors.secondary};
                  font-weight: 500;
                }
              }
              .rmdp-day.rmdp-disabled span {
                background-color: ${theme.colors.neutral20};
                color: ${theme.colors.neutral50};

                &:hover {
                  color: ${theme.colors.neutral50};
                }
              }
            }
          }

          ${({ onlyMonthPicker, onlyYearPicker }) => {
            if (onlyMonthPicker || onlyYearPicker) {
              return `
                min-height: 292px;          
                min-width: 280px;

                .rmdp-year-picker,
                .rmdp-month-picker {

                  .rmdp-ym {
                    min-width: 302px;
                  }

                  .rmdp-day.rmdp-range {
                    background-color: ${theme.colors.primary};
                  }
                  
                  .rmdp-day.rmdp-today.rmdp-range {
                    background-color: ${theme.colors.primary};

                    &:hover {
                      background-color: ${theme.colors.primary};
                    }
                  }
                  
                  .rmdp-day.rmdp-range-hover {
                    background-color: ${theme.colors.primary};
                  }

                  .rmdp-day {
                    span {
                      font-weight: 500;

                      &:hover {
                        color: ${theme.colors.neutral5} !important;
                        background-color: ${theme.colors.primary} !important;
                      }
                    }
                  }
                }
                .rmdp-year-picker {
                  .rmdp-day {
                    display: flex;
                    align-items: center;

                    span.sd {
                      height: 22px;
                    }
                  }
                }
              `;
            }
            return '';
          }}
        }
      }
    }
    .rmdp-day.rmdp-today.rmdp-range {
      box-shadow: none;
      background-color: ${theme.colors.blue5};
      border-radius: 0;
    }

    .rmdp-day.rmdp-range {
      background-color: ${theme.colors.blue5};
      box-shadow: none;
      z-index: 100;
    }

    .rmdp-day.rmdp-range.start:not(.force) {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
    .rmdp-day.rmdp-range.start:not(.force) {
      border-bottom-left-radius: 8px;
      border-top-left-radius: 8px;
    }

    .rmdp-day.rmdp-range.end:not(.force) {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
    .rmdp-day.rmdp-range.end:not(.force) {
      border-bottom-right-radius: 8px;
      border-top-right-radius: 8px;
    }
    .rmdp-day.rmdp-range.start.end:not(.force) {
      border-bottom-left-radius: 8px;
      border-top-left-radius: 8px;
    }
    .rmdp-day.rmdp-range-hover {
      background-color: ${theme.colors.blue5};
    }
    .rmdp-day.rmdp-range-hover.end:hover {
      border-bottom-right-radius: 8px;
      border-top-right-radius: 8px;
    }

    .rmdp-top-class.rmdp-border-bottom {
      border-bottom: none;
      margin-top: ${theme.spacings.spacing02};
    }

    .rmdp-arrow-container {
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      height: 16px;
      justify-content: center;
      margin: 0;
      padding: 0;
      width: 16px;

      &:disabled {
        .rmdp-arrow {
          border: solid ${theme.colors.neutral50};
          border-width: 0 2px 2px 0;
        }
      }

      .rmdp-arrow {
        border: solid ${theme.colors.blue80};
        border-width: 0 2px 2px 0;
        margin-top: 3px;
      }
    }

    .rmdp-arrow-container:hover {
      background: transparent;
      box-shadow: none;
    }

    .rmdp-day.rmdp-selected span:not(.highlight) {
      background-color: ${theme.colors.primary};
      box-shadow: none;
      color: ${theme.colors.neutral5};
    }

    .rmdp-week {
      margin: 4px 0;
    }

    span.sd {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    &.rmdp-border {
      border: 1px solid ${theme.colors.neutral50};
    }

    & > div .rmdp-time-picker {
      padding: 4px 0 12px 0;
      justify-content: center;
      gap: ${theme.spacings.spacing04};
      color: ${theme.colors.blue80};
      font-size: 1.4rem;

      & > :nth-child(1) {
        order: 2;
      }
      & > :nth-child(2) {
        order: 3;
      }
      & > :nth-child(3) {
        order: 4;
      }
      & > :nth-child(4) {
        order: 1;
      }

      .time-text {
        display: flex;
        justify-content: center;
        font-weight: 600;
        line-height: 21px;
        align-items: center;
        text-align: center;
        margin-right: 12px;
      }

      & > div {
        flex: none;

        & > input {
          line-height: 20px;
          letter-spacing: -2%;
          box-shadow: inset 0 0 0 1px ${theme.colors.neutral50};
          border-radius: 8px;
          width: 35px;
          height: 40px;
          padding: 0;

          &:hover {
            box-shadow: none;
            background-color: ${theme.colors.blue5};
          }
          &:focus-visible {
            outline: 1px solid ${theme.colors.primary};
          }

          &[disabled] {
            background-color: ${theme.colors.neutral20};
            color: ${theme.colors.neutral50};
          }
        }
      }

      .dvdr {
        line-height: 20px;
        margin-top: 0;
        font-weight: 600;
      }
    }

    .horizontal-divider {
      width: 100%;
      height: 1px;
      background-color: ${theme.colors.neutral30};
      margin: 16px 0 0 0;
    }

    .horizontal-divider-wrapper {
      display: flex;
      gap: calc(${theme.spacings.spacing07} + ${theme.spacings.spacing02});
      margin: 0;
    }
  }
`;
