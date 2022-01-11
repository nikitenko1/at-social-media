import { useState } from 'react';
import UserCard from '../UserCard';
import { useSelector, useDispatch } from 'react-redux';
import { TYPES } from '../../redux/actions/_types';
import { getDataAPI } from '../../utils/fetchData';
import { useHistory, useParams } from 'react-router-dom';
import { addUser } from '../../redux/actions/messageAction';
//
const LeftSide = () => {
  const { auth, message } = useSelector((state) => state);
  const [search, setSearch] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);
    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearch('');
    setSearchUsers([]);
    dispatch(addUser({ user, message }));
    return history.push(`/message/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return 'active';
    return '';
  };
  return (
    <>
      <form className="message_header" onSubmit={handleSearch}>
        <input
          type="text"
          vaue={search}
          placeholder="Enter to Search ..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" style={{ display: 'none' }}>
          Search
        </button>
      </form>
      <div className="message_chat_list">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} msg={true}>
                  <i className="fas fa-circle" />
                </UserCard>
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default LeftSide;
