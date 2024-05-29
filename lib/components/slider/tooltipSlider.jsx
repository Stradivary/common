/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import raf from 'rc-util/lib/raf';
import React, { useEffect, useRef } from 'react';

const TooltipSlider = (props) => {
  const { value, children, visible, tipFormatter, ...rest } = props;
  const tooltipRef = useRef(TooltipRef);
  const rafRef = useRef({});

  const cancelKeepAlign = () => {
    raf.cancel(rafRef.current);
  };

  const keepAlign = () => {
    rafRef.current = raf(() => {
      tooltipRef.current?.forceAlign();
    });
  };

  useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [value, visible]);
  return (
    <Tooltip
      placement="top"
      overlay={tipFormatter(value)}
      overlayInnerStyle={{ minHeight: 'auto' }}
      ref={tooltipRef}
      visible={visible}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};
TooltipSlider.defaultProps = {
  tipFormatter: (val) => `${val}`,
  value: null,
  children: null,
  visible: false,
};
TooltipSlider.propTypes = {
  tipFormatter: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
  visible: PropTypes.bool,
};
export default TooltipSlider;
