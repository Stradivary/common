import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Table,
  Typography,
  ActionButton,
  SearchInput,
  DrawerComponent,
} from '../components';

const columnsDefault = [
  'No',
  {
    type: 'subtitleWithSort',
    title: 'Title Sort',
    subtitle: 'Subtitle',
    sortBy: 'sortBy_sort_with_subtitle',
  },
  { label: 'Type HTML' },
  {
    label: 'Sort',
    type: 'sort',
    sortBy: 'sortBy_sort',
  },
  {
    label: 'Sort & Tooltip',
    type: 'sortWithTooltip',
    tooltipProps: {
      withIcon: false,
    },
    sortBy: 'sortBy_sort_with_tooltip',
  },
  {
    type: 'subtitle',
    title: 'Title',
    subtitle: 'Subtitle',
  },
  {
    type: 'subtitle',
    title: 'Linked Title',
    subtitle: 'Subtitle',
  },
  'Type Tag',
  {
    label: 'Delete',
    width: '1rem',
    textAlign: 'center',
  },
  {
    label: 'Edit',
    width: '1rem',
    textAlign: 'center',
  },
  {
    label: 'Aksi',
    width: '1rem',
    textAlign: 'center',
  },
];

const dataDefault = [
  {
    data1: '',
    data2: 'TypeLink',
    data3: 'Default 1',
    data4: 'TypeLink',
    data5: 'Title',
    data6: 'Type Tag',
    data7: 'Subtitle',
    data8: 'Title Type Link',
  },
  {
    data1: 'Visit',
    data2: 'TypeLink Test Test 1234',
    data3: 'Default 123',
    data4: 'TypeLink',
    data5: 'Title',
    data6: 'Type Tag',
    data7: 'Subtitle',
    data8: 'Title Type Link',
  },
  {
    data1: 'Visit',
    data2: 'TypeLink',
    data3: 'Default 123 456',
    data4: 'TypeLink Test Halo Test 1234',
    data5: 'Test Test 1234 Test Halo TEst TEST 122435 100000',
    data6: 'Type Tag',
    data7: 'Subtitle',
    data8: 'Title Type Link',
  },
  {
    data1: 'Visit',
    data2: 'TypeLink',
    data3: 'Default 123 456 78901234',
    data4: 'TypeLink Test Test 1234 Test Text Must Be Ellipsis',
    data5: 'Test Test 1234 Test Halo Test Text Must Be Ellipsis',
    data6: 'Type Tag',
    data7: 'Subtitle',
    data8: 'Title Type Link Test 1234 Text Must Be Ellipsis',
  },
];

const dataDefaultMap = dataDefault?.map((item, index) => [
  index + 1,
  item.data3,
  {
    type: 'html',
    value: (
      <>
        <Typography
          style={{
            padding: '0',
            margin: '0',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100px',
          }}
        >
          HTML 1
        </Typography>
        <Typography
          style={{
            padding: '0',
            margin: '0',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100px',
          }}
        >
          HTML 2
        </Typography>
        <Typography
          style={{
            padding: '0',
            margin: '0',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100px',
          }}
        >
          HTML 3
        </Typography>
      </>
    ),
  },
  {
    type: 'link',
    to: '/home',
    handler: () => {},
    value: item.data4,
    tooltipProps: {
      text: 'Tooltip Text',
      withIcon: false,
    },
  },
  {
    type: 'subtitle',
    title: item.data5,
    subtitle: item.data4,
  },
  {
    type: 'subtitleWithLink',
    title: item.data8,
    titleLinkTo: '/titleLinkTo',
    subtitle: item.data7,
    tooltipProps: {
      text: 'Tooltip Text',
      withIcon: false,
    },
  },
  {
    type: 'subtitleWithLink',
    title: item.data8,
    titleLinkTo: '/titleLinkTo',
    subtitle: item.data7,
  },
  {
    type: 'tag',
    color: index % 2 === 0 ? 'primary' : 'green',
    value: item.data6,
  },
  {
    type: 'action',
    subType: 'delete',
    handler: () => {},
    tooltipProps: {
      text: 'Tooltip Text',
      withIcon: false,
    },
  },
  {
    type: 'action',
    subType: 'edit',
    handler: () => {},
  },
  {
    type: 'multipleActions',
    actions: [
      {
        label: 'Ubah Informatsi Quote',
        type: 'edit',
        handler: () => {},
      },
      {
        label: 'Hapus Quote',
        type: 'delete',
        handler: () => {},
      },
    ],
  },
]);

