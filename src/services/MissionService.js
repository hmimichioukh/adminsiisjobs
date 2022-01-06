import http from "./http-common";
const getAll = ()=>{
    return http.get('/mission');
}
const get = id =>{
    return http.get(`/mission/${id}`);
}
const create = data=>{
    return http.post('/mission/add',data);

}
const update = (id,data) =>{
    return http.put(`/mission/${id}`,data);
}
const remove = id =>{
    return http.put(`/mission/${id}`);
}
const removeAll = id =>{
    return http.put(`/mission`);
}
const findByTitle = title =>{
    return http.put(`/mission?title=${title} `);
};

export default {
    getAll,get,create,update,remove,removeAll,findByTitle
}