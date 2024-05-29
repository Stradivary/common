/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { DatePicker } from '../components';

const DatePickerReactHookFormCosmos = (props) => {
  const { datePickerRHFProps, disabled } = props;
  const { name } = datePickerRHFProps;
  const [result, setResult] = useState('');

  let formattedDate;

  if (name === 'contoh9') {
    formattedDate = '05/08/2023';
  } else if (name === 'contoh10') {
    formattedDate = '01/02/2023 - 05/08/2023';
  } else {
    formattedDate = '';
  }

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      contoh9: formattedDate,
      contoh10: formattedDate,
    },
  });

  useEffect(() => {
    setValue(name, formattedDate);
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit((date) => {
          setResult(date?.[name]);
        })}
        style={{ width: '400px' }}
      >
        <DatePicker
          disabled={disabled}
          control={control}
          {...datePickerRHFProps}
        />
        <button type="submit">Submit</button>
      </form>
      <h1>HASIL SUBMIT: {result}</h1>
    </>
  );
};

const DatePickerCosmos = (props) => {
  const { datePickerProps, disabled } = props;
  const [selectedDate, setSelectedDate] = useState('');
  const [result, setResult] = useState('');

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(selectedDate);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <DatePicker
          onChange={handleChange}
          value={selectedDate}
          disabled={disabled}
          {...datePickerProps}
        />
        <button type="submit">Submit</button>
      </form>
      <h1>HASIL SUBMIT: {result}</h1>
    </>
  );
};
DatePickerCosmos.defaultProps = {
  disabled: false,
};
DatePickerCosmos.propTypes = {
  datePickerProps: PropTypes.shape({ name: PropTypes.string }).isRequired,
  disabled: PropTypes.bool,
};

DatePickerReactHookFormCosmos.defaultProps = {
  disabled: false,
};
DatePickerReactHookFormCosmos.propTypes = {
  datePickerRHFProps: PropTypes.shape({ name: PropTypes.string }).isRequired,
  disabled: PropTypes.bool,
};

export default {
  'Single Date Picker': () => (
    <DatePickerCosmos
      datePickerProps={{
        id: 'contoh1',
        name: 'contoh1',
        mode: 'Single',
        formatDate: 'DD/MM/YYYY',
        numberOfCalendar: 1,
      }}
    />
  ),
  'Single Time Picker': () => (
    <DatePickerCosmos
      datePickerProps={{
        id: 'contoh2',
        name: 'contoh2',
        mode: 'Single',
        formatDate: 'DD/MM/YYYY HH:mm',
        numberOfCalendar: 1,
        timePicker: true,
      }}
    />
  ),
  'Single Date Range Picker': () => (
    <DatePickerCosmos
      datePickerProps={{
        id: 'contoh3',
        name: 'contoh3',
        mode: 'Range',
        formatDate: 'DD/MM/YYYY',
        numberOfCalendar: 1,
      }}
    />
  ),
  'Double Date Range Picker': () => (
    <DatePickerCosmos
      datePickerProps={{
        id: 'contoh4',
        name: 'contoh4',
        mode: 'Range',
        formatDate: 'DD/MM/YYYY',
        numberOfCalendar: 2,
      }}
    />
  ),
  'Populate Data Single Date Picker': () => (
    <DatePickerCosmos
      datePickerProps={{
        id: 'contoh5',
        name: 'contoh5',
        mode: 'Single',
        formatDate: 'DD/MM/YYYY',
        numberOfCalendar: 1,
        value: '12/12/2023',
      }}
    />
  ),
  'Populate Data Single Date Range Picker': () => (
    <DatePickerCosmos
      datePickerProps={{
        id: 'contoh6',
        name: 'contoh6',
        mode: 'Range',
        formatDate: 'DD/MM/YYYY',
        numberOfCalendar: 1,
        value: '12/12/2023 - 13/12/2023',
      }}
    />
  ),
  'React Hook Form Single Mode': () => (
    <DatePickerReactHookFormCosmos
      datePickerRHFProps={{
        id: 'contoh7',
        name: 'contoh7',
        mode: 'Single',
        formatDate: 'DD/MM/YYYY',
        numberOfCalendar: 1,
      }}
    />
  ),
  'React Hook Form Range Mode': () => (
    <DatePickerReactHookFormCosmos
      datePickerRHFProps={{
        id: 'contoh8',
        name: 'contoh8',
        mode: 'Range',
        formatDate: 'DD/MM/YYYY',
        numberOfCalendar: 1,
      }}
    />
  ),
  'React Hook Form Single Mode Populate Data': () => (
    <DatePickerReactHookFormCosmos
      datePickerRHFProps={{
        id: 'contoh9',
        name: 'contoh9',
        mode: 'Single',
        formatDate: 'DD/MM/YYYY',
        numberOfCalendar: 1,
      }}
    />
  ),
  'React Hook Form Range Mode Populate Data': () => (
    <DatePickerReactHookFormCosmos
      datePickerRHFProps={{
        id: 'contoh10',
        name: 'contoh10',
        mode: 'Range',
        formatDate: 'DD/MM/YYYY',
        numberOfCalendar: 1,
      }}
    />
  ),
};
