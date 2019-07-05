import axios from 'axios';

class SecureAxios {
  get(url) {
    return axios.get(url, {headers: {'Authorization': 'Bearer ' + this.getToken()}})
      .then(function (response) {
        return response.data;
      });
  }

  post(url, payload) {
    return axios.post(url, payload, {headers: {'Authorization': 'Bearer ' + this.getToken()}})
      .then(function (response) {
        return response.data;
      });
  }

  patch(url, payload) {
    return axios.patch(url, payload, {headers: {'Authorization': 'Bearer ' + this.getToken()}})
      .then(function (response) {
        return response.data;
      });
  }

  delete(url) {
    return axios.delete(url, {headers: {'Authorization': 'Bearer ' + this.getToken()}})
      .then(function (response) {
        return response.data;
      });
  }

  getToken() {
    let token = localStorage.getItem('id_token');
    console.log("Retrieving token: " + token);
    return token;
  }
}

export default new SecureAxios();
