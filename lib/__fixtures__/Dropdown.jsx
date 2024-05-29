import React from 'react';
import styled from 'styled-components';
import { Dropdown, Icon, Typography } from '../components';

const options = [
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
];

const Wrapper = styled.div(() => ({
  minHeight: '70vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#FFF',
  gap: 10,
}));

const WrapperInput = styled.div(() => ({
  width: '40%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#FFF',
  gap: 10,
}));

export default (
  <Wrapper>
    <WrapperInput>
      <Typography size="1.2rem" color="blue80">
        Single Select
      </Typography>
      <Dropdown
        name="single-select"
        variant="single-select"
        width={250}
        options={options}
        withSearch
      />
    </WrapperInput>
    <WrapperInput>
      <Typography size="1.2rem" color="blue80">
        Auto Complete
      </Typography>
      <Dropdown
        name="single-select"
        variant="autocomplete"
        width={250}
        options={options}
        icon={<Icon iconName="Search" size="20px" />}
        leftIcon
        withSearch
      />
    </WrapperInput>
    <WrapperInput>
      <Typography size="1.2rem" color="blue80">
        Multi Select
      </Typography>
      <Dropdown
        name="single-select"
        variant="multi-select"
        width={250}
        options={options}
        withSearch
      />
    </WrapperInput>
  </Wrapper>
);
