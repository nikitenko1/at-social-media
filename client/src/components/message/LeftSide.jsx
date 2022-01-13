import { useState, useEffect } from 'react';
import UserCard from '../UserCard';
import { useSelector, useDispatch } from 'react-redux';
import { TYPES } from '../../redux/actions/_types';
import { getDataAPI } from '../../utils/fetchData';
import { useHistory, useParams } from 'react-router-dom';
import {
  getConversations,
  MESSAGE_TYPES,
} from '../../redux/actions/messageAction';
import { useRef } from 'react';
//
const LeftSide = () => {
  const { auth, message, online } = useSelector((state) => state);
  const [search, setSearch] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearch('');
    setSearchUsers([]);
    dispatch({
      type: MESSAGE_TYPES.ADD_USER,
      payload: { ...user, text: '', media: [] },
    });
    return history.push(`/message/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return 'active';
    return '';
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, auth, page, dispatch]);

  // Check Offline/Online Users
  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: MESSAGE_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [dispatch, online, message.firstLoad]);
  //
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
                <UserCard user={user}>
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
                <UserCard user={user} msg={true}>
                  {user.online ? (
                    <i className="fas fa-circle text-success" />
                  ) : (
                    auth.user.following.find(
                      (item) => item._id === user._id
                    ) && <i className="fas fa-circle" />
                  )}
                </UserCard>
              </div>
            ))}
          </>
        )}
        <button
          ref={pageEnd}
          style={{
            opacity: 0.1,
          }}
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default LeftSide;
