/*import axios from "axios";
const api = axios.create({  
    baseURL:'http://localhost:3400/api/users'
});
const login = (email,password) => {
return api.post('/login',{
    email,
    password,
})
.then((response)=>{
    if(response.data.access)
})
}*/
const getCurrentUser = ()=>{
    return JSON.parse(localStorage.getItem("token"));
};
export default{
    getCurrentUser
}