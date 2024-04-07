import { Button, Card, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { deleteComment, updateComment } from '../api/commentData';

const Comment = ({ comment, setChange, gardenId }) => {
  const [edit, setEdit] = useState(false);
  const [editComment, setEditComment] = useState(comment);
  const { user } = useAuth();

  const handleDelete = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(comment.id).then(() => {
        setChange((prevState) => !prevState);
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {};
    payload.uid = comment.user.uid;
    payload.id = comment.id;
    payload.content = editComment.content;
    payload.garden = gardenId;

    updateComment(payload).then(() => {
      setChange((prevState) => !prevState);
      setEdit((prevState) => !prevState);
    });
  };

  const handleEdit = () => {
    setEdit((prevState) => !prevState);
  };

  return (
    <div>
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Title>{comment.user?.username} {comment.user?.uid === user.uid ? ('(You)') : ''}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{comment.date}</Card.Subtitle>
          <Card.Text>
            {comment.content}
          </Card.Text>
          {
            comment.user?.uid === user.uid ? (<Button variant={edit ? 'danger' : 'success'} onClick={handleEdit}>{edit ? 'Cancel' : 'Edit'}</Button>) : ''
          }
          {comment.user?.uid === user.uid ? (<Button onClick={handleDelete}>Delete</Button>) : ''}
        </Card.Body>
      </Card>

      {edit ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Edit Comment</Form.Label>
            <Form.Control as="textarea" rows={3} name="content" value={editComment.content || ''} onChange={handleChange} />
            <Button type="submit">Update Comment</Button>
          </Form.Group>
        </Form>
      ) : ''}
    </div>
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
    garden: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  setChange: PropTypes.func.isRequired,
  gardenId: PropTypes.number.isRequired,
};

export default Comment;
