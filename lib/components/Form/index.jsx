import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

export const Form = (props) => {
  const { onSubmit, children, disabled, isAsync, className } = props;
  const ref = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAsync) {
      setIsSubmitting(true);
    } else {
      onSubmit();
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      onSubmit().then(() => {
        setIsSubmitting(false);
      });
    }
  }, [isSubmitting]);

  useEffect(() => {
    const { current } = ref;
    current.addEventListener('submit', handleSubmit);
    return () => {
      current.removeEventListener('submit', handleSubmit);
    };
  }, []);

  const iterateOverChildren = (childrens) => {
    return React.Children.map(childrens, (child) => {
      if (!React.isValidElement(child)) return child;
      const forceDisable = isSubmitting || disabled;
      const defaultChildDisabled = get(child, 'props.disabled');
      return React.cloneElement(child, {
        ...child.props,
        disabled: defaultChildDisabled || forceDisable,
        children: iterateOverChildren(get(child, 'props.children')),
      });
    });
  };

  return (
    <form className={`${className} form`} ref={ref} style={{ width: '100%' }}>
      {iterateOverChildren(children)}
    </form>
  );
};
Form.defaultProps = {
  disabled: false,
  isAsync: true,
  onSubmit: () => {},
  className: '',
};
Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  isAsync: PropTypes.bool,
  className: PropTypes.string,
};
