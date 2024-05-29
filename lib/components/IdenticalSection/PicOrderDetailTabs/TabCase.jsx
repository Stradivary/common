import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { get, isEmpty, pickBy } from 'lodash';
import { PageContext } from '../../../context';
import { ActionButton } from '../../ActionButton';
import { SimpleSearch } from '../../SimpleSearch';
import { Table } from '../../Table';
import { Checkpoints } from '../../../utils';
import { useGetOrderCase } from '../../../hooks/services';
import {
  CASE_DROPDOWN_OPTIONS,
  HeaderTableTabCase,
  FilterLabelCase,
} from './constant';
import { ActionButtonWrapper, Container, ToolbarWrapper } from './style';

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'IN PROGRESS':
      return 'orange';
    case 'CLOSED':
      return 'neutral60';
    case 'CANCELLED':
      return 'secondary';
    default:
      return 'primary';
  }
};
export const TabCase = (props) => {
  const { children, picOrderId } = props;
  const [paramFilter, setFilter] = useState({});
  const [resetSearch, setResetSearch] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const [sort, setSort] = useState({
    sortBy: '',
    sortOrder: '',
    sortLabel: '',
  });
  const [sortHeader, setSortHeader] = useState({
    sortBy: '',
    sortOrder: '',
  });

  const [paginationState, setPaginationState] = useState({
    page: 1,
    limit: 10,
  });
  const [drawerState, setDrawerState] = useState({
    openDrawer: false,
    secondDrawer: false,
    dataSecondDrawer: {},
    totalFilter: 0,
    chipsData: [],
  });

  const { data: responseCases, isFetching } = useGetOrderCase(
    pickBy({
      orderId: picOrderId,
      page: paginationState.page,
      pageSize: paginationState.limit,
      ...paramFilter,
      ...(!isEmpty(sortHeader.sortBy) && {
        sortOrder: sortHeader.sortOrder,
        sortBy: sortHeader.sortBy,
      }),
      ...(!isEmpty(sort.sortBy) && {
        sortOrder: sort.sortOrder,
        sortBy: sort.sortBy,
      }),
    })
  );
  const casesData = get(responseCases, 'data.data', []);
  const recordTotal = get(responseCases, 'data.recordTotal', 0);

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    getValues,
    reset,
    resetField,
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      kipId: '',
      caseID: '',
      projectId: '',
      caseOwner: '',
      status: '',
      createdAt: '',
      closedAt: '',
    },
  });

  const columns = HeaderTableTabCase.map((col) =>
    col.param === sortHeader.sortBy
      ? { ...col, sortOrder: sortHeader?.sortOrder }
      : col
  );

  const handleSortTable = (column) => {
    const findColumnTypeSort = columns.find(
      (item) => item.param === column.param
    );
    setSort({ sortBy: '', sortOrder: '', sortLabel: '' });

    if (findColumnTypeSort) {
      if (column.param === sortHeader.sortBy) {
        setSortHeader((prev) => ({
          ...prev,
          sortBy: column.param,
          sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
        }));
      } else {
        setSortHeader((prev) => ({
          ...prev,
          sortBy: column.param,
          sortOrder: 'asc',
        }));
      }
    }
  };
  const data =
    casesData?.length > 0 &&
    casesData.map((item, index) => [
      paginationState.limit * (paginationState.page - 1) + index + 1,
      item.case_id
        ? {
            type: 'link',
            to: '#',
            value: item.case_id,
          }
        : '-',
      item.kip?.project_id
        ? {
            type: 'link',
            to: Checkpoints.projectDetails.replace(':id', item.project_id),
            value: item.kip.project_id,
          }
        : '-',
      item.kip?.kip_id || '-',
      item.case_owner || '-',
      {
        type: 'tag',
        color: getStatusColor(item.status),
        value: item.status,
      },
      {
        type: 'subtitle',
        title: moment(item.created_date).locale('id').format('MMM DD, YYYY'),
        subtitle: moment(item.created_date).format('HH:mm:ss'),
      },
      item?.closed_date
        ? {
            type: 'subtitle',
            title: moment(item.closed_date).locale('id').format('MMM DD, YYYY'),
            subtitle: moment(item.closed_date).format('HH:mm:ss'),
          }
        : '-',
    ]);

  const handleSearch = (params) => {
    const {
      keyItem: { value },
      keyword,
    } = params;
    setFilter({ [value]: keyword });
    setIsSearch(true);
    reset();
    setDrawerState({
      chipsData: [
        {
          id: value,
          label: FilterLabelCase[value],
          closeButton: true,
        },
      ],
    });
  };

  const handleChangeSort = (key, order, label) => {
    setSort({
      sortBy: key,
      sortOrder: order,
      sortLabel: label,
    });
  };

  const sortOptions = [
    {
      label: 'Creation Date (Terlama)',
      onClick: () => {
        handleChangeSort('createdDate', 'asc', 'Creation Date (Terlama)');
      },
    },
    {
      label: 'Creation Date (Terbaru)',
      onClick: () => {
        handleChangeSort('createdDate', 'desc', 'Creation Date (Terbaru)');
      },
    },
  ];

  const handleToggleDrawer = () => {
    setDrawerState((state) => ({
      ...state,
      openDrawer: !drawerState.openDrawer,
    }));
  };

  const handleToggleSecondDrawer = (dataSecondDrawer) => {
    setDrawerState((state) => ({
      ...state,
      secondDrawer: !drawerState.secondDrawer,
      dataSecondDrawer,
    }));
  };

  const handleSetPage = (value) => {
    setPaginationState((state) => ({ ...state, page: value }));
  };

  const handleSetLimit = (value) => {
    setPaginationState((state) => ({ ...state, limit: value }));
  };

  // this function is only used for tab case filter drawer on corporate service
  const handleDrawerState = (selectedDrawer, dataDrawer = null) => {
    setDrawerState((prevState) => ({
      ...prevState,
      [selectedDrawer]: !prevState[selectedDrawer],
      dataSecondDrawer: dataDrawer || prevState.dataSecondDrawer,
    }));
  };

  const convertToSingleDate = (rangeDate) => {
    if (rangeDate) {
      const splittedDate = rangeDate.split(' - ');
      return {
        start: moment(splittedDate[0], 'DD/MM/YYYY').format('YYYY-MM-DD'),
        end: moment(splittedDate[1], 'DD/MM/YYYY').format('YYYY-MM-DD'),
      };
    }
    return undefined;
  };

  const onSubmit = (dataSubmit) => {
    if (isSearch) {
      setResetSearch(true);
      setTimeout(() => {
        setResetSearch(false);
      }, 500);
    }
    const { createdAt, closedAt } = dataSubmit;
    const chipsData = [];
    const createdDateStart = convertToSingleDate(createdAt)?.start;
    const createdDateEnd = convertToSingleDate(createdAt)?.end;
    const closedDateStart = convertToSingleDate(closedAt)?.start;
    const closedDateEnd = convertToSingleDate(closedAt)?.end;
    let restFilterParam = {};
    Object.keys(dataSubmit).forEach((key) => {
      if (dataSubmit[key]) {
        restFilterParam = {
          ...restFilterParam,
          [key]: dataSubmit[key],
        };
        chipsData.push({
          id: key,
          label: FilterLabelCase[key],
          closeButton: true,
        });
      }
    });
    restFilterParam.createdAt = null;
    restFilterParam.closedAt = null;
    setDrawerState({
      ...dataSubmit,
      totalFilter: Object.values(dataSubmit).filter(
        (item) =>
          (typeof item === 'string' && item) ||
          (Array.isArray(item) && item.length)
      ).length,
      chipsData,
    });
    setFilter({
      createdDateStart,
      createdDateEnd,
      closedDateStart,
      closedDateEnd,
      ...restFilterParam,
    });
    handleToggleDrawer();
  };

  const handleReset = () => {
    setFilter({
      page: paginationState.page,
      pageSize: paginationState.limit,
    });
    reset();
    setDrawerState((state) => ({
      ...state,
      totalFilter: 0,
    }));
    handleToggleDrawer();

    setSort({
      sortBy: '',
      sortOrder: '',
      sortLabel: '',
    });

    setSortHeader({
      sortBy: '',
      sortOrder: '',
    });
  };

  const handleResetSecondDrawer = (field) => () => {
    resetField(field);
    handleToggleSecondDrawer();
  };

  const handleDeleteChips = (item) => () => {
    let dateReset = {};
    if (item.id === 'createdAt') {
      dateReset = {
        createdDateStart: '',
        createdDateEnd: '',
      };
    }
    if (item.id === 'closedAt') {
      dateReset = {
        ...dateReset,
        closedDateStart: '',
        closedDateEnd: '',
      };
    }
    resetField(item.id, '');
    setFilter({
      ...paramFilter,
      [item.id]: '',
      ...dateReset,
    });
    const chipsData = drawerState?.chipsData?.filter(
      (chips) => chips.id !== item.id
    );
    setDrawerState((prevState) => ({
      ...prevState,
      [item.id]: '',
      totalFilter: chipsData.length,
      chipsData,
    }));
  };

  const handleResetDrawerFilter = (e) => {
    reset();
    e.preventDefault();
    setFilter({
      page: paginationState.page,
      pageSize: paginationState.limit,
    });
    setDrawerState((prevState) => ({
      ...prevState,
      openDrawer: false,
      totalFilter: 0,
      chipsData: [],
    }));

    if (isSearch) {
      setResetSearch(true);
      setTimeout(() => {
        setResetSearch(false);
      }, 2000);
    }
  };

  const actions = {
    handleToggleDrawer,
    handleToggleSecondDrawer,
    handleSubmit,
    onSubmit,
    handleReset,
    handleResetSecondDrawer,
    setValue,
    handleDrawerState,
  };
  const dataContext = {
    register,
    control,
    isDirty,
    getValues,
    drawerState,
    isValid,
  };

  return (
    <PageContext actions={actions} data={dataContext}>
      <Container id="pic-order-case">
        <ToolbarWrapper id="toolbar-pic-order-case">
          <SimpleSearch
            id="pic-order-case"
            options={CASE_DROPDOWN_OPTIONS}
            onSubmit={handleSearch}
            isReset={resetSearch}
          />
          <ActionButtonWrapper id="action-pic-order-case">
            <ActionButton
              id="dropdown-pic-order-case"
              startIcon="Sorting"
              variant="dropdown"
              text={sort?.sortLabel || 'Urutkan'}
              options={sortOptions}
            />
            <ActionButton
              id="filter-pic-order-case"
              variant="filter"
              countFilters={drawerState.totalFilter}
              onClick={() => {
                handleToggleDrawer();
              }}
            />
          </ActionButtonWrapper>
        </ToolbarWrapper>
        <Table
          id="tbl-pic-order-case"
          columns={columns}
          data={data || []}
          pagination={{
            page: paginationState.page,
            onSelectPage: handleSetPage,
            totalData: recordTotal,
            limit: paginationState.limit,
            onSelectLimit: handleSetLimit,
            indicatorType: 'input',
          }}
          emptyDataState={{
            image: true,
            headerText: 'Data Case Tidak Tersedia',
            bodyText: 'Order ini tidak mempunyai data case yang terdaftar.',
          }}
          isLoading={isFetching}
          handleSortTable={handleSortTable}
          chips={{
            data: drawerState.chipsData,
            onDelete: handleDeleteChips,
            reset: handleResetDrawerFilter,
          }}
        />
        {children}
      </Container>
    </PageContext>
  );
};
TabCase.defaultProps = {
  children: null,
  picOrderId: '',
};
TabCase.propTypes = {
  children: PropTypes.node,
  picOrderId: PropTypes.string,
};
