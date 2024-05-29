const { useState, useEffect } = require('react');

export const useScrollToEnd = (containerRef) => {
  const [isEndReached, setIsEndReached] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setIsEndReached(true);
      } else {
        setIsEndReached(false);
      }
    };

    const container = containerRef.current;
    if (!container) return () => {};
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  return isEndReached;
};
