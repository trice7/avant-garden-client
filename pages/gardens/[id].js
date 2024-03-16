import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getSingleGarden } from '../../api/gardenData';
import PlantCard from '../../components/gardens/PlantCard';
import Comment from '../../components/Comment';
import { useAuth } from '../../utils/context/authContext';
import { createComment } from '../../api/commentData';

const initialState = {
  content: '',
};

const ViewGarden = () => {
  const router = useRouter();
  const [garden, setGarden] = useState({});
  const [change, setChange] = useState(true);
  const [formInput, setFormInput] = useState(initialState);

  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleGarden(id).then(setGarden);
  }, [id, change]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = formInput;
    payload.uid = user.uid;
    payload.garden = garden.id;
    createComment(payload).then(() => {
      setFormInput({
        content: '',
      });
      setChange((prevState) => !prevState);
    });
  };

  return (
    <div>
      <h2>{`${garden.name} by ${garden.user?.username}`}</h2>

      {garden.plants?.map((obj) => (
        <section key={obj.id}>
          <PlantCard plant={obj.plant} quantity={obj.quantity} gardenPlantId={obj.id} garden={garden} setChange={setChange} />
        </section>
      ))}

      <h2>Comments:</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="comment-area">
          <Form.Control as="textarea" rows={3} placeholder="Drop a comment..." name="content" value={formInput.content || ''} onChange={handleChange} />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>

      {garden.comments?.map((comment) => (
        <section key={comment.id}>
          <Comment comment={comment} setChange={setChange} />
        </section>
      ))}
    </div>
  );
};

export default ViewGarden;
