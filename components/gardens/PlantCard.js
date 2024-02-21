import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PlantCard = ({ plant, quantity }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={plant.image} />
    <Card.Body>
      <Card.Text><h3>{plant.name}</h3></Card.Text>
      {quantity ? (<p>{quantity}</p>) : ''}
      <Button>Button</Button>
    </Card.Body>
  </Card>
);

PlantCard.propTypes = {
  quantity: PropTypes.number,
  plant: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

PlantCard.defaultProps = {
  quantity: '',
};

export default PlantCard;
