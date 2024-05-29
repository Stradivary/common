import React, { useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Checkpoints } from '../../../utils';
import { Table } from '../../Table';
import { ColumnsTabCart } from './constant';
import { Container } from './style';

export const TabCart = ({ data, picOrderId, projectName, projectId }) => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const extendedParams =
    projectName && projectId
      ? `?projectName=${projectName}&projectId=${projectId}`
      : '';
  const handleChangePage = (value) => {
    setPagination((state) => ({ ...state, page: value }));
  };

  const handleChangeLimit = (value) => {
    setPagination((state) => ({ ...state, limit: value }));
  };
  const listedData = [];
  data.forEach((item, index) => {
    if (pagination.page > 1) {
      if (
        index > pagination.limit * (pagination.page - 1) - 1 &&
        index < pagination.page * pagination.limit
      ) {
        listedData.push(item);
      }
    } else if (index < pagination.page * pagination.limit)
      listedData.push(item);
  });

  const dataTable = listedData.map((item, index) => [
    `${index + 1}.`,
    {
      type: 'subtitleWithLink',
      title: item.offer?.map((offer) => offer.offerName),
      to: `${Checkpoints.cartDetail
        .replace(':picOrderId', picOrderId)
        .replace(':orderId', item.orderId)}${extendedParams}`,
      subtitle: item.orderId,
    },
    {
      label: get(item, 'offer[0].bonus', [])?.length || 0,
      textStyle: { textAlign: 'center', marginRight: '2.5rem' },
    },
    {
      label: item.bundleQty,
      textStyle: { textAlign: 'center', marginRight: '2.5rem' },
    },
    item.status
      ? {
          type: 'tag',
          value: item.status,
          color: 'primary',
          textStyle: { textAlign: 'center' },
        }
      : { label: '-', textStyle: { textAlign: 'center' } },
  ]);

  return (
    <Container id="pic-order-cart">
      <Table
        id="tbl-pic-order-cart"
        columns={ColumnsTabCart}
        data={dataTable}
        emptyDataState={{
          image: true,
          headerText: 'Data Keranjang Tidak Tersedia',
          bodyText: 'Order ini tidak mempunyai data keranjang yang terdaftar.',
        }}
        pagination={{
          page: pagination.page,
          onSelectPage: handleChangePage,
          totalData: data.length,
          limit: pagination.limit,
          onSelectLimit: handleChangeLimit,
          indicatorType: 'input',
        }}
        freezeColumn={false}
      />
    </Container>
  );
};
TabCart.defaultProps = {
  data: [],
  picOrderId: '',
  projectName: false,
  projectId: '',
};
TabCart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      bundleName: PropTypes.string,
      offer: PropTypes.arrayOf(
        PropTypes.shape({
          bonus: PropTypes.arrayOf(PropTypes.shape({})),
        })
      ),
      bundleQty: PropTypes.number,
      orderId: PropTypes.string,
    })
  ),
  picOrderId: PropTypes.string,
  projectName: PropTypes.string,
  projectId: PropTypes.string,
};
