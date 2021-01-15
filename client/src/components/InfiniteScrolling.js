import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { get, uniqBy, setWith, clone } from 'lodash';

const InfiniteScrolling = ({ data, dataKey, fetchMore, variables, count, children }) => {
  const handleScroll = useMemo(
    () => async () => {
      const loadMore = () => {
        alert('HIT PAGE BOTTOM')
      };


      if (data.length >= count) {
        window.removeEventListener('scroll', handleScroll);
        return;
      }

      // determine when the page is scrolled near the bottom (-300px)
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPos = window.innerHeight + document.documentElement.scrollTop;
      const scrolled = (scrollHeight - 300 >= scrollPos) / scrollHeight == 0;

      if (scrolled) {
        // window.removeEventListener('scroll', handleScroll)
        loadMore();
      }
    },
    [count, data.length, dataKey, fetchMore, variables]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return children(data);
};

InfiniteScrolling.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  fetchMore: PropTypes.func.isRequired,
  variables: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
};

export default InfiniteScrolling;