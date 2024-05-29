const { useState, useEffect, useRef } = require('react');
const { useScrollToEnd } = require('./useScrollToEnd');

export const useLoadMore = ({ fetchApi, query }) => {
  const containerRef = useRef(null);
  const isBottom = useScrollToEnd(containerRef);

  const [page, setPage] = useState(1);

  const { data, refetch, fetchNextPage, remove } = fetchApi(page, query);

  const resetPage = () => {
    setPage(1);
    remove();
  };

  useEffect(() => {
    if (isBottom) {
      fetchNextPage();
      setPage(page + 1);
    }
  }, [isBottom]);

  return { data, containerRef, resetPage, refetch };
};
