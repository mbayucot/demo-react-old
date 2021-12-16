import axios, { AxiosRequestConfig } from 'axios';

const constants = {
  HOST_URL: process.env.REACT_APP_HOST_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const axiosClient = axios.create();

axiosClient.defaults.baseURL = constants.HOST_URL;

axiosClient.defaults.headers = constants.headers;

// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = false;

export function postRequest(URL: string, payload: object) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL: string) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}
