import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleGardenPlant = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/garden_plants/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteGardenPlant = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/garden_plants/${id}`, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const createGardenPlant = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/garden_plants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateGardenPlant = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/garden_plants/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getSingleGardenPlant,
  createGardenPlant,
  updateGardenPlant,
  deleteGardenPlant,
};
