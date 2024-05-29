import React from 'react';
import { ProgressBar } from '../components';

const percentage = {
  default: 25,
  success: 100,
};

const ContainerProgress = {
  default: (
    <div>
      <ProgressBar percentage={percentage.default} />
    </div>
  ),
  small: (
    <div>
      <ProgressBar
        size="small"
        percentage={percentage.default}
        label="Label"
        filename="Optional helper text"
        withOption
        withLabel
        withCloseIcon
      />
    </div>
  ),
  withOption: (
    <div>
      <ProgressBar
        size="big"
        percentage={percentage.default}
        label="Label"
        filename="Optional helper text"
        withOption
      />
    </div>
  ),
  withLabel: (
    <div>
      <ProgressBar
        size="big"
        percentage={percentage.default}
        label="Label"
        filename="Optional helper text"
        withLabel
      />
    </div>
  ),
  withCloseIcon: (
    <div>
      <ProgressBar
        size="big"
        percentage={percentage.default}
        label="Label"
        filename="Optional helper text"
        withCloseIcon
      />
    </div>
  ),
  big: (
    <div>
      <ProgressBar
        percentage={percentage.default}
        label="Label"
        filename="Optional helper text"
        withOption
        withLabel
        withCloseIcon
      />
    </div>
  ),
  success: (
    <div>
      <ProgressBar
        percentage={percentage.success}
        label="Uploading"
        filename="example.txt"
        withOption
        withLabel
        withCloseIcon
      />
    </div>
  ),
};

export default ContainerProgress;
