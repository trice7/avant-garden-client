/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import { getUserGardens } from '../../api/gardenData';
import { useAuth } from '../../utils/context/authContext';
import GardenCard from '../../components/gardens/GardenCard';

const GardenPage = () => {
  const [gardens, setGardens] = useState([]);
  const { user } = useAuth();

  const loadGardens = () => {
    getUserGardens(user.uid).then(setGardens);
  };

  useEffect(() => {
    loadGardens();
  }, [user]);

  return (
    <div>
      <h2>{`${user.username}'s gardens`}</h2>

      {gardens.map((garden) => (
        <section key={garden.id}>
          <GardenCard garden={garden} onUpdate={loadGardens} />
        </section>
      ))}
    </div>
  );
};

export default GardenPage;
