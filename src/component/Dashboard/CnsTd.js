import React,{useState,useEffect} from 'react'
import { Container, Row,Col,Button , Card,Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FiMoreVertical,FiBriefcase,FiUsers,FiDatabase } from "react-icons/fi";
import {IconContext} from "react-icons"
import axios from 'axios';
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function CnsTd(props){
    const {detail} = props;
    const handleDelete=()=>{
        api.delete(`/users/${detail._id}`).then((res)=>{
            console.log(res.data)
            window.location.reload(true);
        }).catch((err)=>{
            console.log(err.res)
        })
    }
    return(
        <tr>
        <td><img src={detail.imageUser} style={{"width":"80px"}} />    </td>
        <td>{detail.name} </td>
        <td>{detail.email} </td>
        <td>{detail.phone} </td>
        <td>{detail.domain} </td>
        <td>{detail.experince} </td>
        <td>{detail.address} </td>
        <td>
        <div class="btn-group">
            <button type="button" className="btn btn-action-table  " data-bs-toggle="dropdown" aria-expanded="false">
                <IconContext.Provider value={{className:"icon-table"}}>
                <FiMoreVertical/>

                </IconContext.Provider>
            </button>
            <ul class="dropdown-menu">
            <LinkContainer to={`/consultantcandidates/${detail.userId}`} >
                    <li className="dropdown-item">Voir</li>
                </LinkContainer>
                <li><a class="dropdown-item" href="#">Modifer</a></li>
                <li><a class="dropdown-item" onClick={handleDelete} >Suprimmer</a></li>
            </ul>
            </div>
        
        
        </td>

      </tr>
    )
}
export default CnsTd