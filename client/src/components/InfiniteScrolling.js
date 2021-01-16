import { useEffect, useMemo } from 'react';
import { get, setWith, clone, uniqBy } from "lodash";

const InfiniteScrolling = ({ data, dataKey, fetchMore, variables, count, children }) => {
  const handleScroll = useMemo(
    () => async () => {
      const loadMore = () => {
        fetchMore({
            variables: {...variables, skip: data.length},
            updateQuery: (prev, { fetchMoreResult }) => {
                const prevPosts = get(prev, dataKey); //const posts = prev.getFollowedPots.posts
                const newPosts = get(fetchMoreResult, dataKey);

                if(!fetchMoreResult) return prev;
                // clone prev result and merge new and old posts
                let r = setWith(clone(prev), dataKey, uniqBy([...prevPosts, ...newPosts], "id"), clone);
                return r
            }
        })
      };

    //   meaning all the posts have been loaded
    // data is the accumulated number of posts we have loaded on each (fetchMore)
    // count is the total number we have to fetch from the db
      if (data.length >= count) {
        window.removeEventListener('scroll', handleScroll);
        return;
      }

      // determine when the page is scrolled near the bottom (-300px)
      const scrollHeight = document.documentElement.scrollHeight; //the entire document height
      const windowHeight = window.innerHeight; // the opening browser window height
      const scrolledFromTop = document.documentElement.scrollTop;

      const scrollPos = windowHeight + scrolledFromTop;
      const scrolled = (scrollHeight - 300 >= scrollPos) / scrollHeight == 0;

      if (scrolled) {
        window.removeEventListener('scroll', handleScroll)
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


export default InfiniteScrolling;