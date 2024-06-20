import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";
import useLoginRedirect from "../hooks/useLoginRedirect";

const api = axios.create({
    baseURL : 'http://localhost:8008/v1'
});

api.interceptors.request.use(
    config => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken != null) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;   

    },
    error => {
      return Promise.reject(error);
    }
  );
  
api.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      if (error.response && error.response.status === 401) {
        const originalRequest = error.config;
  
        try {
          await useRefreshToken();          
          return api(originalRequest);
        } catch (refreshError) {
            useLoginRedirect();
            return Promise.reject(refreshError);            
        }
      }  
      return Promise.reject(error);
    }
  );

export default api;