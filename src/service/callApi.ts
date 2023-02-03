
import axios from 'axios';
const callApi = () => {
 const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/"
 })
 return axiosInstance
}

export default callApi