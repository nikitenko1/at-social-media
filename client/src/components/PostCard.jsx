import CardHeader from './home/post/CardHeader';
import CardBody from './home/post/CardBody';
import CardFooter from './home/post/CardFooter';
import Comments from './home/Comments';
import InputComment from './home/InputComment';

const PostCard = ({ post }) => {
  return (
    <div className="card my-3">
      <CardHeader post={post} />
      <CardBody post={post} />
      <CardFooter post={post} />

      <Comments post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default PostCard;
