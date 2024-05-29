import React from 'react';
import { NoData, Button, Typography } from '../components';

export default {
  default: (
    <NoData
      image
      headerText="Data Tidak Ditemukan"
      bodyText="Saat ini Anda belum memiliki aktivitas. Silakan tambah aktivitas melalui tombol berikut."
      bodyTextWidth="400px"
    />
  ),
  'With Add Button': (
    <NoData
      image
      headerText="Data Tidak Ditemukan"
      bodyText="Saat ini Anda belum memiliki aktivitas. Silakan tambah aktivitas melalui tombol berikut."
      bodyTextWidth="400px"
      addButton={{
        label: 'Tambah Aktivitas Baru',
        onClick: () => {},
      }}
    />
  ),
  'With Custom Body Text': (
    <NoData
      image
      headerText="Data Tidak Ditemukan"
      bodyText={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            justifyContent: 'center',
          }}
        >
          <Typography minWidth="100%" style={{ display: 'flex', gap: '4px' }}>
            Saat ini Anda belum memiliki aktivitas. Klik
            <span>
              <Button variant="link" size="small" color="neutral90">
                Link
              </Button>
            </span>
            untuk melihat contoh aktivitas.
          </Typography>
          <Typography align="center">
            Silakan tambah aktivitas melalui tombol berikut.
          </Typography>
        </div>
      }
      addButton={{
        label: 'Tambah Aktivitas Baru',
        onClick: () => {},
      }}
    />
  ),
};
