import { useSelector, useDispatch } from 'react-redux';
import { TYPES } from '../../redux/actions/_types';
import Loading from './Loading';
import Toast from './Toast';

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && (
        <Toast
          msg={{ title: 'Error', body: alert.error }}
          handleShow={() => dispatch({ type: TYPES.ALERT, payload: {} })}
          bgColor="bg-danger"
        />
      )}

      {alert.success && (
        <Toast
          msg={{ title: 'Success', body: alert.success }}
          handleShow={() => dispatch({ type: TYPES.ALERT, payload: {} })}
          bgColor="bg-success"
        />
      )}
    </div>
  );
};

export default Alert;
