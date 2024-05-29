import React, { useState } from 'react';
import { Pagination } from '../components';

const defaultPagination = () => {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalData={100} onSelectPage={setPage} />;
};

const inputPagination = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      page={page}
      totalData={100}
      onSelectPage={setPage}
      paginationType="input"
    />
  );
};

const inputCenterPagination = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      page={page}
      totalData={100}
      onSelectPage={setPage}
      paginationType="inputCenter"
      possition="center"
      isShowIndicator={false}
    />
  );
};

const inputIndicatorPagination = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  return (
    <Pagination
      page={page}
      totalData={100}
      onSelectPage={setPage}
      indicatorType="input"
      limit={limit}
      onSelectLimit={setLimit}
    />
  );
};

export default {
  props: <Pagination page={1} totalData={100} />,
  default: defaultPagination,
  inputPagination,
  inputCenterPagination,
  inputIndicatorPagination,
};
