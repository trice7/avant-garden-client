import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getGardens = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gardens`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getUserGardens = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gardens?uid=${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleGarden = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gardens/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createGarden = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gardens`, {
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

const updateGarden = (payload, id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gardens/${id}`, {
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

const deleteGarden = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gardens/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getGardens,
  getSingleGarden,
  getUserGardens,
  createGarden,
  updateGarden,
  deleteGarden,
};
