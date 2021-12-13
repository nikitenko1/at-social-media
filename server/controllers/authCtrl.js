const Users = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, '');

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name)
        return res.status(400).json({ msg: 'This user name already exists' });

      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: 'This user email already exists' });

      if (password < 6)
        return res
          .status(400)
          .json({ msg: 'Password must be at least 6 characters' });

      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender,
      });

      const passwordHash = await bcrypt.hash(password, 12);

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });

      await newUser.save();

      res.json({
        msg: 'Registered successfully',
        access_token,
        user: {
          ...newUser._doc,
          password: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate(
        'followers following',
        '-password'
      );

      if (!user)
        return res.status(400).json({ msg: 'This email does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Password is incorrect.' });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });

      res.json({
        msg: 'Login success!',
        access_token,
        user: {
          ...user._doc,
          password: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
      return res.json({ msg: 'Logout success!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: 'Please login now!' });

      const decoded = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
      if (!decoded.id)
        return res.status(400).json({ msg: 'Please login now!' });

      const user = await Users.findById(decoded.id)
        .select('-password')
        .populate('followers following', '-password');
      if (!user)
        return res.status(400).json({ msg: 'This account does not exist.' });

      const access_token = createAccessToken({ id: user._id });

      res.json({ access_token, user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};
const createRefreshToken = (payload) => {
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = authCtrl;
