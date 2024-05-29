import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Button } from '../Button';
import {
  StepperContainer,
  FlowStepper,
  StepperState,
  StepperDescBox,
  VerticalFlowStepper,
  VerticalIconStepper,
  VerticalApproverWrapper,
  VerticalDescWrapper,
} from './style';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { Divider } from '../Divider';
import { screenSizes } from '../../styles/breakpoints';

const propTypes = {
  variant: PropTypes.oneOf(['horizontal', 'vertical']),
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      currentStep: PropTypes.oneOf([
        'completed',
        'inProgress',
        'rejected',
        'default',
      ]).isRequired,
      stepDesc: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      date: PropTypes.string,
      dueDate: PropTypes.string,
      realizationDate: PropTypes.string,
    })
  ).isRequired,
  dueDate: PropTypes.bool,
  realizationDate: PropTypes.bool,
  padding: PropTypes.string,
};
const defaultProps = {
  variant: 'horizontal',
  dueDate: false,
  realizationDate: false,
  padding: '',
};

export const Stepper = (props) => {
  const { variant, steps, dueDate, realizationDate, padding } = props;
  const totalSteps = steps?.length;
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth <= screenSizes.mb[1]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= screenSizes.mb[1]);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const STEPPER_ICON = {
    horizontal: {
      default: 'NotStarted',
      inProgress: 'InProgress',
      completed: 'CompletedGreen',
    },
    vertical: {
      notStarted: 'VerticalStepperNotStarted',
      completed: 'VerticalStepperSuccessGreen',
      inProgress: 'VerticalStepperInProgressBlue',
      rejected: 'VerticalStepperRejectedRed',
    },
  };
  const STEPPER_STATE = {
    default: 'Not Started',
    inProgress: 'In Progress',
    completed: 'Completed',
  };
  const STEPPER_LINE = {
    horizontal: {
      default: 'solid',
      inProgress: 'dashed',
      completed: 'solid',
    },
    vertical: {
      default: 'solid',
      inProgress: 'solid',
      completed: 'solid',
    },
  };

  const mobileView = () => {
    const firstStep = steps[0];
    const icon = STEPPER_ICON[variant][firstStep.currentStep];
    const stepperColor = 'neutral50';
    const stepperState = STEPPER_STATE[firstStep.currentStep];
    const linePattern = STEPPER_LINE[variant][firstStep.currentStep];

    return (
      <FlowStepper>
        <StepperState>
          <Icon iconName={icon} color={stepperColor} />
          <Typography
            size="1rem"
            weight={500}
            capitalize
            color={stepperColor}
            letterSpacing="0.2px"
            lineHeight="150%"
            minWidth="max-content"
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            {stepperState}
          </Typography>
          <Divider color={stepperColor} linePattern={linePattern} width="50%" />
          <Typography
            size="1rem"
            weight={500}
            capitalize
            color="blue60"
            letterSpacing="0.2px"
            lineHeight="150%"
            textDecoration="underline"
            minWidth="max-content"
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            Lihat Semua Status
          </Typography>
        </StepperState>
        <StepperDescBox>
          <Typography
            size="1.2rem"
            color="neutral80"
            lineHeight="150%"
            weight={600}
            capitalize
            style={{
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {`1. ${firstStep.stepDesc}`}
          </Typography>
          {dueDate && (
            <Typography size="1rem" color="neutral60" lineHeight="150%">
              Due Date:{' '}
              {!isEmpty(firstStep.dueDate) &&
                moment(firstStep.dueDate).format('DD/MM/YYYY')}
            </Typography>
          )}
          {realizationDate && (
            <Typography size="1rem" color="neutral60" lineHeight="150%">
              Realization Date:{' '}
              {!isEmpty(firstStep.realizationDate) &&
                moment(firstStep.realizationDate).format('DD/MM/YYYY')}
            </Typography>
          )}
        </StepperDescBox>
      </FlowStepper>
    );
  };

  const desktopView = () => {
    return steps.map((step, idx) => {
      const endPoint = idx + 1 === totalSteps;
      const firstIndex = idx === 0;
      const lastIndex = idx === steps.length - 1;
      const stepperState = STEPPER_STATE[step.currentStep];
      const linePattern = STEPPER_LINE[variant][step.currentStep];
      const isClickable = !!step.handler;
      const isDisableClickStep = step.disabled;

      let icon = STEPPER_ICON[variant][step.currentStep];
      let stepperColor = 'neutral50';
      switch (step.currentStep) {
        case 'inProgress':
          stepperColor = 'primary';
          break;

        case 'completed':
          stepperColor = 'green';
          break;

        default:
          break;
      }

      if (endPoint && step.currentStep === 'completed') {
        stepperColor = 'secondary';
        icon = 'CompletedRed';
      }

      if (variant === 'vertical') {
        return (
          <VerticalFlowStepper key={step.id}>
            <VerticalIconStepper>
              {!firstIndex && (
                <Divider
                  variant="vertical"
                  color="neutral50"
                  linePattern={linePattern}
                  width="spacing05"
                />
              )}
              <Icon iconName={icon} />
              {!lastIndex && (
                <Divider
                  variant="vertical"
                  color="neutral50"
                  linePattern={linePattern}
                  width="spacing05"
                />
              )}
            </VerticalIconStepper>
            <VerticalApproverWrapper>
              <Typography
                size="1.2rem"
                color="neutral80"
                lineHeight="150%"
                weight={500}
                capitalize
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {step.title}
              </Typography>
              <Typography
                size="1.2rem"
                color="neutral70"
                lineHeight="150%"
                weight={400}
              >
                {step.subtitle}
              </Typography>
              {step?.label ? (
                <Button
                  onClick={step.link.handler}
                  color="blue60"
                  weight={400}
                  variant="link"
                >
                  <Typography size="1.2rem" weight={500}>
                    {step.link.label}
                  </Typography>
                </Button>
              ) : null}
            </VerticalApproverWrapper>
            <VerticalDescWrapper>
              <Typography
                size="1.2rem"
                color="neutral70"
                lineHeight="150%"
                weight={400}
              >
                {step.stepDesc}
              </Typography>
              <Typography
                size="0.8rem"
                color="neutral50"
                lineHeight="150%"
                weight={400}
              >
                {step.date
                  ? moment(step.date, 'YYYYMMDD HH:mm:ss').format(
                      'DD/MM/YYYY HH:mm:ss'
                    )
                  : '-'}
              </Typography>
            </VerticalDescWrapper>
          </VerticalFlowStepper>
        );
      }

      let cursor = 'auto';
      if (isClickable) {
        cursor = 'pointer';
      } else if (isDisableClickStep) {
        cursor = 'not-allowed';
      }

      return (
        <FlowStepper key={step.id}>
          <StepperState
            id={`step-state-${idx + 1}`}
            onClick={() =>
              isClickable && !isDisableClickStep ? step.handler(idx) : undefined
            }
            isClickable={isClickable}
            isDisableClickStep={isDisableClickStep}
          >
            <Icon
              iconName={icon}
              color={stepperColor}
              style={{
                cursor,
              }}
            />
            <Typography
              size="1rem"
              weight={500}
              capitalize
              color={stepperColor}
              letterSpacing="0.2px"
              lineHeight="150%"
              minWidth="max-content"
              style={{
                whiteSpace: 'nowrap',
              }}
            >
              {stepperState}
            </Typography>
            <Divider
              color={stepperColor}
              linePattern={linePattern}
              width="100%"
            />
          </StepperState>
          <StepperDescBox
            id={`step-desc-${idx + 1}`}
            onClick={() =>
              isClickable && !isDisableClickStep ? step.handler(idx) : undefined
            }
            isClickable={isClickable}
            isDisableClickStep={isDisableClickStep}
          >
            <Typography
              size="1.2rem"
              color="neutral80"
              lineHeight="150%"
              weight={600}
              capitalize
              style={{
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {`${idx + 1}. ${step.stepDesc}`}
            </Typography>
            {dueDate && (
              <Typography size="1rem" color="neutral60" lineHeight="150%">
                Due Date:{' '}
                {!isEmpty(step.dueDate) &&
                  moment(step.dueDate).format('DD/MM/YYYY')}
              </Typography>
            )}
            {realizationDate && (
              <Typography size="1rem" color="neutral60" lineHeight="150%">
                Realization Date:{' '}
                {!isEmpty(step.realizationDate) &&
                  moment(step.realizationDate).format('DD/MM/YYYY')}
              </Typography>
            )}
          </StepperDescBox>
        </FlowStepper>
      );
    });
  };

  return (
    <StepperContainer
      variant={variant}
      padding={padding}
      className="stepper-container"
    >
      {isMobileView ? mobileView() : desktopView()}
    </StepperContainer>
  );
};

Stepper.defaultProps = defaultProps;
Stepper.propTypes = propTypes;

export default Stepper;
