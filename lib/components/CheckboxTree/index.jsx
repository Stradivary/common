import React from 'react';
import PropTypes from 'prop-types';
import ReactCheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import { Wrapper } from './style';
import { Icon } from '../Icon';

export const CheckboxTree = (props) => {
  const { nodes, checked, expanded, onCheck, onExpand, disabled, id } = props;

  const iconsProps = {
    check: (
      <Icon
        iconName="CheckboxTreeChecked"
        color={disabled ? '#9BA0A5' : 'primary'}
        size="18"
        disabled={disabled}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      />
    ),
    uncheck: (
      <Icon
        iconName="CheckboxTreeUncheck"
        size="18"
        color="neutral40"
        disabled={disabled}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      />
    ),
    halfCheck: (
      <Icon
        size="18"
        iconName="CheckboxTreeIndeterminate"
        color={disabled ? '#9BA0A5' : 'primary'}
        disabled={disabled}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      />
    ),
    expandClose: (
      <Icon
        iconName="FilledArrowExpand"
        color="primary"
        size="16px"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      />
    ),
    expandOpen: (
      <Icon
        id="expand"
        iconName="FilledArrowExpand"
        color="primary"
        size="16px"
        style={{
          display: 'flex',
          alignItems: 'center',
          transform: 'scaleY(-1)',
        }}
      />
    ),
  };

  return (
    <Wrapper>
      <ReactCheckboxTree
        id={id}
        nodes={nodes}
        checked={checked}
        expanded={expanded}
        onCheck={onCheck}
        onExpand={onExpand}
        icons={iconsProps}
        disabled={disabled}
        expandOnClick
        onClick={() => {}} // enable expand item when click label
      />
    </Wrapper>
  );
};

CheckboxTree.defaultProps = {
  disabled: false,
};

CheckboxTree.propTypes = {
  id: PropTypes.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  checked: PropTypes.arrayOf(PropTypes.string).isRequired,
  expanded: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCheck: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
