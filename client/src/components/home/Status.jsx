import Avatar from '../Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { TYPES } from '../../redux/actions/_types';

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="status md-3 d-flex">
      <Avatar src={auth.user.avatar} size="big-avatar" />
      <button
        className="statusBtn flex-fill"
        onClick={() => dispatch({ type: TYPES.STATUS, payload: true })}
      >
        {auth.user.username}, what are you thinking?
      </button>
    </div>
  );
};

export default Status;
