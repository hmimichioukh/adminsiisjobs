import axios from "axios";
const api = axios.create({
    baseURL:'https://siisbackjob.herokuapp.com/api',
    headers:{
        "Content-type": "application/json"
    }
})
export default api;