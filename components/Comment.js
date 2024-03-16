import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deleteComment } from '../api/commentData';

const Comment = ({ comment, setChange }) => {
  const { user } = useAuth();

  const handleDelete = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(comment.id).then(() => {
        setChange((prevState) => !prevState);
      });
    }
  };

  return (
    <Card style={{ width: '24rem' }}>
      <Card.Body>
        <Card.Title>{comment.user?.username} {comment.user?.uid === user.uid ? ('(You)') : ''}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{comment.date}</Card.Subtitle>
        <Card.Text>
          {comment.content}
        </Card.Text>
        {comment.user?.uid === user.uid ? (<Button onClick={handleDelete}>Delete</Button>) : ''}
      </Card.Body>
    </Card>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      uid: PropTypes.string,
    }),
    id: PropTypes.number,
    date: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  setChange: PropTypes.func.isRequired,
};

export default Comment;
