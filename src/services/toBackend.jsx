import axios from "axios";
const baseUrl = "http://localhost:3001/habits";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  console.log(request);
  return request.then((response) => response.data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (habits) => {
  const request = axios.put(`${baseUrl}`, habits);
  return request.then((response) => response.data);
};

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject);
//   return request.then((response) => response.data);
// };

const accessHabits = { getAll, create, deleteEntry, update };

export default accessHabits;
