import { useEffect, useState } from 'react';
import { get, pickBy, isEmpty } from 'lodash';
import { updatePage } from '../../utils';

const useDrawer = (resetField) => {
  const [drawerState, setDrawerState] = useState({
    openDrawer: false,
    openSecondDrawer: false,
    dataSecondDrawer: {},
    totalFilter: 0,
  });

  const handleToggleDrawer = () => {
    setDrawerState((state) => ({
      ...state,
      openDrawer: !drawerState.openDrawer,
    }));
  };

  const handleToggleSecondDrawer = (dataSecondDrawer) => {
    setDrawerState((state) => ({
      ...state,
      openSecondDrawer: !drawerState.openSecondDrawer,
      dataSecondDrawer,
    }));
  };

  const handleResetDrawer = () => {
    setDrawerState((state) => ({
      ...state,
      totalFilter: 0,
    }));
  };

  const handleResetSecondDrawer = (field) => () => {
    resetField(field);
    handleToggleSecondDrawer();
  };

  const handleDecrementTotalFilter = () => {
    setDrawerState((state) => ({
      ...state,
      totalFilter: state.totalFilter - 1,
    }));
  };

  const handleTotalFilter = (value) => {
    const totalFilter = Object.values(value).filter(
      (item) =>
        (typeof item === 'string' && item) ||
        (Array.isArray(item) && item.length)
    ).length;

    setDrawerState((state) => ({
      ...state,
      totalFilter,
    }));
  };

  return {
    drawerState,
    handleToggleDrawer,
    handleToggleSecondDrawer,
    handleResetDrawer,
    handleResetSecondDrawer,
    handleDecrementTotalFilter,
    handleTotalFilter,
  };
};
// create paginationHooks
const usePagination = (paginationOptions, searchOptions) => {
  const [paginationState, setPaginationState] = useState({
    page: 1,
    limit: paginationOptions?.limit || 5,
  });

  const handleSetPage = (value) => {
    setPaginationState((state) => ({ ...state, page: value }));
  };

  const handleSetLimit = (value) => {
    setPaginationState(() => ({
      page: updatePage(paginationState.page, paginationState.limit, value),
      limit: value,
    }));
  };

  // add reset pagination hooks
  const handleResetPagination = () => {
    setPaginationState({ page: 1, limit: paginationOptions?.limit || 5 });
  };

  // add reset pagination hooks when search
  useEffect(() => {
    handleResetPagination();
  }, [searchOptions]);

  return {
    paginationState,
    handleSetPage,
    handleSetLimit,
    handleResetPagination,
  };
};

// create search hooks
const useSearch = () => {
  const [searchOptions, setSearchOptions] = useState({
    key: '',
    keyword: '',
  });

  const handleSearch = (value) => {
    setSearchOptions({ key: value.keyItem.value, keyword: value.keyword });
  };

  // add reset search hooks
  const handleResetSearch = () => {
    setSearchOptions({ key: '', keyword: '' });
  };

  return {
    searchOptions,
    handleSearch,
    handleResetSearch,
    isResetSearch: isEmpty(searchOptions.keyword),
  };
};

// create submit state hooks
const useSubmitState = () => {
  const [submitState, setSubmitState] = useState(false);

  const handleSetSubmitState = () => {
    setSubmitState(!submitState);
  };

  return {
    submitState,
    handleSetSubmitState,
  };
};

