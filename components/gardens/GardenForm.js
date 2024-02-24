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
    console.warn(formInput);

    if (garden) {
      setFormInput(garden);
    }
  }, [garden]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.warn(formInput);
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

  // const boolConversion = (value) => {
  //   if (value === 'true') {
  //     return true;
  //   }
  //   if (value === 'false') {
  //     return false;
  //   }
  //   return value;
  // };

  // const handleRadioChange = (e) => {
  //   const bool = boolConversion(e.target.value);
  //   // boolConversion(e.target.value);
  //   setFormInput((prevState) => ({
  //     ...prevState,
  //     public: bool,
  //   }));
  // };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{garden ? 'Update' : 'Create'} a Garden</h2>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" value={formInput.name} onChange={handleChange} placeholder="Enter a name for your garden" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control name="image" value={formInput.image} onChange={handleChange} placeholder="Enter an imageURL for your garden" />
      </Form.Group>
      {/* <Form.Group className="mb-3" onChange={handleRadioChange} required>
        <div className="mb-3">
          <Form.Check // prettier-ignore
            type="radio"
            id="test Check"
            label="False"
            for="privacy-radio"
            name="public"
            value="false"
          />

          <Form.Check
            type="radio"
            label="False"
            id="True"
            for="privacy-radio"
            name="public"
            value="true"
          />
        </div>
      </Form.Group> */}

      <Button type="submit">Submit</Button>
    </Form>
  );
};

GardenForm.propTypes = {
  garden: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    public: PropTypes.bool,
  }).isRequired,
};

export default GardenForm;
