import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../redux/actions/authAction';

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const history = useHistory();
  useEffect(() => {
    if (auth.token) history.push('/');
  }, [auth, history]);

  const initialState = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    cf_password: '',
    gender: 'male',
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };
  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">Social Media</h3>
        <div className="mb-3">
          <label className="form-label" htmlFor="fullname">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            onChange={handleChangeInput}
            value={fullname}
            name="fullname"
            style={{ background: `${alert.fullname ? 'Cornsilk' : ''}` }}
          />
          <small className="form-text text-danger">
            {alert.fullname ? alert.username : ''}
          </small>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={handleChangeInput}
            value={username.toLocaleLowerCase().replace(/ /g, '')}
            name="username"
            style={{ background: `${alert.username ? 'Cornsilk' : ''}` }}
          />
          <small className="form-text text-danger">
            {alert.username ? alert.username : ''}
          </small>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email1">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email1"
            onChange={handleChangeInput}
            value={email}
            name="email"
            style={{ background: `${alert.email ? 'Cornsilk' : ''}` }}
          />
          <small className="form-text text-danger">
            {alert.email ? alert.email : ''}
          </small>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password1">
            Password
          </label>
          <div className="pass">
            <input
              type={typePass ? 'text' : 'password'}
              className="form-control"
              id="password1"
              onChange={handleChangeInput}
              value={password}
              name="password"
              style={{ background: `${alert.password ? 'Cornsilk' : ''}` }}
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Hide' : 'Show'}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.password ? alert.password : ''}
          </small>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="cf_password1">
            Confirm Password
          </label>
          <div className="pass">
            <input
              type={typeCfPass ? 'text' : 'password'}
              className="form-control"
              id="cf_password1"
              onChange={handleChangeInput}
              value={cf_password}
              name="cf_password"
              style={{ background: `${alert.cf_password ? 'Cornsilk' : ''}` }}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typePass ? 'Hide' : 'Show'}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ''}
          </small>
        </div>
        <div className="d-flex justify-content-between">
          <label className="form-label" htmlFor="male">
            Male:{' '}
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>
          <label className="form-label" htmlFor="female">
            Female:{' '}
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>
          <label className="form-label" htmlFor="other">
            Other:{' '}
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChangeInput}
            />
          </label>
        </div>
        <button type="submit" className="mt-3 btn btn-dark w-100">
          Register
        </button>

        <p className="my-2 text-end">
          Already have an account?{' '}
          <span>
            <Link to="/" style={{ color: 'tomato' }}>
              Login
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
