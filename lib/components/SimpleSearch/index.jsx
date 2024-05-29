import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm, useWatch } from 'react-hook-form';
import { TextField } from '../Textfield';
import { Icon } from '../Icon';
import { Flex } from '../Flex';
import { Dropdown } from '../Dropdown';
import { Form as FormComponent } from '../Form';
import { DatePicker } from '../DatePicker';

const Form = styled(FormComponent)`
  .dropdown {
    max-width: 100%;
    ${({ theme }) => theme.responsive.mobile`
      width: 100%;
    `}
  }
`;
export const SimpleSearch = (props) => {
  const {
    options,
    onSubmit,
    className,
    validation,
    isReset,
    sizeDropdown,
    sizeContainer,
    placeholderTextField,
    placeholder,
    defaultValues,
  } = props;
  const {
    register,
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm({
    defaultValues,
  });

  useEffect(() => isReset && reset(), [isReset]);
  const keyItemFind = useWatch({
    control,
    name: 'keyItem',
  });

  const triggerSubmit = () => {
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    const keyword = watch('keyword');
    if (keyItemFind?.type === 'dateRange' && keyword) {
      if (keyItemFind?.mode === 'Single') {
        triggerSubmit();
      } else {
        const start = keyword.split(' - ')[0];
        const end = keyword.split(' - ')[1];

        if (start && end) {
          triggerSubmit();
        }
      }
    }
    const dropDown = watch('dropDown');
    if (keyItemFind?.type === 'dropDown' && dropDown) {
      setValue('keyword', dropDown.value);
      triggerSubmit();
    }
  }, [watch('keyword'), watch('dropDown')]);

  const generateSearchField = () => {
    if (keyItemFind?.type === 'dateRange') {
      return (
        <DatePicker
          id="keyword"
          name="keyword"
          mode={keyItemFind?.mode ?? 'Range'}
          formatDate="DD/MM/YYYY"
          control={control}
          numberOfCalendar={1}
        />
      );
    }

    const generatePlaceholderTextField = () => {
      if (placeholderTextField) return placeholderTextField;
      return keyItemFind
        ? `Cari ${keyItemFind?.placeholder || keyItemFind.label}`
        : 'Kata Kunci';
    };

    if (keyItemFind?.type === 'dropDown') {
      return (
        <Flex flex="none" width="100%">
          <Dropdown
            placeholder={generatePlaceholderTextField()}
            id="dropdown-search"
            name="dropDown"
            options={keyItemFind?.content || []}
            variant={keyItemFind?.variant || 'basic'}
            control={control}
            errors={errors}
            borderColor="blue80"
            placeholderColor="blue80"
            withSearch={keyItemFind?.withSearch}
          />
        </Flex>
      );
    }

    return (
      <TextField
        placeholder={generatePlaceholderTextField()}
        id="input-text-basic-search"
        validation={validation}
        name="keyword"
        width="100%"
        register={register}
        disabled={!placeholderTextField && !keyItemFind}
        errors={errors}
        endAdornment={
          <Icon
            id="btn-submit-basic-search"
            onClick={isValid ? triggerSubmit : undefined}
            disabled={!placeholderTextField && !keyItemFind}
            iconName="Magnifying"
            color="neutral90"
          />
        }
      />
    );
  };

  return (
    <Flex className={`${className} simple-search`} size={sizeContainer}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="spacing03">
          <Flex flex="none" size={sizeDropdown}>
            <Dropdown
              placeholder={placeholder}
              id="basic-search"
              name="keyItem"
              options={options}
              variant="basic"
              control={control}
              validation={{ required: !placeholderTextField }}
              errors={errors}
              borderColor="blue80"
              placeholderColor="blue80"
            />
          </Flex>
          <Flex flex="1">{generateSearchField()}</Flex>
          {/* trigger onSubmit on Form component when enter */}
          <button id="hidden-submit" type="submit" style={{ display: 'none' }}>
            hidden
          </button>
        </Flex>
      </Form>
    </Flex>
  );
};
SimpleSearch.defaultProps = {
  validation: {},
  options: [
    {
      label: 'ID',
      value: 'id',
    },
    {
      label: 'Name',
      value: 'name',
    },
  ],
  className: '',
  placeholder: 'Cari Item',
  placeholderTextField: '',
  onSubmit: async (value) => {
    const promise = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(value);
        console.log('value', value); // eslint-disable-line
      }, 2000);
    });
    return promise;
  },
  isReset: false,
  sizeDropdown: { mb: '40%', tp: 'none', dt: '141px' },
  sizeContainer: { dt: 4.5, mb: 12 },
  defaultValues: {},
};
SimpleSearch.propTypes = {
  validation: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({})]),
  options: PropTypes.arrayOf(PropTypes.shape({})),
  onSubmit: PropTypes.func,
  isReset: PropTypes.bool,
  className: PropTypes.string,
  sizeDropdown: PropTypes.shape({}),
  sizeContainer: PropTypes.shape({}),
  placeholder: PropTypes.string,
  placeholderTextField: PropTypes.string,
  defaultValues: PropTypes.shape({}),
};
