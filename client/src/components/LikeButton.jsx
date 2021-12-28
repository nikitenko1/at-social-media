import { useSelector } from 'react-redux';

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  const { theme } = useSelector((state) => state);
  return (
    <>
      {isLike ? (
        <i className="fas fa-heart text-danger" onClick={handleUnLike}style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }}></i>
      ) : (
        <i
          className="far fa-heart"
          onClick={handleLike}
          
        ></i>
      )}
    </>
  );
};

export default LikeButton;
