import React,{useState,useEffect} from 'react'
import { Col,Card,Button,Badge,Row } from 'react-bootstrap'
import {IconContext} from "react-icons"
import { LinkContainer } from 'react-router-bootstrap'
import { FiMapPin,FiMail,FiPhone,FiShield,FiLinkedin,FiGlobe,FiMoreVertical } from "react-icons/fi";
import Hmimi from "../../assetes/image/hmimi.jpg"
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function ConsCard(props) {
    const {detail}=props
    const handleDelete=()=>{
        console.log(detail._id); 
        api.delete(`/users/${detail._id}`).then((res)=>{
            console.log(res.data)
            window.location.reload(true);
        }).catch((err)=>{
            console.log(err.res)
        })
    }
    return (
        <Col xl={12}>       
            <div className="card mb-3 Cand-Card" >
                <div className="row no-gutters">
                    <div className="col-md-2">
                    <img src={detail.imageUser} className=" Cand-pic card-img" alt="..."/>
                    </div>
                    <div className="col-md-9">
                    
                    <div className="card-body">
                        <div className="main-info">
                        <h5 className="card-title bold"><b>{detail.name}</b> </h5>
                        <div className="d-flex">
                        <p class="card-text ">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiMail/>
                        </IconContext.Provider>
                       Email : {detail.email} 
                        </p>
                        <p class="card-text">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiPhone/>
                        </IconContext.Provider>
                            Phone : {detail.phone}
                        </p>

                        </div>
                        <div className="d-flex">
                        <p class="card-text ">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiGlobe/>
                        </IconContext.Provider>
                       Domain : {detail.domain} 
                        </p>
                        <p class="card-text">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiShield/>
                        </IconContext.Provider>
                            Experince : {detail.experince}
                        </p>

                        </div>
                        <p class="card-text">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiLinkedin/>
                        </IconContext.Provider>
                           LinkednIn :  <a href={`${detail.linkend}`}> {detail.linkend}</a> 
                            
                        </p>

                        </div>
                        
                    </div>
                    </div>
                    <div className="col-md-1">
                    <div className="btn-group" style={{"marginLeft":"20px"}}>
                            <button type="button" className="btn btn-action-table  " data-bs-toggle="dropdown" aria-expanded="false">
                                    <IconContext.Provider value={{className:"icon-table"}}>
                                <FiMoreVertical/>
                                </IconContext.Provider>
                            </button>
                                <ul className="dropdown-menu">
                                    <LinkContainer to={`/consultantcandidates/${detail.userId}`} >
                                <li className="dropdown-item">Voir</li>
                                </LinkContainer>
                                <li><a className="dropdown-item" href={`${detail.cv}`} target="_blank">Telecharger CV</a></li>
                                <li><a className="dropdown-item" onClick={handleDelete}  >Suprimmer</a></li>
                                </ul>
                            </div>                    
                    </div>
                </div>
                </div>
    </Col>
    )
}
export default ConsCard
