import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleGarden } from '../../../api/gardenData';
import GardenForm from '../../../components/gardens/GardenForm';

const EditGarden = () => {
  const [garden, setGarden] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGarden(id).then(setGarden);
  }, [id]);

  return (
    <GardenForm garden={garden} />
  );
};

export default EditGarden;
