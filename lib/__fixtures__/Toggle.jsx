import React from 'react';
import { Toggle } from '../components/Toggle';

const ContainerToggle = {
  default: (
    <div>
      <Toggle />
    </div>
  ),
  medium: (
    <div>
      <Toggle mode="medium" />
    </div>
  ),
  small: (
    <div>
      <Toggle mode="small" />
    </div>
  ),
  disable: (
    <div>
      <Toggle disabled />
    </div>
  ),
  stateOn: (
    <div>
      <Toggle state />
    </div>
  ),
  stateOff: (
    <div>
      <Toggle state={false} />
    </div>
  ),
};

export default ContainerToggle;
