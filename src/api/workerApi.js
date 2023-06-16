import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7271',
  
  });
  
  



  // export  const fetchEmployees = async () =>
  // instance
  // .get(`/employees`)
  // .then((res) =>res.data);

  export const fetchEmployees = async () => {
    const response = await instance.get(`/employees`);
    return response;
  };

  export const fetchProjects = async () => {
    const response = await instance.get(`/projects`);
    return response;
  };

export const fetchWorkhourTransactions = async (payload) => {

  const { employeeId, projectId, startTime, endTime} =
  payload;

    const response= instance.get(`/workhour/transactions?employeeId=${employeeId}&projectId=${projectId}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`);
    return response;


   
};



  export const postTimePeriod = async (payload) => {
    const response = await instance.post(`/workhour`,payload);
    return response;
  };