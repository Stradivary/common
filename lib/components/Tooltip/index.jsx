import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ContentSpacing,
  Divider,
  TextWrapper,
  TitleSpacing,
  TooltipContainer,
  TooltipWrapper,
} from './styled';
import { Typography } from '../Typography';
import { Icon } from '../Icon';

export const Tooltip = ({
  withIcon,
  title,
  text,
  children,
  placement,
  position,
  width,
  customElements,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="tooltipContainer"
    >
      {children}
      {isVisible && (
        <TooltipWrapper
          placement={placement}
          position={position}
          width={width}
          className="tooltipWrapper"
        >
          <Divider hidden={!!customElements}>
            {withIcon && <Icon iconName="InfoOutlinedWhite" size="14px" />}
            <TextWrapper className="tooltipTextWrapper">
              {title && (
                <>
                  <Typography
                    size="1.3rem"
                    weight="bold"
                    className="tooltipTitle"
                    lineHeight="150%"
                  >
                    {title}
                  </Typography>
                  <TitleSpacing className="tooltipTitleSpacing" />
                </>
              )}
              <ContentSpacing className="toolltipContentSpacing" />
              <Typography
                size="1.2rem"
                className="tooltipText"
                lineHeight="150%"
              >
                {text}
              </Typography>
            </TextWrapper>
          </Divider>
          {customElements}
        </TooltipWrapper>
      )}
    </TooltipContainer>
  );
};

Tooltip.defaultProps = {
  text: 'Tooltip Description',
  title: '',
  withIcon: true,
  placement: 'bottom',
  position: {},
  width: '',
  customElements: null,
};

Tooltip.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  title: PropTypes.string,
  withIcon: PropTypes.bool,
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(['bottom', 'left', 'right', 'upper']),
  position: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
    transform: PropTypes.string,
  }),
  width: PropTypes.string,
  customElements: PropTypes.node,
};
