import { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getUserGardens } from '../../api/gardenData';

function PlantDetail({ plant, quantity }) {
  const [show, setShow] = useState(false);
  const [gardens, setGardens] = useState([]);

  console.warn(quantity);
  console.warn(gardens);

  useEffect(() => {
    getUserGardens().then(setGardens);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
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
    type: PropTypes.shape({
      label: PropTypes.string,
    }),
    grow_time: PropTypes.string,
  }).isRequired,
  quantity: PropTypes.number,
};

PlantDetail.defaultProps = {
  quantity: '',
};

export default PlantDetail;
