import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import PlantDetail from './PlantDetails';
import { deleteGardenPlant } from '../../api/gardenPlantData';

const PlantCard = ({
  plant,
  quantity,
  garden,
  gardenPlantId,
  setChange,
}) => {
  const handleDelete = () => {
    if (window.confirm('Remove plant?')) {
      deleteGardenPlant(gardenPlantId).then(() => {
        setChange((prevState) => !prevState);
      });
    }
  };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={plant.image} />
      <Card.Body>
        <Card.Text>{plant.name}</Card.Text>
        {quantity ? (<p>{quantity}</p>) : ''}
        <PlantDetail plant={plant} plantQuantity={quantity} gardenName={garden.name} gardenId={garden.id} gardenPlantId={gardenPlantId} />
        {gardenPlantId ? (<Button onClick={handleDelete} variant="danger">Delete</Button>) : ''}
      </Card.Body>
    </Card>
  );
};

PlantCard.propTypes = {
  quantity: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  gardenPlantId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  setChange: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  garden: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    }),
    PropTypes.string,
  ]),
  plant: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

PlantCard.defaultProps = {
  quantity: '',
  garden: '',
  gardenPlantId: '',
  setChange: '',
};

export default PlantCard;
