import axios from 'axios';

const axiosService = axios.create({
  baseURL: 'http://10.0.2.2:3000/',
});

export const api = {
  get(endpoint) {
    return axiosService.get(endpoint);
  },
  post(endpoint, body) {
    return axiosService.post(endpoint, body);
  },
  delete(endpoint) {
    return axiosService.delete(endpoint);
  },
  put(endpoint) {
    return axiosService.put(endpoint);
  },
};
