import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPlantTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plant_types`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSinglePlantType = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plant_types/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getPlantTypes, getSinglePlantType };
