import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData';
import { TYPES } from '../../redux/actions/_types';
import UserCard from '../UserCard';
import loading from '../../images/loading.gif';

const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
  const handleClose = () => {
    setSearch('');
    setUsers([]);
  };
  return (
    <>
      <form className="search_form" onSubmit={handleSearch}>
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
        <button type="submit" style={{ display: 'none' }}>
          Search
        </button>
        {load && <img src={loading} alt="loading" className="loading" />}
        <div className="users">
          {search &&
            users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                border="border border-primary"
                handleClose={handleClose}
              />
            ))}
        </div>
      </form>
    </>
  );
};

export default Search;
