import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleGarden } from '../../api/gardenData';
import PlantCard from '../../components/gardens/PlantCard';

const ViewGarden = () => {
  const router = useRouter();
  const [garden, setGarden] = useState({});
  const [change, setChange] = useState(true);

  const { id } = router.query;

  useEffect(() => {
    getSingleGarden(id).then(setGarden);
  }, [id, change]);

  return (
    <div>
      <h2>{`${garden.name} by ${garden.user?.username}`}</h2>

      {garden.plants?.map((obj) => (
        <section key={obj.id}>
          <PlantCard plant={obj.plant} quantity={obj.quantity} gardenPlantId={obj.id} garden={garden} setChange={setChange} />
        </section>
      ))}
    </div>
  );
};

export default ViewGarden;
