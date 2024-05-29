/* eslint-disable no-shadow */
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

const StepperContainer = styled.div`
  ${({ variant }) => {
    if (variant === 'vertical') {
      return css`
        display: flex;
        padding: ${({ padding }) =>
          (padding && padding) ||
          `${theme.spacings.spacing00} ${theme.spacings.spacing06}`};
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
        gap: 10px; // broken styling
      `;
    }
    return css`
      display: flex;
      justify-content: space-between;
    `;
  }};

  ${({ theme }) => theme.responsive.mobile`
    margin-y: auto
  `};
`;

// horizontal stepper
const FlowStepper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 20%;
  width: 100%;
`;

const StepperState = styled.div`
  display: flex;
  padding: ${theme.spacings.spacing00};
  align-items: center;
  gap: 4px;
  align-self: stretch;
  cursor: ${({ isClickable, isDisableClickStep }) => {
    let cursor = 'auto';

    if (isClickable) {
      cursor = 'pointer';
    } else if (isDisableClickStep) {
      cursor = 'not-allowed';
    }

    return cursor;
  }};
`;

const StepperDescBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  max-width: 90%;
  cursor: ${({ isClickable, isDisableClickStep }) => {
    let cursor = 'auto';

    if (isClickable) {
      cursor = 'pointer';
    } else if (isDisableClickStep) {
      cursor = 'not-allowed';
    }

    return cursor;
  }};
`;

// vertical stepper
const VerticalFlowStepper = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacings.spacing04,
  alignSelf: 'stretch',
});

const VerticalIconStepper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px; // broken styling
`;

const VerticalApproverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;

const VerticalDescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: ${theme.spacings.spacing01};
  align-self: stretch;
`;

export {
  StepperContainer,
  FlowStepper,
  StepperState,
  StepperDescBox,
  VerticalFlowStepper,
  VerticalIconStepper,
  VerticalApproverWrapper,
  VerticalDescWrapper,
};
