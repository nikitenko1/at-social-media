import { TYPES } from '../redux/actions/_types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const StatusModal = () => {
  const [content, setContent] = useState('');
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="status_modal">
      <form>
        <div className="status_header">
          <h5 className="m-0">Create Post</h5>
          <span
            onClick={() => dispatch({ type: TYPES.STATUS, payload: false })}
          >
            &times;
          </span>
        </div>
        <div className="status_body">
          <textarea
            name="content"
            value={content}
            placeholder={`${auth.user.username}, what are you thinking?`}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="input_images">
            <i className="fas fa-camera"></i>
            <div className="file_upload">
              <i className="fas fa-image"></i>
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div className="status_footer my-2 ">
          <button className="btn btn-outline-secondary w-100">Post</button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