const columnsGroup = {
  group: true,
  data: [
    { label: 'No', subCol: [] },
    { label: 'Default', subCol: [] },
    { label: 'Default', subCol: [] },
    { label: 'Default', subCol: [] },
    { label: 'Default', subCol: [] },
    {
      label: 'Title',
      subCol: [{ label: 'subtitle', textAlign: 'left', color: 'neutral40' }],
    },
    {
      label: 'Title',
      subCol: [{ label: 'subtitle', textAlign: 'left', color: 'neutral40' }],
    },
    { label: 'Tag', subCol: [] },
    {
      label: 'Aksi',
      textAlign: 'center',
      subCol: [
        { label: 'Edit', textAlign: 'center', color: 'neutral5' },
        { label: 'Delete', textAlign: 'center', color: 'neutral5' },
      ],
    },
    { label: 'Multiple Actions', textAlign: 'center', subCol: [] },
  ],
};

const dataGroup = [
  {
    data1: '',
    data2: 'TypeLink',
    data3: 'Default 1',
    data4: 'TypeLink',
    data5: 'Title',
    data6: 'Type Tag',
    data7: 'Subtitle',
    data8: 'Title Type Link',
  },
  {
    data1: 'Visit',
    data2: 'TypeLink Test Test 1234',
    data3: 'Default 123',
    data4: 'TypeLink',
    data5: 'Title',
    data6: 'Type Tag',
    data7: 'Subtitle',
    data8: 'Title Type Link',
  },
  {
    data1: 'Visit',
    data2: 'TypeLink',
    data3: 'Default 123 456',
    data4: 'TypeLink Test Halo Test 1234',
    data5: 'Test Test 1234 Test Test TeST 122435 100000',
    data6: 'Type Tag',
    data7: 'Subtitle',
    data8: 'Title Type Link',
  },
  {
    data1: 'Visit',
    data2: 'TypeLink',
    data3: 'Default 123 456 78901234',
    data4: 'TypeLink Test Test 1234 Test Text Must Be Ellipsis',
    data5: 'Test Test 1234 Test Test Text Must Be Ellipsis',
    data6: 'Type Tag',
    data7: 'Subtitle',
    data8: 'Title Type Link Test Test Text Must Be Ellipsis',
  },
];

const dataGroupMap = dataGroup.map((item, index) => [
  index + 1,
  item.data3,
  {
    type: 'html',
    value: (
      <>
        <Typography
          style={{
            padding: '0',
            margin: '0',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100px',
          }}
        >
          HTML 1
        </Typography>
        <Typography
          style={{
            padding: '0',
            margin: '0',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100px',
          }}
        >
          HTML 2
        </Typography>
        <Typography
          style={{
            padding: '0',
            margin: '0',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100px',
          }}
        >
          HTML 3
        </Typography>
      </>
    ),
  },
  {
    type: 'link',
    to: '/home',
    handler: () => {},
    value: item.data4,
    tooltipProps: {
      text: 'INI TEXT',
      withIcon: false,
    },
  },
  {
    type: 'subtitle',
    title: item.data5,
    subtitle: item.data4,
  },
  {
    type: 'subtitleWithLink',
    title: item.data8,
    titleLinkTo: '/titleLinkTo',
    subtitle: item.data7,
    tooltipProps: {
      text: 'INI TEXT',
      withIcon: false,
    },
  },
  {
    type: 'subtitleWithLink',
    title: item.data8,
    titleLinkTo: '/titleLinkTo',
    subtitle: item.data7,
  },
  {
    type: 'tag',
    color: index % 2 === 0 ? 'primary' : 'green',
    value: item.data6,
  },
  {
    type: 'action',
    subType: 'delete',
    handler: () => {},
    tooltipProps: {
      text: 'INI TEXT',
      withIcon: false,
    },
  },
  {
    type: 'action',
    subType: 'edit',
    handler: () => {},
    tooltipProps: {
      text: 'INI TEXT',
      withIcon: false,
    },
  },
  {
    type: 'multipleActions',
    actions: [
      {
        label: 'Ubah Informatsi Quote',
        type: 'edit',
        handler: () => {},
      },
      {
        label: 'Hapus Quote',
        type: 'delete',
        handler: () => {},
      },
    ],
  },
]);

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  ${({ isWithActions }) =>
    isWithActions &&
    `
      display: flex;
      flex-direction: column;
      gap: 16px;
    `}
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftColumn = styled.div`
  display: flex;
  justify-content: center;
`;

