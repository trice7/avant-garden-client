import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteGarden } from '../../api/gardenData';

const GardenCard = ({ garden, onUpdate }) => {
  console.warn('placeholder');
  const handleDelete = () => {
    if (window.confirm('Delete this garden? This action is irreversible')) {
      deleteGarden(garden.id).then(onUpdate);
    }
  };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={garden.image} />
      <Card.Body>
        <Card.Text>{garden.name}</Card.Text>
        <Link passHref href={`/gardens/${garden.id}`}>
          <Button>View</Button>
        </Link>
        <Link passHref href={`/gardens/edit/${garden.id}`}>
          <Button>Edit</Button>
        </Link>
        <Button onClick={handleDelete} variant="danger">Delete</Button>
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
  onUpdate: PropTypes.func.isRequired,
};

export default GardenCard;
