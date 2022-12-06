import axios from 'axios';
import constants from '../config/constants.config';

export const axiosClient = axios.create({
  baseURL: constants.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
