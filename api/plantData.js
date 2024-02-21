import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPlants = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSinglePlant = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plants/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getPlants, getSinglePlant };
