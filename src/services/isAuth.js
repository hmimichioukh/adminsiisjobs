const isAuth = () => {
    return  JSON.parse(localStorage.getItem("token"));
  };
  
  export const userType = () => {
    return  JSON.parse(localStorage.getItem("type"));
  };
  
  export default isAuth;
