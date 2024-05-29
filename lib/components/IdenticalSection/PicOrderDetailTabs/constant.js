// Case
export const CASE_DROPDOWN_OPTIONS = [
  {
    label: 'ID Case',
    value: 'caseID',
  },
  {
    label: 'ID Project',
    value: 'projectId',
  },
  {
    label: 'ID KIP',
    value: 'kipId',
  },
  {
    label: 'Penugasan Tiket',
    value: 'caseOwner',
  },
];

export const CASE_DRAWER_FILTER_DATA = (getValues) => {
  return {
    defaultContent: [
      {
        id: 'case-id',
        name: 'caseID',
        label: 'ID Case',
        placeholder: 'Masukkan ID Case',
        type: 'input',
        validation: {},
      },
      {
        id: 'project-id',
        name: 'projectId',
        label: 'ID Project',
        placeholder: 'Masukkan ID Project',
        type: 'input',
        validation: {},
      },
      {
        id: 'kip-id',
        name: 'kipId',
        label: 'ID KIP',
        placeholder: 'Masukkan ID KIP',
        type: 'input',
        validation: {},
      },
      {
        id: 'case-owner',
        name: 'caseOwner',
        label: 'Penugasan Tiket',
        placeholder: 'Masukkan Penugasan Tiket',
        type: 'input',
        validation: {},
      },
      {
        id: 'status',
        name: 'status',
        label: 'Status',
        placeholder: 'Pilih Status',
        type: 'select',
        selectedValue: getValues('status'),
        validation: {},
        option: {
          id: 'status',
          name: 'status',
          title: 'Status',
          placeholder: 'Pilih Status',
          content: [
            {
              id: '1',
              value: 'Open',
            },
            {
              id: '2',
              value: 'In Progress',
            },
            {
              id: '3',
              value: 'Closed',
            },
            {
              id: '4',
              value: 'Cancelled',
            },
          ],
        },
      },
      {
        id: 'created-date',
        name: 'createdAt',
        label: 'Created Date',
        placeholder: 'DD/MM/YYYY',
        type: 'dateRange',
      },
      {
        id: 'closed-date',
        name: 'closedAt',
        label: 'Closed Date',
        placeholder: 'DD/MM/YYYY',
        type: 'dateRange',
      },
    ],
  };
};

export const ColumnsTabCart = [
  {
    label: 'No',
  },
  {
    type: 'subtitle',
    title: 'Nama Paket',
    subtitle: 'ID Order',
    width: '450px',
  },
  {
    label: 'Jumlah Bonus',
    textAlign: 'center',
  },
  {
    label: 'Subscriptions',
    textAlign: 'center',
  },
  {
    label: 'Status SIM Card',
    textAlign: 'center',
  },
];

export const HeaderTableTabCase = [
  {
    label: 'No',
  },
  {
    label: 'ID Case',
    width: '10.8rem',
  },
  {
    label: 'ID Project',
    width: '10.8rem',
  },
  {
    label: 'ID KIP',
    width: '10.8rem',
  },
  {
    label: 'Penugasan Tiket',
    param: 'caseOwner',
  },
  {
    label: 'Status',
  },
  {
    type: 'sort',
    label: 'Created Date',
    param: 'createdDate',
  },
  {
    type: 'sort',
    label: 'Closed Date',
    param: 'closedDate',
  },
];

export const FilterLabelCase = {
  caseID: 'ID Case',
  projectId: 'ID Project',
  kipId: 'ID KIP',
  caseOwner: 'Penugasan Tiket',
  status: 'Status',
  createdAt: 'Created Date',
  closedAt: 'Closed Date',
};

export const mockTableTabCaseBody = [
  [
    1,
    {
      type: 'link',
      to: '#',
      value: 'CASE001',
    },
    {
      type: 'link',
      to: '/project-details/123',
      value: '123',
    },
    'KIP001',
    'John Doe',
    {
      type: 'tag',
      color: 'green',
      value: 'Open',
    },
    {
      type: 'subtitle',
      title: 'Mar 10, 2024',
      subtitle: '09:30:00',
    },
    {
      type: 'subtitle',
      title: 'Mar 12, 2024',
      subtitle: '15:45:00',
    },
  ],
];

export const mockRecordTotal = 10;
