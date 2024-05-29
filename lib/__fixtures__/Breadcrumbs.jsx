import React from 'react';
import { Breadcrumbs } from '../components';

const dataCommonUsed = [
  {
    id: '1',
    label: 'Breadcrumb',
    path: '/1',
    iconName: 'OutlinedSettings',
  },
  {
    id: '2',
    label: 'Data 2',
    path: '/2',
  },
  {
    id: '3',
    label: 'Data 3',
    path: '/service1/list',
  },
];

const dataMoreThan6 = [
  {
    id: '1',
    label: 'Breadcrumb',
    path: '/1',
  },
  {
    id: '2',
    label: 'Data 2',
    path: '/2',
  },
  {
    id: '3',
    label: 'Data 3',
    path: '/3',
  },
  {
    id: '4',
    label: 'Data 4',
    path: '/4',
  },
  {
    id: '5',
    label: 'Data 5',
    path: '5',
  },
  {
    id: '6',
    label: 'Data 6',
    path: '6',
  },
  {
    id: '7',
    label: 'Data 7',
    path: '/service1/list',
  },
];

const dataLessThan6 = [
  {
    id: '1',
    label: 'Breadcrumb',
    path: '/1',
  },
  {
    id: '2',
    label: 'Data 2',
    path: '/2',
  },
  {
    id: '3',
    label: 'Data 3',
    path: '/3',
  },
  {
    id: '4',
    label: 'Data 4',
    path: '/4',
  },
  {
    id: '5',
    label: 'Data 5',
    path: '/service1/list',
  },
];

export default {
  '3 Data': (
    <div style={{ width: '100%', background: 'orange' }}>
      <Breadcrumbs id="Cosmos3Data" data={dataCommonUsed} />
    </div>
  ),
  '5 Data': (
    <div style={{ width: '100%', background: 'orange' }}>
      <Breadcrumbs id="Cosmos5Data" data={dataLessThan6} />
    </div>
  ),
  '12 Data': (
    <div style={{ width: '100%', background: 'orange' }}>
      <Breadcrumbs id="Cosmos12Data" data={dataMoreThan6} />
    </div>
  ),
};
