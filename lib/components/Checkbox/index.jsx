/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import {
  CheckboxItem,
  CheckboxSubItem,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
} from './style';
import { Typography } from '../Typography';

const propTypes = {
  groupName: PropTypes.string,
  className: PropTypes.string,
  option: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  register: PropTypes.func,
  validation: PropTypes.shape({}),
  size: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  withLabel: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'grid']),
  gridCol: PropTypes.number,
  withCheckAll: PropTypes.bool,
  handleChange: PropTypes.func,
  checkedValue: PropTypes.bool,
};
const defaultProps = {
  groupName: '',
  className: '',
  size: '14px',
  color: '',
  disabled: false,
  withLabel: true,
  validation: {},
  type: 'default',
  gridCol: 2,
  withCheckAll: false,
  handleChange: () => {},
  checkedValue: null,
  register: null,
};

const generateSubCheckboxes = ({ subItems, checked, ...props }) => {
  const { groupName, disabled, withLabel, size, color } = props;
  const isCheckedAll = checked === true ? true : null;

  return subItems.map((data, idx) => (
    <CheckboxSubItem key={`key_${String(idx)}_${data.id}`}>
      <CheckboxInput
        type="checkbox"
        name={groupName}
        id={data.id}
        checked={isCheckedAll}
        value={data.value}
        disabled={disabled}
      />
      <CheckboxLabel htmlFor={data.id} disabled={disabled}>
        <Typography color={color} size={size}>
          {withLabel && data.value}
        </Typography>
      </CheckboxLabel>
    </CheckboxSubItem>
  ));
};

export const Checkbox = (props) => {
  const {
    groupName,
    className,
    option,
    register,
    validation,
    disabled,
    withLabel,
    size,
    type,
    gridCol,
    color,
    withCheckAll,
    handleChange,
    checkedValue,
  } = props;
  const [indeterminate, setIndeterminate] = useState(false);
  const [checked, setChecked] = useState(false);
  const checkboxRef = useRef([]);
  const checkboxAllRef = useRef(null);
  const hookForm = register && groupName && register(groupName, validation);

  useEffect(() => {
    if (withCheckAll) {
      const isAllCheckboxChecked = checkboxRef.current.every(
        (item) => item?.checked
      );

      // Set checkboxAll to checked after component is mounted
      if (isAllCheckboxChecked) checkboxAllRef.current.checked = true;
    }
  }, []);

  const handleOnChange = (e) => {
    if (register) {
      if (!isEmpty(checkboxRef.current)) {
        const isAllCheckboxChecked = checkboxRef.current.every(
          (item) => item?.checked
        );
        const isAllCheckboxNotChecked = checkboxRef.current.every(
          (item) => !item?.checked
        );

        if (checkboxAllRef.current) {
          if (isAllCheckboxChecked) checkboxAllRef.current.checked = true;
          if (isAllCheckboxNotChecked) checkboxAllRef.current.checked = false;
        }
      }
      return hookForm.onChange(e);
    }
    return handleChange(e);
  };

  const handleChangeAllChecked = () => {
    if (register) {
      checkboxRef.current.forEach((item) => {
        // Update the checked state of each checkbox
        if (item) {
          item.checked = checkboxAllRef.current.checked;

          // Create a synthetic event to mimic a checkbox change event
          const syntheticEvent = {
            target: item,
            currentTarget: item,
          };

          // Trigger the handleChange function for each checkbox
          handleOnChange(syntheticEvent);
        }
      });
    }
  };

  const filterCheckbox = () => (
    <>
      <CheckboxItem key={`key_all_${groupName}`} withBorder>
        <CheckboxInput
          type="checkbox"
          name={groupName}
          id="all"
          disabled={disabled}
          value="Semua"
          onChange={handleChangeAllChecked}
          ref={checkboxAllRef}
          indeterminate
        />
        <CheckboxLabel htmlFor="all" disabled={disabled}>
          <Typography color={color} size={size}>
            Pilih Semua
          </Typography>
        </CheckboxLabel>
      </CheckboxItem>

      {option.map((row, index) => {
        return (
          <CheckboxItem key={`key_${String(index)}_${row.id}`} withBorder>
            <CheckboxInput
              type="checkbox"
              name={groupName}
              id={row.id}
              value={row.value}
              onChange={(e) => {
                setChecked(!checked);
                handleOnChange(e);
              }}
              disabled={disabled}
              ref={(e) => {
                hookForm?.ref(e);
                checkboxRef.current[index] = e;
              }}
            />
            <CheckboxLabel htmlFor={row.id} disabled={disabled}>
              <Typography color={color} size={size}>
                {withLabel && row.value}
              </Typography>
            </CheckboxLabel>
          </CheckboxItem>
        );
      })}
    </>
  );

  const generalCheckbox = () =>
    option.map((row, index) => {
      const subItems = row?.children;
      return subItems?.length > 0 ? (
        <>
          <CheckboxItem key={`key_${String(index)}_${row.id}`}>
            <CheckboxInput
              type="checkbox"
              name={groupName}
              id={row.id}
              value={row.value}
              onChange={(e) => {
                setChecked(!checked);
                setIndeterminate(!indeterminate);
                handleOnChange(e);
              }}
              checked={
                register ? checkedValue || undefined : checkedValue || false // Set the value to undefined for unchecked if register exists; otherwise, set it to false
              }
              ref={hookForm?.ref}
              disabled={disabled}
              indeterminate={indeterminate}
            />
            <CheckboxLabel htmlFor={row.id} disabled={disabled}>
              <Typography color={color} size={size}>
                {withLabel && row.value}
              </Typography>
            </CheckboxLabel>
          </CheckboxItem>
          {generateSubCheckboxes({ subItems, checked, ...props })}
        </>
      ) : (
        <CheckboxItem key={`key_${String(index)}_${row.id}`}>
          <CheckboxInput
            type="checkbox"
            name={groupName}
            id={row.id}
            value={row.value}
            onChange={(e) => {
              setChecked(!checked);
              handleOnChange(e);
            }}
            checked={
              register ? checkedValue || undefined : checkedValue || false // Set the value to undefined for unchecked if register exists; otherwise, set it to false
            }
            disabled={disabled}
            ref={hookForm?.ref}
          />
          <CheckboxLabel htmlFor={row.id} disabled={disabled}>
            <Typography color={color} size={size}>
              {withLabel && row.value}
            </Typography>
          </CheckboxLabel>
        </CheckboxItem>
      );
    });

  return (
    <CheckboxContainer type={type} gridCol={gridCol} className={className}>
      {withCheckAll ? filterCheckbox() : generalCheckbox()}
    </CheckboxContainer>
  );
};

Checkbox.defaultProps = defaultProps;
Checkbox.propTypes = propTypes;

export default Checkbox;
