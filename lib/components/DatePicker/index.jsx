/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { Controller } from 'react-hook-form';
import { Icon } from '../Icon';
import { TextField } from '../Textfield';
import { StyledDatePicker, StyledDatePickerContainer } from './styled';
import { theme } from '../../styles/theme';

/*
  !! Important:
  ! If you are using React Hook Form, ensure that you pass the 'control' props with control from useForm()
  ! No need to send props register, value, and onChange

  * See the example implementation of the DatePicker component in the file commons/__ fixtures __/DatePicker.jsx
 */

export const DatePicker = (props) => {
  const {
    id,
    control,
    disabled,
    disableTimePicker,
    formatDate,
    errors,
    label,
    mode,
    maxDate,
    minDate,
    name,
    numberOfCalendar,
    onChange,
    timePicker,
    value,
    placement,
    placeholder,
    validation,
    onlyMonthPicker,
    onlyYearPicker,
  } = props;

  const containerRef = useRef(null);
  const datePickerRef = useRef(null);
  const onChangeHookFormRef = useRef(null);
  const valueHookFormRef = useRef(null);

  const [defaultProps, setDefaultProps] = useState({});
  const [formattedDate, setFormattedDate] = useState('DD/MM/YYYY');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isHideMonthText, setIsHideMonthText] = useState(false);
  const [showBottomTimeText, setShowBottomTimeText] = useState(null);
  const [showChevronDownIcon, setShowChevronDownIcon] = useState(null);
  const [showHorizontalDivider, setShowHorizontalDivider] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    valueDatePicker: null,
    valueTextfield: '',
    valueTimePicker: {
      hour: '',
      minute: '',
    },
  });

  const handleChangeEmptyValue = () => {
    setSelectedDate({
      valueDatePicker: '',
      valueTextfield: '',
      valueTimePicker: {
        hour: '',
        minute: '',
      },
    });

    onChange('');

    if (onChangeHookFormRef.current) {
      onChangeHookFormRef.current('');
    }
  };

  const handleChangeRangeMode = (newValue) => {
    const startDate = newValue[0] ? newValue[0]?.format(formatDate) : '';
    const endDate = newValue[1] ? newValue[1]?.format(formatDate) : '';

    const formattedValue = `${startDate} - ${endDate}`;

    setSelectedDate({
      valueDatePicker: newValue,
      valueTextfield: formattedValue,
      valueTimePicker: {
        hour: newValue[0]?.hour,
        minute: newValue[0]?.minute,
      },
    });

    onChange(formattedValue);

    if (onChangeHookFormRef.current) {
      onChangeHookFormRef.current(formattedValue);
    }

    if (!timePicker && endDate) {
      setIsCalendarOpen(false);
    }
  };

  const handleChangeSingleMode = (newValue) => {
    const formattedValue = newValue[0]?.format(formatDate);

    if (formattedValue) {
      const isSameTime =
        (!selectedDate.valueTimePicker?.hour &&
          !selectedDate.valueTimePicker?.minute) ||
        (newValue[0]?.hour === selectedDate.valueTimePicker?.hour &&
          newValue[0]?.minute === selectedDate.valueTimePicker?.minute);

      if (timePicker && !isSameTime) {
        setSelectedDate({
          valueDatePicker: formattedValue,
          valueTextfield: formattedValue,
          valueTimePicker: {
            hour: newValue[0]?.hour,
            minute: newValue[0]?.minute,
          },
        });

        if (onChangeHookFormRef.current) {
          onChangeHookFormRef.current(formattedValue);
        }

        setIsCalendarOpen(true);
        return;
      }

      setSelectedDate({
        valueDatePicker: formattedValue,
        valueTextfield: formattedValue,
        valueTimePicker: {
          hour: newValue[0]?.hour,
          minute: newValue[0]?.minute,
        },
      });

      onChange(formattedValue);

      if (onChangeHookFormRef.current) {
        onChangeHookFormRef.current(formattedValue);
      }
      setIsCalendarOpen(false);
    }
  };

  const handleChange = (data) => {
    const {
      target: { value: newValue },
    } = data;

    if (!newValue) {
      handleChangeEmptyValue();
    } else if (mode === 'Range') {
      handleChangeRangeMode(newValue);
    } else {
      handleChangeSingleMode(newValue);
    }
  };

  const addIdToHeaderValues = (headerValuesElement, index) => {
    const monthId = `month-calendar-${index + 1}`;
    const yearId = `year-calendar-${index + 1}`;
    const spanElements = headerValuesElement.querySelectorAll('span');

    spanElements.forEach((spanElement, childIndex) => {
      if (childIndex === 0) {
        spanElement.id = monthId;
      } else if (childIndex === 2) {
        spanElement.id = yearId;
      }
    });
  };

  const handleShowHorizontalDivider = (
    rmdpHeaderElement,
    rmdpHeaderValuesElement
  ) => {
    if (rmdpHeaderValuesElement.length > 0) {
      setShowHorizontalDivider({
        element: rmdpHeaderElement,
        numsOfDivider: rmdpHeaderValuesElement.length === 1 ? 1 : 2,
      });
    }
  };

  const handleShowChevronDownIcon = (rmdpHeaderValuesElement) => {
    rmdpHeaderValuesElement.forEach((element) => {
      setShowChevronDownIcon((prevState) => ({
        elements: [...(prevState ? prevState.elements : []), element],
      }));
    });
  };

  const modifyHeaderDatePicker = (containerElement) => {
    const wrapperElement = containerElement.querySelector('.rmdp-calendar');
    const existingDivider = wrapperElement.querySelector('.horizontal-divider');
    const rmdpHeaderElement = wrapperElement.querySelector('.rmdp-header');

    if (!existingDivider && rmdpHeaderElement) {
      const rmdpHeaderValuesElement = wrapperElement.querySelectorAll(
        'div .rmdp-header-values'
      );

      rmdpHeaderValuesElement.forEach((headerValuesElement, index) => {
        addIdToHeaderValues(headerValuesElement, index);
      });

      handleShowHorizontalDivider(rmdpHeaderElement, rmdpHeaderValuesElement);
      handleShowChevronDownIcon(rmdpHeaderValuesElement);
    }
  };

  const modifyBottomDatePicker = (containerElement) => {
    const bottomTimePickerElement = containerElement.querySelector(
      '.rmdp-time-picker.bottom'
    );

    if (bottomTimePickerElement) {
      if (!bottomTimePickerElement.querySelector('.time-text')) {
        setShowBottomTimeText({
          element: bottomTimePickerElement,
        });
      }

      const inputHour =
        bottomTimePickerElement.querySelector('input[name="hour"]');
      const inputMinute = bottomTimePickerElement.querySelector(
        'input[name="minute"]'
      );

      const currentTime = new DateObject();

      if (
        inputHour.name === 'hour' &&
        parseInt(inputHour.value, 10) === currentTime.hour &&
        inputMinute.name === 'minute' &&
        parseInt(inputMinute.value, 10) === currentTime.minute
      ) {
        inputHour.style.color = theme.colors.secondary;
        inputMinute.style.color = theme.colors.secondary;
      } else {
        inputHour.style.color = theme.colors.blue80;
        inputMinute.style.color = theme.colors.blue80;
      }

      if (disableTimePicker) {
        inputHour.style.color = theme.colors.neutral50;
        inputMinute.style.color = theme.colors.neutral50;
      }
    }

    const pickMonthDisplayFlex = containerElement.querySelector(
      '.rmdp-month-picker[style*="display: flex;"]'
    );

    if (pickMonthDisplayFlex) {
      setIsHideMonthText(true);
    } else {
      setIsHideMonthText(false);
    }
  };

  const handleDatePickerRef = useCallback((node) => {
    if (node) {
      datePickerRef.current = node;

      modifyHeaderDatePicker(datePickerRef.current);
      modifyBottomDatePicker(datePickerRef.current);
    }
  }, []);

  const handleShowCalendar = (event) => {
    event.stopPropagation();
    setIsCalendarOpen(true);

    if (!selectedDate.valueTextfield) {
      setSelectedDate({ ...selectedDate, valueTextfield: formattedDate });
    }
  };

  const preventInputDatePicker = (event) => {
    event.preventDefault();
  };

  const formatDateObject = (dateString) =>
    new DateObject({ date: dateString, format: formatDate });

  const formatValueToDateObject = (currentValue) => {
    let formattedValue = [];

    if (!currentValue) return formattedValue;

    const dateRegex =
      /^(\d{1,4}[-/]\d{1,2}[-/]\d{1,4})($|\s*-\s*(\d{1,4}[-/]\d{1,2}[-/]\d{1,4}))$/;

    const dateTimeRegex =
      /^(\d{1,4}\/\d{1,2}\/\d{1,4} \d{1,2}:\d{2})(?:$| - \d{1,4}\/\d{1,2}\/\d{1,4} \d{1,2}:\d{2})$/;

    const regex = timePicker ? dateTimeRegex : dateRegex;
    const match = currentValue?.match(regex);

    if (match) {
      if (mode === 'Range') {
        formattedValue = timePicker
          ? [formatDateObject(match[1]), formatDateObject(match[2])]
          : [formatDateObject(match[1]), formatDateObject(match[3])];
      } else {
        formattedValue = [formatDateObject(match[1])];
      }
    } else if (
      currentValue &&
      mode === 'Range' &&
      currentValue.endsWith(' - ')
    ) {
      const cleanedString = currentValue.slice(0, -3).trim();
      formattedValue = [formatDateObject(cleanedString)];
    }

    return formattedValue;
  };

  // Set Initial Value
  useEffect(() => {
    const currentValue = control ? valueHookFormRef.current : value;

    if (currentValue) {
      const formatValue = formatValueToDateObject(currentValue);

      handleChange({
        target: {
          value: formatValue,
        },
      });
    } else {
      handleChange({
        target: {
          value: '',
        },
      });
    }
  }, [valueHookFormRef.current]);

  // Delete Value When Reset Form
  useEffect(() => {
    const currentValue = control && valueHookFormRef.current;
    if (!currentValue) {
      handleChange({
        target: {
          value: '',
        },
      });
    }
  }, [valueHookFormRef.current]);

  // Get default props based on calendar mode (Single or Range)
  useEffect(() => {
    const getFormattedDate = DatePicker.defaultProps.formattedDate(
      mode,
      formatDate
    );
    setFormattedDate(getFormattedDate);

    const timePickerPlugin = timePicker
      ? [<TimePicker position="bottom" hideSeconds key="time-picker-plugin" />]
      : undefined;

    let defaultDatePickerProps = DatePicker.defaultProps.defaultDatePickerProps(
      id,
      mode,
      formatDate,
      numberOfCalendar,
      timePickerPlugin
    );

    if (mode === 'Range') {
      defaultDatePickerProps = {
        ...defaultDatePickerProps,
        range: true,
        rangeHover: true,
      };
    }
    setDefaultProps(defaultDatePickerProps);
  }, []);

  // Close calendar when user click outside calendar
  useEffect(() => {
    const resetValue = () => {
      setSelectedDate({
        ...selectedDate,
        valueTextfield: '',
        valueDatePicker: '',
      });

      const onChangeFunction = onChangeHookFormRef.current || onChange;

      onChangeFunction('');
    };

    const handleSetValueRangeMode = () => {
      const formattedValue = formatValueToDateObject(
        selectedDate.valueTextfield
      );

      if (!formattedValue || formattedValue.length !== 2) {
        resetValue();
      }
    };

    const handleSetValueSingleMode = () => {
      const formatValue = formatValueToDateObject(selectedDate.valueTextfield);
      const isRHFCurrentValue =
        onChangeHookFormRef.current && valueHookFormRef.current === formatValue;

      if (isRHFCurrentValue || selectedDate.valueTextfield === formatValue[0]) {
        resetValue();
      }
    };

    const handleClickOutside = (event) => {
      if (
        !containerRef.current ||
        containerRef.current.contains(event.target)
      ) {
        return;
      }

      setIsCalendarOpen(false);

      if (mode === 'Range') {
        handleSetValueRangeMode();
      } else {
        handleSetValueSingleMode();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef, selectedDate, onChangeHookFormRef]);

  // Change time text color when the time is equal with current time
  useEffect(() => {
    if (datePickerRef.current) {
      const bottomTimePickerElement = datePickerRef.current.querySelector(
        '.rmdp-time-picker.bottom'
      );

      if (timePicker && disableTimePicker) {
        const increaseTimeElements = datePickerRef.current.querySelectorAll(
          'button.rmdp-arrow-container.rmdp-up'
        );
        const decreaseTimeElements = datePickerRef.current.querySelectorAll(
          'button.rmdp-arrow-container.rmdp-down'
        );
        const inputHour =
          bottomTimePickerElement.querySelector('input[name="hour"]');
        const inputMinute = bottomTimePickerElement.querySelector(
          'input[name="minute"]'
        );

        inputHour.setAttribute('disabled', true);
        inputMinute.setAttribute('disabled', true);

        increaseTimeElements.forEach((element) => {
          element.setAttribute('disabled', true);
          element.removeEventListener('click', element.onClick);
        });
        decreaseTimeElements.forEach((element) => {
          element.setAttribute('disabled', true);
          element.removeEventListener('click', element.onClick);
        });
      }

      const dayPickerElement = datePickerRef.current.querySelectorAll(
        '.rmdp-day-picker > div'
      );

      dayPickerElement.forEach((el, index) => {
        if (dayPickerElement.length > 1) {
          el.id = `calendar-${index + 1}`;
        } else {
          el.id = `calendar-1`;
        }
      });

      const monthPickerElement = datePickerRef.current.querySelectorAll(
        '.rmdp-month-picker > div > .rmdp-ym > .rmdp-day > span'
      );

      monthPickerElement.forEach((el) => {
        el.id = 'months';
      });

      const yearPickerElement = datePickerRef.current.querySelectorAll(
        '.rmdp-year-picker > .rmdp-ym > .rmdp-day > span'
      );

      yearPickerElement.forEach((el) => {
        el.id = 'years';
      });
    }
  }, [datePickerRef.current]);

  const renderDatePicker = () => {
    const placeholderFromFormatDate =
      mode === 'Range' ? `${formatDate} - ${formatDate}` : formatDate;

    const textFieldProps = {
      id: `date-${id}`,
      disabled,
      endAdornment: (
        <Icon
          iconName="OutlinedCalendar"
          size="16px"
          color="blue80"
          onClick={() =>
            !disabled ? setIsCalendarOpen(!isCalendarOpen) : undefined
          }
          disabled={disabled}
          style={{
            pointer: disabled ? 'not-allowed' : 'pointer',
          }}
        />
      ),
      errors,
      label,
      onClick: handleShowCalendar,
      placeholder: placeholder || placeholderFromFormatDate,
      width: '100%',
      autoComplete: 'off',
      validation,
      onKeyDown: preventInputDatePicker,
      onChange: handleChange,
      name,
    };

    const commonPropsDatePickerElement = {
      isTimePicker: timePicker,
      isTwoCalendar: numberOfCalendar === 2,
      isHideMonthText,
      ref: handleDatePickerRef,
      maxDate,
      minDate,
      placement,
      value: selectedDate.valueDatePicker,
      onlyMonthPicker,
      onlyYearPicker,
      ...defaultProps,
    };

    const DatePickerComponent = (
      <>
        <TextField
          {...textFieldProps}
          name={name}
          value={selectedDate.valueTextfield}
        />
        {isCalendarOpen && (
          <StyledDatePicker
            {...commonPropsDatePickerElement}
            onChange={(date) =>
              handleChange({
                target: { name, value: mode === 'Range' ? date : [date] },
              })
            }
          />
        )}
      </>
    );

    if (!control) {
      return DatePickerComponent;
    }

    return (
      <Controller
        control={control}
        name={name}
        rules={validation}
        defaultValue=""
        render={({
          field: { onChange: onChangeHookForm, value: valueHookForm },
        }) => {
          onChangeHookFormRef.current = onChangeHookForm;
          valueHookFormRef.current = valueHookForm;

          return (
            <>
              <TextField {...textFieldProps} value={valueHookForm} />
              {isCalendarOpen && (
                <StyledDatePicker
                  {...commonPropsDatePickerElement}
                  onChange={(date) =>
                    handleChange({
                      target: { name, value: mode === 'Range' ? date : [date] },
                    })
                  }
                />
              )}
            </>
          );
        }}
      />
    );
  };

  return (
    <StyledDatePickerContainer ref={containerRef}>
      {renderDatePicker()}

      {/*  // Added Horiztontal Divider in Header */}
      {isCalendarOpen &&
        showHorizontalDivider?.element &&
        (showHorizontalDivider.numsOfDivider === 2
          ? createPortal(
              <div className="horizontal-divider-wrapper">
                <div className="horizontal-divider" />
                <div className="horizontal-divider" />
              </div>,
              showHorizontalDivider.element
            )
          : createPortal(
              <div className="horizontal-divider" />,
              showHorizontalDivider.element
            ))}

      {/*  // Added ChevronDown Icon beside Year Time Picker Header */}
      {showChevronDownIcon?.elements?.map((element) => {
        return createPortal(
          <Icon
            iconName="ChevronDown"
            size="16px"
            style={{
              marginLeft: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />,
          element
        );
      })}

      {/*  // Added new 'Time' text in Date Time Picker Bottom */}
      {timePicker && showBottomTimeText?.element && (
        <>
          {createPortal(
            <span className="time-text">Time</span>,
            showBottomTimeText.element
          )}
        </>
      )}
    </StyledDatePickerContainer>
  );
};

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  control: PropTypes.shape({}),
  disabled: PropTypes.bool,
  disableTimePicker: PropTypes.bool, // Only disable time picker
  errors: PropTypes.shape({}),
  formatDate: PropTypes.string.isRequired,
  headerOrderOneCalendar: PropTypes.arrayOf(PropTypes.string),
  headerOrderTwoCalendar: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  mode: PropTypes.oneOf(['Single', 'Range']), // Single: only choose 1 date, Range: choose 2 dates
  maxDate: PropTypes.string, // maxDate format must be the same as formatDate props
  minDate: PropTypes.string, // minDate format must be the same as formatDate props
  name: PropTypes.string.isRequired,
  numberOfCalendar: PropTypes.oneOf([1, 2]),
  timePicker: PropTypes.bool,
  value: PropTypes.string,
  placement: PropTypes.string,
  placeholder: PropTypes.string,
  validation: PropTypes.shape({}),
  onlyMonthPicker: PropTypes.bool,
  onlyYearPicker: PropTypes.bool,

  defaultDatePickerProps: PropTypes.func,
  formattedDate: PropTypes.func,
  onChange: PropTypes.func,
};

DatePicker.defaultProps = {
  control: null,
  disabled: false,
  disableTimePicker: false,
  errors: {},
  headerOrderOneCalendar: ['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON'],
  headerOrderTwoCalendar: ['LEFT_BUTTON', 'MONTH_YEAR', 'RIGHT_BUTTON'],
  label: '',
  maxDate: '',
  minDate: '',
  timePicker: false,
  value: '',
  placement: 'bottom left',
  placeholder: '',
  validation: {},
  onlyMonthPicker: false,
  onlyYearPicker: false,
  mode: 'Single',
  numberOfCalendar: 1,
  defaultDatePickerProps: (
    id,
    mode,
    formatDate,
    numberOfCalendar,
    timePickerPlugin
  ) => ({
    id: `${numberOfCalendar}Months${mode}${id}`,
    format: formatDate,
    headerOrder:
      numberOfCalendar === 1
        ? DatePicker.defaultProps.headerOrderOneCalendar
        : DatePicker.defaultProps.headerOrderTwoCalendar,
    numberOfMonths: numberOfCalendar,
    monthYearSeparator: ' ',
    mode: 'Single',
    plugins: timePickerPlugin,
    shadow: false,
    showOtherDays: numberOfCalendar === 1,
    weekStartDayIndex: 1,
  }),
  formattedDate: (mode, formatDate) =>
    mode === 'Range' ? `${formatDate} - ${formatDate}` : formatDate,
  onChange: () => {},
};
