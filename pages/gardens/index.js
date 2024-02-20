// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';

const GardenPage = () => {
  // const [gardens, setGardens] = useState([]);

  const loadGardens = () => {
    // TODO: create promises and then make a GET request for gardens
  };

  useEffect(() => {
    loadGardens();
  }, []);

  return (
    <div>
      Garden Page
    </div>
  )
};

export default GardenPage;
