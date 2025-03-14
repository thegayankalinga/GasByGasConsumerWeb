import axios from 'axios';
import authHeader from './auth/auth-header';

const API_URL = import.meta.env.VITE_API_BASE_URL;

class GasTokenService {
  getAll(param) {
    return axios
      .get(API_URL + "gastoken/byuser/"+param, { headers: authHeader()})
      .then(response => {
        if (response.status == 200) {
          return response.data;
        }
        else {
          console.log('something missing');
        }
      });
  }

  createReq(body, param) {
    return axios
      .post(API_URL + "gastoken", body, { headers: authHeader(), params: param })
      .then(response => {
        if (response.status == 201) {
          return response.data;
        }
        else {
          console.log('something missing');
        }
      });
  }

  updateReq(expectedPickupDate,userType, id) {
    return axios
      .put(API_URL + "gastoken/expectedDate/"+id, {expectedPickupDate,userType}, { headers: authHeader()})
      .then(response => {
        if (response.status == 200) {
          return response.data;
        }
        else {
          console.log('something missing');
        }
      });
  }
  deleteReq(id) {
    return axios
      .delete(API_URL + "gastoken/"+id, { headers: authHeader() })
      .then(response => {
        if (response) {
          return response;
        }
        else {
          console.log('something missing');
        }
      });
  }
}

export default new GasTokenService();