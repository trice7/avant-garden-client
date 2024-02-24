import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import PlantDetail from './PlantDetails';

const PlantCard = ({
  plant,
  quantity,
  garden,
  gardenPlantId,
}) => (
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={plant.image} />
    <Card.Body>
      <Card.Text><h3>{plant.name}</h3></Card.Text>
      {quantity ? (<p>{quantity}</p>) : ''}
      <PlantDetail plant={plant} plantQuantity={quantity} gardenName={garden.name} gardenId={garden.id} gardenPlantId={gardenPlantId} />
    </Card.Body>
  </Card>
);

PlantCard.propTypes = {
  quantity: PropTypes.number,
  gardenPlantId: PropTypes.number,
  garden: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
  plant: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

PlantCard.defaultProps = {
  quantity: '',
  garden: '',
  gardenPlantId: '',
};

export default PlantCard;
