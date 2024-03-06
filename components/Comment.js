import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

const Comment = ({ comment }) => {
  const handleDelete = () => {
    console.warn(comment);
  };

  const { user } = useAuth();

  return (
    <Card style={{ width: '24rem' }}>
      <Card.Body>
        <Card.Title>{comment.user?.username} {comment.user?.uid === user.uid ? ('(You)') : ''}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{comment.date}</Card.Subtitle>
        <Card.Text>
          {comment.content}
        </Card.Text>
        <Button onClick={handleDelete}>Delete</Button>
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
    date: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default Comment;
