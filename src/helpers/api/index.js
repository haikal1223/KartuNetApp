export const BASE_URL = 'https://kartunet.id';

/* eslint-disable no-param-reassign */

// EXPERIMENTAL
// import axios from 'axios';

// const mainApiInstance = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
// });

// mainApiInstance.interceptors.request.use(
//   (config) => {
//     const auth_token = localStorage.getItem('token');
//     config.headers.Authorization = `Bearer ${auth_token}`;
//     if (config?.url.includes('/studentinfo')) {
//       const studentAuthToken = localStorage.getItem('studentAuth');
//       config.headers.Authorization = `Bearer ${studentAuthToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// export default mainApiInstance;
