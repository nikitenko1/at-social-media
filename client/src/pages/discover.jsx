import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDiscoverPosts,
  DISCOVER_TYPES,
} from '../redux/actions/discoverAction';
import LoadIcon from '../images/loading.gif';
import PostThumb from '../components/PostThumb';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { getDataAPI } from '../utils/fetchData';

const Discover = () => {
  const [load, setLoad] = useState(false);
  const { auth, discover } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [auth.token, dispatch, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `post_discover?limit=${discover.page * 3}`,
      auth.token
    );
    dispatch({
      type: DISCOVER_TYPES.UPDATE_POST,
      payload: res.data,
    });
    setLoad(false);
  };
  return (
    <div>
      {discover.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-5" />
      ) : (
        <PostThumb posts={discover.posts} result={discover.result} />
      )}

      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      {!discover.loading && (
        <LoadMoreBtn
          result={discover.result}
          page={discover.page}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default Discover;
