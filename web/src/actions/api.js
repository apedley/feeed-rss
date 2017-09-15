import axios from 'axios';

export function makeRequest(resource, fetchId) {
  const token = localStorage.getItem('access_token');
  let url = `http://localhost:8080/request?feedlyResource=${resource}&token=${token}`;
  if (fetchId) {
    url = `${url}&fetchId=${fetchId}`;
  }
  return axios.get(url);
}