const RightColumn = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const WithActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleSortTable = (column) => {
    const findColumnTypeSort = columnsDefault.find(
      (item) => item.sortBy === column.sortBy
    );

    if (findColumnTypeSort) {
      setSortBy(column.sortBy);
      if (column.sortBy === sortBy) {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortOrder(() => 'desc');
      }
    }
  };

  const columns = columnsDefault.map((col) =>
    col.sortBy === sortBy ? { ...col, sortOrder } : col
  );

  return (
    <Wrapper isWithActions>
      <ActionsWrapper>
        <LeftColumn>
          <SearchInput id="cosmos" placeholder="Cari Nama atau ID" />
        </LeftColumn>
        <RightColumn>
          <ActionButton
            id="opportunity-list"
            variant="sort"
            sortOptions={[
              {
                param: 'createdDate',
                order: 'ASCENDING',
                label: 'Tanggal Pembuatan (Terbaru)',
                onClick: () => {}, // will return result {[param]: order}
              },
              {
                param: 'createdDate',
                order: 'DESCENDING',
                label: 'Tanggal Pembuatan (Terlama)',
                onClick: () => {}, // will return result {[param]: order}
              },
              {
                param: 'endDate',
                order: 'ASCENDING',
                label: 'Tenggat Waktu (Terbaru)',
                onClick: () => {}, // will return result {[param]: order}
              },
              {
                param: 'endDate',
                order: 'DESCENDING',
                label: 'Tenggat Waktu (Terlama)',
                onClick: () => {}, // will return result {[param]: order}
              },
            ]}
          />
          <ActionButton
            id="opportunity-list"
            variant="filter"
            onClick={() => setIsOpen(!isOpen)}
            countFilters={12}
          />
          {isOpen && (
            <DrawerComponent
              open={isOpen}
              onClose={() => setIsOpen(!isOpen)}
              size={362}
            />
          )}
          <ActionButton id="cosmos" variant="download" onClick={() => {}} />
        </RightColumn>
      </ActionsWrapper>
      <Table
        columns={columns}
        data={dataDefaultMap}
        emptyDataState={{
          image: true,
          headerText: 'Data Tidak Ditemukan',
          bodyText:
            'Saat ini Anda belum memiliki aktivitas. Silakan tambah aktivitas melalui tombol berikut.',
          addButton: { label: 'Tambah Aktivitas', onClick: () => {} },
        }}
        pagination={{
          page: 1,
          totalData: 30,
          onSelectPage: () => {},
          limit: 5,
          onSelectLimit: () => {},
        }}
        handleSortTable={handleSortTable}
      />

      <h3>Sort By: {sortBy}</h3>
      <h3>Sort Order: {sortOrder}</h3>
    </Wrapper>
  );
};

const Default = () => {
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleSortTable = (column) => {
    const findColumnTypeSort = columnsDefault.find(
      (item) => item.sortBy === column.sortBy
    );

    if (findColumnTypeSort) {
      setSortBy(column.sortBy);
      if (column.sortBy === sortBy) {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortOrder(() => 'desc');
      }
    }
  };

  const columns = columnsDefault.map((col) =>
    col.sortBy === sortBy ? { ...col, sortOrder } : col
  );

  return (
    <Wrapper>
      <Table
        id="default"
        columns={columns}
        data={dataDefaultMap}
        emptyDataState={{
          image: true,
          headerText: 'Data Tidak Ditemukan',
          bodyText:
            'Saat ini Anda belum memiliki aktivitas. Silakan tambah aktivitas melalui tombol berikut.',
        }}
        pagination={{
          page: 1,
          totalData: 30,
          onSelectPage: () => {},
          limit: 5,
          onSelectLimit: () => {},
        }}
        handleSortTable={handleSortTable}
      />

      <h3>Sort By: {sortBy}</h3>
      <h3>Sort Order: {sortOrder}</h3>
    </Wrapper>
  );
};

export default {
  Default,
  'Header Group': (
    <Wrapper>
      <Table
        id="default"
        columns={columnsGroup}
        data={dataGroupMap}
        emptyDataState={{
          image: true,
          headerText: 'Data Tidak Ditemukan',
          bodyText:
            'Saat ini Anda belum memiliki aktivitas. Silakan tambah aktivitas melalui tombol berikut.',
        }}
        pagination={{
          page: 1,
          totalData: 30,
          onSelectPage: () => {},
          limit: 5,
          onSelectLimit: () => {},
        }}
      />
    </Wrapper>
  ),
  'No Data': (
    <Wrapper>
      <Table
        columns={columnsDefault}
        data={[]}
        emptyDataState={{
          image: true,
          headerText: 'Data Tidak Ditemukan',
          bodyText:
            'Saat ini Anda belum memiliki aktivitas. Silakan tambah aktivitas melalui tombol berikut.',
          addButton: { label: 'Tambah Aktivitas', onClick: () => {} },
          bodyTextWidth: '300px',
        }}
        pagination={{
          page: 1,
          totalData: 30,
          onSelectPage: () => {},
          limit: 5,
          onSelectLimit: () => {},
        }}
      />
    </Wrapper>
  ),
  'With Actions': WithActions,
};
