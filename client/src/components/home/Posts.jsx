import React, { useState } from 'react';
import PostCard from '../PostCard';
import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../../components/LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { useSelector, useDispatch } from 'react-redux';
import { POST_TYPES } from '../../redux/actions/postAction';

const Posts = ({ homePosts }) => {
  const [load, setLoad] = useState(false);
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `posts?limit=${homePosts.page * 3}`,
      auth.token
    );
    const newData = { ...res.data, page: homePosts.page + 1 };
    dispatch({ type: POST_TYPES.UPDATED_POST, payload: newData });

    setLoad(false);
  };
  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      <LoadMoreBtn
        result={homePosts.result}
        page={homePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
