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
    putScores: (id, requestBody) => axios.put(`${url}${id}/scores`, requestBody),
    putEntryFee: (id, requestBody) => axios.put(`${url}${id}/fee`, requestBody),
    delete: id => axios.delete(url + id),
  };
};