import React, { useEffect, useState } from 'react';
import LoadIcon from '../../images/loading.gif';
import { useDispatch } from 'react-redux';
import { TYPES } from '../../redux/actions/_types';
import { getDataAPI } from '../../utils/fetchData';
import PostThumb from '../PostThumb';
import LoadMoreBtn from '../LoadMoreBtn';

const Saved = ({ auth }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(3);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoad(true);
    getDataAPI('getSavePosts', auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({
          type: TYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      });
    return () => setSavePosts([]);
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getSavePosts?limit=${page * 3}`, auth.token);
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <div>
      <PostThumb posts={savePosts} result={result} />

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

export default Saved;
