import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import {
  AccordionContent,
  AccordionHeader,
  AccordionWrapper,
  WrapperIcon,
  AccordionInnerContent,
} from './style';

export const Accordion = forwardRef((props, ref) => {
  const [contentHeight, setContentHeight] = useState(0);
  const {
    title,
    children,
    variant,
    visible,
    visibleIcon,
    onChange,
    iconPosition,
    borderBottom,
    id,
    borderSide,
    description,
    titleColor,
    titleHoverColor,
    titleColorActive,
    titleSize,
    borderTop,
    className,
    alwaysOpenOnDesktop,
    titleWeight,
    innerPadding,
    headerBackgroundColor,
    overflowVisibleWhenOpened,
  } = props;

  const handleSetHeight = () => {
    const innerContent = document.getElementById(`${id}-content`);
    if (innerContent) {
      const innerContentHeight = innerContent.clientHeight;
      setContentHeight(innerContentHeight);
    }
  };

  const handleOnchange = () => {
    const isMobile = window.innerWidth <= 1025;
    if (!alwaysOpenOnDesktop || isMobile) {
      onChange(id);
    }
  };

  useEffect(() => {
    handleSetHeight();
    window.addEventListener('resize', handleSetHeight);
    return () => {
      window.removeEventListener('resize', handleSetHeight);
    };
  }, [onChange]);

  useImperativeHandle(ref, () => ({
    invokeRecalculate() {
      handleSetHeight();
    },
  }));

  return (
    <AccordionWrapper
      borderTop={borderTop}
      borderBottom={borderBottom}
      borderSide={borderSide}
      variant={variant}
      className={`accordion ${className}`}
    >
      <AccordionHeader
        className="accordionHeader"
        variant={variant}
        onClick={handleOnchange}
        alwaysOpenOnDesktop={alwaysOpenOnDesktop}
        id={id}
        headerBackgroundColor={headerBackgroundColor}
      >
        <Typography
          size={titleSize || '1.4rem'}
          lineHeight="150%"
          color={visible ? titleColorActive : titleColor}
          weight={titleWeight}
          variant="div"
          className="accordionHeaderTitle"
          textDecoration={variant === 'custom' ? 'underline' : null}
          hoverColor={titleHoverColor}
        >
          {title}
        </Typography>
        {visibleIcon && (
          <WrapperIcon
            className="accordionHeaderToggleIcon"
            alwaysOpenOnDesktop={alwaysOpenOnDesktop}
            visible={visible}
            iconPosition={iconPosition}
          >
            <Icon
              iconName="ChevronDown"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            />
          </WrapperIcon>
        )}
        {description && (
          <Typography
            size="1.4rem"
            lineHeight="150%"
            margin="0.4rem 0 0 0"
            color="neutral70"
            className="accordionHeaderDescription"
          >
            {description}
          </Typography>
        )}
      </AccordionHeader>
      <AccordionContent
        className="accordionContent"
        visible={visible}
        alwaysOpenOnDesktop={alwaysOpenOnDesktop}
        contentHeight={contentHeight}
        id={`${id}-content-wrapper`}
        overflowVisibleWhenOpened={overflowVisibleWhenOpened}
      >
        <AccordionInnerContent
          className="accordionInnerContent"
          variant={variant}
          id={`${id}-content`}
          innerPadding={innerPadding}
        >
          {children}
        </AccordionInnerContent>
      </AccordionContent>
    </AccordionWrapper>
  );
});
Accordion.defaultProps = {
  title: 'title',
  variant: 'main',
  visible: false,
  visibleIcon: true,
  onChange: () => {},
  iconPosition: 'right',
  borderBottom: false,
  borderSide: false,
  borderTop: true,
  description: null,
  titleColor: 'neutral80',
  titleHoverColor: 'primary',
  titleColorActive: 'primary',
  titleSize: '1.4rem',
  className: '',
  alwaysOpenOnDesktop: false,
  titleWeight: 400,
  innerPadding: '',
  headerBackgroundColor: '',
  overflowVisibleWhenOpened: false,
};
Accordion.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['main', 'filled', 'custom']),
  visible: PropTypes.bool,
  visibleIcon: PropTypes.bool,
  onChange: PropTypes.func,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  borderBottom: PropTypes.bool,
  borderTop: PropTypes.bool,
  id: PropTypes.string.isRequired,
  borderSide: PropTypes.bool,
  description: PropTypes.string,
  titleColor: PropTypes.string,
  titleHoverColor: PropTypes.string,
  titleColorActive: PropTypes.string,
  titleSize: PropTypes.string,
  className: PropTypes.string,
  alwaysOpenOnDesktop: PropTypes.bool,
  titleWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  innerPadding: PropTypes.string,
  headerBackgroundColor: PropTypes.string,
  overflowVisibleWhenOpened: PropTypes.bool,
};
