import { useSelector } from 'react-redux';

const Avatar = ({ size, src }) => {
  const { theme } = useSelector((state) => state);
  return (
    <img
      src={src}
      alt="avatar"
      className={size}
      style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }}
    />
  );
};

export default Avatar;
