import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData';
import { TYPES } from '../../redux/actions/_types';
import { Link } from 'react-router-dom';
import UserCard from '../UserCard';

const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (search) {
      getDataAPI(`search?username=${search}`, auth.token)
        .then((res) => setUsers(res.data.users))
        .catch((err) => {
          dispatch({
            type: TYPES.ALERT,
            payload: {
              error: err.response.data.msg,
            },
          });
        });
    } else {
      setUsers([]);
    }
  }, [search, auth, dispatch]);

  const handleClose = () => {
    setSearch('');
    setUsers([]);
  };
  return (
    <div className="search_form">
      <input
        id="search"
        type="text"
        name="search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ''))
        }
      />
      <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">search</span>
        <span>search</span>
      </div>
      <div
        className="close_search"
        style={{ opacity: users.length === 0 ? 0 : 1 }}
        onClick={handleClose}
      >
        &times;
      </div>
      <div className="users">
        {search &&
          users.map((user) => (
            <Link
              key={user._id}
              to={`/profile/${user._id}`}
              onClick={handleClose}
            >
              <UserCard user={user} border="border border-primary" />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Search;
