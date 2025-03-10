import axios from 'axios';
import authHeader from './auth/auth-header';

const API_URL = import.meta.env.VITE_API_BASE_URL;


class UserService {

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getConsumer() {
      return axios
        .get(API_URL + "getConsumers", { headers: authHeader()})
        .then(response => {
          if (response.status == 200) {
            return response.data;
          }
          else {
            console.log('something missing');
          }
        });
    }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();