import { Container, Row,Col,Button , Card,Table} from 'react-bootstrap'
import React,{useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import MissionService from '../services/MissionService'
import { FiMoreVertical,FiBriefcase,FiUsers,FiDatabase } from "react-icons/fi";
import {IconContext} from "react-icons"
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function Trmiss(props) {
    const {detail}= props;
    const handleDelete=()=>{
        console.log(detail._id); 
        api.delete(`/jobs/${detail._id}`).then((res)=>{
            console.log(res.data)
            window.location.reload(true);
        }).catch((err)=>{
            console.log(err.res)
        })
    }
    
    return(
        <tr>   
        <td><img src={detail.jobImage} style={{"width":"48px"}} /> </td>                                         
        <td>{detail.title} </td>
        <td>{detail.name} </td>
        <td>{detail.contrat} </td>
        <td>{detail.jobType} </td>
        <td>{detail.domain} </td>
        <td>{detail.experince} </td>
        <td>{detail.address} </td>
        <td>{new Date(detail.dateOfPosting).toLocaleDateString()}</td>

        <td>
        <div class="btn-group">
            <button type="button" className="btn btn-action-table  " data-bs-toggle="dropdown" aria-expanded="false">
                <IconContext.Provider value={{className:"icon-table"}}>
                <FiMoreVertical/>

                </IconContext.Provider>
            </button>
            <ul class="dropdown-menu">
            <LinkContainer to={`/candidates/${detail._id}`}>
                <li className="dropdown-item">Voir</li>
                </LinkContainer>
                <LinkContainer to={`/modifierjob/${detail._id}`}>
                <li className="dropdown-item">Modifer</li>
                </LinkContainer>                
                <li><a class="dropdown-item" onClick={handleDelete}  >Suprimmer</a></li>
            </ul>
            </div>
        
        
        </td>

</tr>
    )
}
export default Trmiss