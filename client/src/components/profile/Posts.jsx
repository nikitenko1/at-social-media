import { useState, useEffect } from 'react';
import LoadIcon from '../../images/loading.gif';
import PostThumb from '../../components/PostThumb';
import LoadMoreBtn from '../../components/LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { useDispatch } from 'react-redux';
import { PROFILE_TYPES } from '../../redux/actions/profileAction';

const Posts = ({ auth, profile, id }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [id, profile.posts]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `user_posts/${id}?limit=${page * 3}`,
      auth.token
    );
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
    setLoad(false);
  };
  return (
    <div>
      <PostThumb posts={posts} result={result} />

      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
