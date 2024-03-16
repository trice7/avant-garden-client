/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createGarden, updateGarden } from '../../api/gardenData';

const initialState = {
  name: '',
  image: '',
  uid: '',
  public: false,
};

const GardenForm = ({ garden }) => {
  const [formInput, setFormInput] = useState(initialState);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (garden) {
      setFormInput(() => ({
        ...garden,
        uid: garden.user?.uid,
      }));
    }
  }, [garden]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (garden) {
      const payload = {};
      payload.id = formInput.id;
      payload.name = formInput.name;
      payload.image = formInput.image;
      payload.uid = formInput.user.uid;
      payload.public = formInput.public;

      updateGarden(payload).then(() => router.push('/gardens'));
    } else {
      formInput.uid = user.uid;
      createGarden(formInput).then(() => router.push('/gardens'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{garden ? 'Update' : 'Create'} a Garden</h2>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" value={formInput.name || ''} onChange={handleChange} placeholder="Enter a name for your garden" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control name="image" value={formInput.image || ''} onChange={handleChange} placeholder="Enter an imageURL for your garden" />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

GardenForm.propTypes = {
  garden: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      public: PropTypes.bool,
      user: PropTypes.shape({
        uid: PropTypes.string,
      }),
    }),
    PropTypes.string,
  ]),
};

GardenForm.defaultProps = {
  garden: '',
};

export default GardenForm;
