import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';

const Login = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };
  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">Social Media</h3>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            onChange={handleChangeInput}
            value={email}
            name="email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className="pass">
            <input
              type={typePass ? 'text' : 'password'}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Hide' : 'Show'}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="mt-3 btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>
        <p className="my-2 text-end">
          Don't have an account?{' '}
          <span>
            <Link to="/register" style={{ color: 'tomato' }}>
              Sign Up
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
