import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const GardenCard = ({ garden }) => {
  console.warn('garden card');

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={garden.image} />
      <Card.Body>
        <Card.Text>{garden.name}</Card.Text>
        <Button>View</Button>
      </Card.Body>
    </Card>
  );
};

GardenCard.propTypes = {
  garden: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default GardenCard;
