import React from 'react';
import { Notification } from '../components/Notification';

const handleClickDetail = () => {
  // GO TO DETAIL
};

const notifData = [
  {
    text: 'Mohon maaf, saat ini menu Dashboard sedang dalam pemeliharaan sistem untuk perbaikan dan peningkatan kinerja. Silakan coba beberapa saat lagi.',
    type: 'General',
    date: '2023-12-19T03:12:08.983Z',
    isRead: true,
  },
  {
    text: 'Masa kontrak pada ID AG-3103055 akan berakhir pada tanggal 4 September 2023. Harap segera periksa dan perbarui kontrak jika diperlukan.',
    type: 'Warning',
    date: '2023-12-19T03:12:08.983Z',
    isRead: false,
  },
  {
    text: 'Anda memiliki 12 tiket yang perlu diselesaikan.',
    type: 'Agreement',
    date: '2023-12-19T03:12:08.983Z',
    isRead: false,
  },
];

const ContainerNotification = {
  default: (
    <div>
      <Notification data={notifData} onClick={handleClickDetail} />
    </div>
  ),
};

export default ContainerNotification;
