import { useEffect, useState } from 'react';
import { getPlants } from '../../api/plantData';
import PlantCard from '../../components/gardens/PlantCard';

const PlantPage = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    getPlants().then(setPlants);
  }, []);

  return (
    <div>
      <h2>Plant Compendium</h2>

      {plants.map((plant) => (
        <section key={plant.id}>
          <PlantCard plant={plant} />
        </section>
      ))}
    </div>
  );
};

export default PlantPage;
