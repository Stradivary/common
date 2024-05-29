import React from 'react';
import { SearchInput } from '../components/SearchInput';

const ContainerSearchInput = {
  default: (
    <div>
      <SearchInput id="cosmos" />
    </div>
  ),
  props: (
    <div>
      <SearchInput id="cosmos" placeholder="Cari Nama atau ID" />
    </div>
  ),
  value: (
    <div>
      <SearchInput id="cosmos" placeholder="Cari Nama atau ID" value="VALUE" />
    </div>
  ),
};

export default ContainerSearchInput;