// create custom hooks for handle sort table
const useTableSort = () => {
  const [sort, setSort] = useState({
    label: '',
    key: '',
    order: '',
  });

  const [sortHeader, setSortHeader] = useState({
    key: '',
    value: '',
    isAbbreviation: false,
  });

  const handleSortHeader = (type, isAbbreviation = false) => {
    if (sortHeader.key === type) {
      if (sortHeader.value === 'asc') {
        setSortHeader({ ...sortHeader, value: 'desc', isAbbreviation });
      } else {
        setSortHeader({ ...sortHeader, value: 'asc', isAbbreviation });
      }
    } else {
      setSortHeader({ key: type, value: 'asc', isAbbreviation });
    }
  };

  const handleChangeSort = (label, key, order) => {
    handleSortHeader('');
    setSort({ label, key, order });
  };

  // add column sort hooks
  const handleSortTable = (column, isAbbreviation) => {
    handleSortHeader(column.param, isAbbreviation);
  };

  const sortOptions = [
    {
      label: 'Creation Date (Terlama)',
      onClick: () => {
        handleChangeSort('Creation Date (Terlama)', 'createdAt', 'asc');
      },
    },
    {
      label: 'Creation Date (Terbaru)',
      onClick: () => {
        handleChangeSort('Creation Date (Terbaru)', 'createdAt', 'desc');
      },
    },
  ];

  return {
    sort,
    sortHeader,
    handleChangeSort,
    handleSortHeader,
    handleSortTable,
    sortOptions,
  };
};

// create hooks to handle params chips
const useChips = ({
  resetField,
  handleDecrementTotalFilter,
  handleResetSearch,
  handleSetSubmitState,
  params,
  labelFilter,
}) => {
  const filterChipLabel = new Set(Object.keys(params));

  const allowedTypesPredicate = (value) => {
    if (typeof value === 'string') {
      return value.trim() !== ''; // Exclude empty strings
    }
    return typeof value === 'number' || typeof value === 'boolean';
  };

  const filterChipValues =
    Object.keys(pickBy(params, allowedTypesPredicate))
      ?.filter((key) => filterChipLabel.has(key))
      ?.map((key) => ({
        id: key,
        label: labelFilter[key],
        closeButton: true,
      }))
      .filter((it) => it.label) || [];

  const handleDeleteChips = (item) => () => {
    resetField(item?.id);
    handleDecrementTotalFilter();
    handleSetSubmitState();
    handleResetSearch();
  };

  return {
    handleDeleteChips,
    filterChipValues,
  };
};

// create hooks to handle table data
const useFetchTable = ({
  paginationState,
  sort,
  sortHeader,
  id,
  drawerState,
  searchOptions,
  statusFilter,
  fetchData,
  columnTable,
  mockData,
  dataMapper,
  dataKey,
  totalKey,
  dataRecord,
  defaultQuery,
}) => {
  const generateParams = () => {
    let params = {
      page: paginationState.page,
      pageSize: paginationState.limit,
      sortBy: sort.key,
      sortOrder: sort.order,
      ...(sortHeader.key !== '' && {
        sortBy: sortHeader.key,
        sortOrder: sortHeader.value,
      }),
      ...(drawerState.totalFilter > 0 && {
        ...statusFilter,
      }),
      ...(drawerState.totalFilter === 0 &&
        searchOptions.keyword !== '' && {
          [searchOptions.key]: searchOptions.keyword,
        }),
    };

    if (defaultQuery) {
      Object.keys(defaultQuery).forEach((key) => {
        if (defaultQuery[key]) {
          params[key] = defaultQuery[key];
        }
      });
    }

    if (sortHeader?.isAbbreviation) {
      params = {
        ...params,
        ...(sortHeader.key !== '' && {
          sortBy: sortHeader.key,
          sortOrder: sortHeader.value === 'asc' ? 'DESCENDING' : 'ASCENDING',
        }),
      };
    }

    return params;
  };

  const { data, isFetching, error, refetch } = fetchData(
    id,
    pickBy(generateParams())
  );

  const columnsortBy = columnTable.map((col) =>
    col.param === sortHeader.key ? { ...col, sortOrder: sortHeader.value } : col
  );

  const responeListData = get(data, dataKey, []);
  const totalData = get(data, totalKey, 0);
  const rawData = get(data, dataRecord, {});

  return {
    dataTable: responeListData.map(dataMapper),
    mockData: mockData(paginationState.page, paginationState.limit).map(
      dataMapper
    ),
    isFetching,
    error,
    totalData,
    rawData,
    columnsortBy,
    params: generateParams(),
    refetch,
  };
};

