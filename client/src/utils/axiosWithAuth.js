import axios from 'axios';

export const axiosWithAuth = () => {
  return axios.create({
    // Possible error here
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });
};
