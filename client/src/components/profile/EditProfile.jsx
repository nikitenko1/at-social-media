import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkImage } from '../../utils/imageUpload';
import { TYPES } from '../../redux/actions/_types';
import { updateProfileUser } from '../../redux/actions/profileAction';

const EditProfile = ({ setOnEdit }) => {
  const { auth, theme } = useSelector((state) => state);
  const initialState = {
    fullname: '',
    mobile: '',
    address: '',
    website: '',
    story: '',
    gender: '',
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, mobile, address, website, story, gender } = userData;
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: TYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
  };
  return (
    <div className="edit_profile">
      <button
        className="btn btn-outline-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>
      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>

        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            value={fullname}
            name="fullname"
            onChange={handleInput}
          />
          <div id="fullnameHelp" className="form-text ">
            Must be 25 char max long: {fullname.length}/25
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>

          <input
            type="text"
            value={mobile}
            name="mobile"
            className="form-control"
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>

          <input
            type="text"
            value={address}
            name="address"
            className="form-control"
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">
            Website
          </label>
          <input
            type="text"
            value={website}
            name="website"
            className="form-control"
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="story" className="form-label">
            Story
          </label>

          <textarea
            value={story}
            name="story"
            cols="30"
            rows="4"
            className="form-control"
            onChange={handleInput}
          />
          <div id="storyHelp" className="form-text ">
            Must be 200 char max long: {story.length}/200
          </div>
        </div>

        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            name="gender"
            onChange={handleInput}
            className="form-select text-capitalize"
          >
            <option>Choose...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button className="btn btn-dark w-100" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
