import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { get, uniqBy, setWith, clone } from 'lodash';

/**
 * Component that adds Infinite scroll functionality to UI
 */
const InfiniteScrolling = ({ data, dataKey, fetchMore, variables, count, children }) => {
  const handleScroll = useMemo(
    () => async () => {
      const loadMore = () => {
        alert('HIT PAGE BOTTOM')
      };

    //   const windowHeight = window.innerHeight;
    //   const scrollTop = document.documentElement.scrollTop;
    //   const offsetHeight = document.documentElement.offsetHeight;
    //   const scrolled = windowHeight + scrollTop > offsetHeight - offsetHeight / 3;

      const scrolled = window.innerHeight + window.pageYOffset >= document.body.offsetHeight

      // Stop event listener if all the data has been loaded
      if (data.length >= count) {
        window.removeEventListener('scroll', handleScroll);
        return;
      }

      // Load more data if user has scrolled to bottom and if there's still data in db to display
      if (scrolled) {
        window.removeEventListener('scroll', handleScroll);
        loadMore();
      }
    },
    [count, data.length, dataKey, fetchMore, variables]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // return () => window.removeEventListener('scroll', handleScroll);
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