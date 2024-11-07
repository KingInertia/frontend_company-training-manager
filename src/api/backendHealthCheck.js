import axiosInstance from './axiosInstance';

const backendHealthCheck = () => {
  return axiosInstance
    .get('')
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export default backendHealthCheck;
