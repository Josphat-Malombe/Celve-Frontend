/* the file that communicates with the backend ....in this file i am creating an api instance that will be exported for 
other files to use. I start by setting up the instances using axios,set the base url,credentials for http cookies,
and headers to ensure all is json. The other thing is for refreshing tokens i have tried setting up a new instance just for refresh
when the token expires. the instance will refresh,set a new access token, retry the failed api calls. If refresh fails the
user is logged out all all tokens in local storage is cleareled. Its a bit difficult getting the refresh logic and thus 
it keeps on failing. This has led to a small change in thebackend by increasing the lifetime of refresh token/access token
as a temporary solution. */
import axios from 'axios';

const api = axios.create({
  //baseURL: 'https://celve-backend.onrender.com/api/',
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  //baseURL: 'https://celve-backend.onrender.com/api/',
  withCredentials: true,
});


let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb) {
  refreshSubscribers.push(cb);
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
       
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        let newAccess;
        if (refreshToken) {
          const res = await refreshClient.post('/refresh/', { refresh: refreshToken });
          newAccess = res.data.access;
        } else {
          const res = await refreshClient.post('/refresh/', {}, { withCredentials: true });
          newAccess = res.data.access;
        }

        localStorage.setItem('access_token', newAccess);
        onRefreshed(newAccess);
        isRefreshing = false;

        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshErr) {
        isRefreshing = false;
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
