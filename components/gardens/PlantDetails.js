import { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUserGardens } from '../../api/gardenData';
import { createGardenPlant, updateGardenPlant } from '../../api/gardenPlantData';

const initialState = {
  garden: '',
  plant: '',
  quantity: 1,
};

function PlantDetail({
  plant,
  plantQuantity,
  gardenName,
  gardenId,
  gardenPlantId,
}) {
  const [show, setShow] = useState(false);
  const [gardens, setGardens] = useState([]);
  const [formInput, setFormInput] = useState(initialState);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getUserGardens(user.uid).then(setGardens);
    setFormInput((prevState) => ({ ...prevState, plant: plant.id }));
    if (gardenId) {
      setFormInput((prevState) => ({
        ...prevState,
        quantity: Number(plantQuantity),
        garden: gardenId,
      }));
    }
  }, [user.uid, plant.id, gardenId, plantQuantity]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gardenId) {
      const payload = {
        ...formInput,
        id: gardenPlantId,
      };
      updateGardenPlant(payload).then(() => router.push('/gardens'));
      console.warn(payload);
    } else {
      createGardenPlant(formInput).then(() => router.push('/gardens'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Plant
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{plant.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Img variant="top" src={plant.image} />
            <Card.Body>
              <Card.Text>{`Type: ${plant.type.label}`}</Card.Text>
              <Card.Text>{`Growth: ${plant.grow_time}`}</Card.Text>
              <Card.Text>{plant.description}</Card.Text>
              <Card.Text>{`Additional Details: ${plant.notes}`}</Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label sm="2">Garden:</Form.Label>
            {gardenName ? ` ${gardenName}` : (
              <Form.Select name="garden" onChange={handleChange} value={formInput.garden || ''} required>
                <option value="">Add to a Garden</option>
                {gardens?.map((garden) => (
                  <option key={garden.id} value={garden.id}>{garden.name}</option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control name="quantity" value={formInput.quantity} type="number" onChange={handleChange} />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">{gardenId ? 'Update' : 'Add'} plant</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

PlantDetail.propTypes = {
  plant: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    notes: PropTypes.string,
    id: PropTypes.number,
    type: PropTypes.shape({
      label: PropTypes.string,
    }),
    grow_time: PropTypes.string,
  }).isRequired,
  plantQuantity: PropTypes.number,
  gardenName: PropTypes.string,
  gardenId: PropTypes.number,
  gardenPlantId: PropTypes.number,
};

PlantDetail.defaultProps = {
  plantQuantity: '',
  gardenName: '',
  gardenId: '',
  gardenPlantId: '',
};

export default PlantDetail;
