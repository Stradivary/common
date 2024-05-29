/* eslint-disable */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  DrawerComponent,
  Dropdown,
  Typography,
  DatePicker,
} from '../components';

const dataDropdown = [
  {
    fieldName: 'ID Opportunity',
    placeholder: 'Pilih ID Opportunity',
    options: [
      {
        label: 'Account Manager',
        value: 'Account Manager',
      },
      {
        label: 'Account Creator',
        value: 'Account Creator',
      },
      {
        label: 'Acceptance',
        value: 'Acceptance',
      },
      {
        label: 'Accuracy',
        value: 'Accuracy',
      },
      {
        label: 'Owner',
        value: 'Owner',
      },
      {
        label: 'Administrator',
        value: 'Administrator',
      },
      {
        label: 'Analyst',
        value: 'Analyst',
      },
      {
        label: 'Assistant',
        value: 'Assistant',
      },
      {
        label: 'Developer',
        value: 'Developer',
      },
    ],
  },
  {
    fieldName: 'Nama Opportunity',
    placeholder: 'Pilih Nama Opportunity',
    options: [
      {
        label: 'Account Manager',
        value: 'Account Manager',
      },
      {
        label: 'Account Creator',
        value: 'Account Creator',
      },
      {
        label: 'Acceptance',
        value: 'Acceptance',
      },
      {
        label: 'Accuracy',
        value: 'Accuracy',
      },
      {
        label: 'Owner',
        value: 'Owner',
      },
      {
        label: 'Administrator',
        value: 'Administrator',
      },
      {
        label: 'Analyst',
        value: 'Analyst',
      },
      {
        label: 'Assistant',
        value: 'Assistant',
      },
      {
        label: 'Developer',
        value: 'Developer',
      },
    ],
  },
  {
    fieldName: 'Nama Corporate',
    placeholder: 'Pilih Nama Corporate',
    options: [
      {
        label: 'Account Manager',
        value: 'Account Manager',
      },
      {
        label: 'Account Creator',
        value: 'Account Creator',
      },
      {
        label: 'Acceptance',
        value: 'Acceptance',
      },
      {
        label: 'Accuracy',
        value: 'Accuracy',
      },
      {
        label: 'Owner',
        value: 'Owner',
      },
      {
        label: 'Administrator',
        value: 'Administrator',
      },
      {
        label: 'Analyst',
        value: 'Analyst',
      },
      {
        label: 'Assistant',
        value: 'Assistant',
      },
      {
        label: 'Developer',
        value: 'Developer',
      },
    ],
  },
];

const DrawerComponentCosmos = () => {
  const [state, setState] = useState({
    drawerState: false,
    date: '',
  });

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { isValid, dirtyFields },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      min: null,
      max: null,
      date: '',
    },
  });

  const buttonDisabled = !isValid || !dirtyFields;

  const datePickerProps = {
    id: 'fltr-date-opty',
    name: 'date',
    mode: 'Range',
    formatDate: 'DD/MM/YYYY',
    numberOfCalendar: 1,
  };

  const onClickSubmit = (data) => {
    console.log('data', data);
  };

  const handleChange = (date) => {
    console.log('date picker', date);
  };

  const styleInput = {
    width: '113px',
    height: '24px',
    padding: '8px 12px',
    color: '#001a41',
    borderRadius: '4px',
    border: '1px solid #cccccc',
    outline: 'none',

    '&::placeholder': {
      color: '#adadad',
    },
  };
  return (
    <div>
      <DrawerComponent
        open={state.drawerState}
        onClose={() => setState({ drawerState: !state.drawerState })}
        size={362}
        isDisabled={buttonDisabled}
        handleSubmit={handleSubmit(onClickSubmit)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {dataDropdown.map((el) => (
            <div key={el.fieldName}>
              <Typography
                color="blue80"
                size="12px"
                weight={500}
                lineHeight="18px"
                wordBreak="break-word"
                margin="0 0 8px 0"
              >
                {el.fieldName}
              </Typography>
              <Dropdown
                options={el.options}
                variant="autocomplete"
                zIndex={11}
                placeholder={
                  <Typography
                    color="neutral50"
                    size="14px"
                    weight="400"
                    lineHeight="21px"
                  >
                    {el.placeholder}
                  </Typography>
                }
              />
            </div>
          ))}
          <div>
            <Typography
              color="blue80"
              size="12px"
              weight={500}
              lineHeight="18px"
              wordBreak="break-word"
              margin="0 0 8px 0"
            >
              Periode Closed
            </Typography>
            <DatePicker
              control={control}
              onChange={handleChange}
              value={state.date}
              formattedDate={state.date || 'DD/MM/YYYY'}
              register={register}
              setFocus={setFocus}
              placement="top"
              {...datePickerProps}
            />
          </div>
          <div>
            <Typography
              color="blue80"
              size="12px"
              weight={500}
              lineHeight="18px"
              wordBreak="break-word"
              margin="0 0 8px 0"
            >
              Total Sales Revenue
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <input
                type="number"
                placeholder="Min"
                min={0}
                style={styleInput}
                {...register('min', { required: true })}
              />
              <Typography
                size="20px"
                color="blue80"
                weight={500}
                lineHeight="30px"
              >
                -
              </Typography>
              <input
                type="number"
                placeholder="Max"
                style={styleInput}
                {...register('max', { required: true })}
              />
            </div>
          </div>
        </div>
      </DrawerComponent>
      <button onClick={() => setState({ drawerState: !state.drawerState })}>
        Open Drawer
      </button>
    </div>
  );
};

export default {
  Drawer: <DrawerComponentCosmos />,
};
