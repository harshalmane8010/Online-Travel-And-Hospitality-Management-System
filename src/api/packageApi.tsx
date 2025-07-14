import axios from 'axios';

const BASE_URL = 'http://localhost:9999/api/packages';

export const fetchPackages = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createPackage = async (pkg: any) => {
  const response = await axios.post(BASE_URL, pkg);
  return response.data;
};

export const updatePackage = async (id: number, pkg: any) => {
  const response = await axios.put(`${BASE_URL}/${id}`, pkg);
  return response.data;
};

export const deletePackage = async (id: number) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