/**
 * Custom hook for managing table data and functionality.
 *
 * @param {Object} options - The options for configuring the table.
 * @param {Function} options.resetField - The function to reset the field.
 * @param {string} options.id - it to query.
 * @param {string} options.statusFilter - The status filter for the table.
 * @param {Function} options.fetchData - The function to fetch data for the table.
 * @param {string} options.dataKey - The key for accessing data in the table.
 * @param {Array} options.columnTable - The columns of the table.
 * @param {Function} options.mockFetchData - The function to mock fetching data for the table.
 * @param {string} options.totalKey - The key for accessing total data count in the table.
 * @param {Function} options.dataMapper - The function to map data in the table.
 * @param {Function} options.reset - The function to reset the table.
 * @param {boolean} options.isMock - Flag indicating whether to use mock data.
 * @param {Object} options.defaultQuery - The default query for the table.
 * @param {Object} options.paginationOptions - For custom initial pagination options.
 * @returns {Object} - The table data and functionality.
 */
export const useTable = ({
  resetField,
  id,
  statusFilter,
  fetchData,
  dataKey,
  columnTable,
  mockFetchData,
  totalKey,
  dataMapper,
  reset,
  isMock = false,
  defaultQuery,
  labelFilter,
  dataRecord,
  paginationOptions,
}) => {
  const {
    drawerState,
    handleToggleDrawer,
    handleToggleSecondDrawer,
    handleResetDrawer,
    handleResetSecondDrawer,
    handleDecrementTotalFilter,
    handleTotalFilter,
  } = useDrawer(resetField);

  const { submitState, handleSetSubmitState } = useSubmitState();
  const { handleSearch, searchOptions, handleResetSearch, isResetSearch } =
    useSearch();
  const { paginationState, handleSetPage, handleSetLimit } = usePagination(
    paginationOptions,
    searchOptions
  );
  const { sort, sortHeader, handleSortTable, sortOptions, handleChangeSort } =
    useTableSort();
  const {
    dataTable,
    isFetching,
    error,
    totalData,
    columnsortBy,
    mockData,
    refetch,
    params,
    rawData,
  } = useFetchTable({
    paginationState,
    sort,
    sortHeader,
    submitState,
    id,
    drawerState,
    searchOptions,
    statusFilter,
    columnTable,
    mockData: mockFetchData,
    dataKey,
    fetchData,
    totalKey,
    dataRecord,
    defaultQuery,
    dataMapper: (item, index) => {
      const mapper = dataMapper(item, index);

      // Add table number;
      mapper.unshift(
        `${(paginationState.page - 1) * paginationState.limit + index + 1}`
      );

      return mapper;
    },
  });

  const { handleDeleteChips, filterChipValues } = useChips({
    resetField,
    handleResetSearch,
    searchOptions,
    handleDecrementTotalFilter,
    handleSetSubmitState,
    labelFilter,
    params,
  });

  const onSubmitSimpleSearch = (value) => {
    handleResetDrawer();
    handleSearch(value);
  };

  const handleReset = () => {
    reset();
    handleResetDrawer();
    handleSetSubmitState();
    handleResetSearch();
  };

  const onSubmit = (dataSubmit) => {
    handleTotalFilter(dataSubmit);
    handleResetSearch();
    handleSetSubmitState();
    handleToggleDrawer();
  };

  return {
    dataTable,
    isFetching,
    error,
    totalData,
    columnsortBy,
    handleToggleDrawer,
    handleToggleSecondDrawer,
    handleResetDrawer,
    handleResetSecondDrawer,
    handleSetSubmitState,
    handleResetSearch,
    handleDeleteChips,
    filterChipValues,
    handleSortTable,
    handleSetPage,
    handleSetLimit,
    handleTotalFilter,
    sort,
    sortOptions,
    handleChangeSort,
    mockData,
    handleSearch,
    drawerState,
    paginationState,
    onSubmitSimpleSearch,
    handleReset,
    onSubmit,
    data: isMock ? mockData : dataTable,
    refetch,
    isResetSearch,
    rawData,
  };
};
