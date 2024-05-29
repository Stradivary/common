import React from 'react';
import { Stepper } from '../components';

const steps = [
  {
    currentStep: 'completed',
    stepDesc: 'Informasi Umum',
    dueDate: '20230209',
    realizationDate: '20231008',
  },
  {
    currentStep: 'inProgress',
    stepDesc: 'Proposal',
    dueDate: '20230209',
    realizationDate: '20231008',
  },
  {
    currentStep: 'default',
    stepDesc: 'Konfirmasi',
    dueDate: '20230209',
    realizationDate: '20231008',
  },
  {
    currentStep: 'completed',
    stepDesc: 'Success Example: Konfirmasi',
    dueDate: '20230209',
    realizationDate: '20231008',
  },
];

export default {
  default: <Stepper steps={steps} />,
  dueDate: <Stepper steps={steps} dueDate />,
  realizationDate: <Stepper steps={steps} realizationDate />,
};
