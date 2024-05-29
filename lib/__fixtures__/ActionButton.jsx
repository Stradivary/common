import React, { useState } from 'react';
import { ActionButton, DrawerComponent } from '../components';

const FilterExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <ActionButton
        id="example-filter"
        variant="filter"
        onClick={() => setIsOpen(!isOpen)}
        countFilters={0}
      />
      <ActionButton
        id="example-filter-with-selected-filter"
        variant="filter"
        onClick={() => setIsOpen(!isOpen)}
        countFilters={12}
      />
      <DrawerComponent
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        size={362}
      />
    </div>
  );
};

export default {
  Filter: FilterExample,
  Sort: (
    <div style={{ width: 'fit-content' }}>
      <ActionButton
        id="example-sort-list"
        variant="sort"
        options={[
          {
            param: 'createdDate',
            order: 'ASCENDING',
            label: 'Tanggal Pembuatan (Terbaru)',
            onClick: () => {},
          },
          {
            param: 'createdDate',
            order: 'DESCENDING',
            label: 'Tanggal Pembuatan (Terlama)',
            onClick: () => {},
          },
          {
            param: 'endDate',
            order: 'ASCENDING',
            label: 'Tenggat Waktu (Terbaru)',
            onClick: () => {},
          },
          {
            param: 'endDate',
            order: 'DESCENDING',
            label: 'Tenggat Waktu (Terlama)',
            onClick: () => {},
          },
        ]}
      />
    </div>
  ),
  Dropdown: (
    <div style={{ width: 'fit-content' }}>
      <ActionButton
        id="example-dropdown"
        variant="dropdown"
        options={[
          {
            param: 'itemName',
            label: 'Nama Item',
            onClick: () => {},
          },
          {
            param: 'itemId',
            label: 'ID Item',
            onClick: () => {},
          },
        ]}
        text="Cari Item"
        endIcon="ChevronDown"
      />
    </div>
  ),
  Download: <ActionButton id="cosmos" variant="download" onClick={() => {}} />,
};
