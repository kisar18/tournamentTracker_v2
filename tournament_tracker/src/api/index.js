import axios from 'axios';

export const BASE_URL = 'http://localhost:4000/';

export const ENDPOINTS = {
  tournament: 'tournaments',
  team: 'teams',
  prizes: 'prizes'
};

export const createAPIEndpoint = endpoint => {

  let url = BASE_URL + endpoint + '/';
  return {
    getAll: () => axios.get(url),
    getById: id => axios.get(url + id),
    post: newRecord => axios.post(url, newRecord),
    put: (id, updatedRecord) => axios.put(`${url}${id}/scores`, updatedRecord),
    delete: id => axios.delete(url + id),
  };
};