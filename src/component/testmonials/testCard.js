import React,{useState,useEffect} from 'react'
import { Col,Card,Button,Badge,Row } from 'react-bootstrap'
import {IconContext} from "react-icons"
import { LinkContainer } from 'react-router-bootstrap'
import { FiMail,FiGlobe,FiMoreVertical } from "react-icons/fi";
import axios from 'axios'
const api = axios.create({  
    baseURL:'http://localhost:4444/admin'
});
function TestCard(props) {
    const {detail}=props
    //console.log(detail)
    const deletTest=()=>{
        api.delete(`/testmonials/${detail._id}`,{
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }).then((res)=>{
            console.log(res)
            window.location.reload()
        })
    }
    return (
        <Col xl={12}>       
            <div className="card mb-3 Cand-Card" >
                <div className="row no-gutters">
                <div className="col-md-2">
                    <img src={detail.testImage} className=" Cand-pic card-img" alt="..."/>
                    </div>
                    <div className="col-md-9">
                    
                    <div className="card-body">
                        <div className="main-info">
                        <h5 className="card-title bold"><b>{detail.name}</b> </h5>
                        <div className="d-flex">
                        <p class="card-text ">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiGlobe/>
                        </IconContext.Provider>
                       Domain : {detail.domain}
                        </p>
                        </div>
                        <p class="card-text">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiMail/>
                        </IconContext.Provider>
                           Message : {detail.message}
                            
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
                                <li><a className="dropdown-item" onClick={deletTest}  >Suprimmer</a></li>
                                </ul>
                            </div>                    
                    </div>
                </div>
                </div>
    </Col>
    )
}
export default TestCard
/*
 <p>
                              <IconContext.Provider value={{className:"icon-single"}}>
                                  <FiShield/>
                              </IconContext.Provider>
                               Experince : {detail.experince}
                          </p>
                          <p>
                              <IconContext.Provider value={{className:"icon-single"}}>
                                  <FiBriefcase/>
                              </IconContext.Provider>
                              Post : {detail.domain}
                            </p>
                            <p>
                              <IconContext.Provider value={{className:"icon-single"}}>
                                  <FiLinkedin/>
                              </IconContext.Provider>
                              LinkednIn : <a href={`${detail.linkend}`}>{detail.linkend} </a>

                            </p>
                            <p>
                              <IconContext.Provider value={{className:"icon-single"}}>
                                  <FiMail/>
                              </IconContext.Provider>
                              Email : <a href={`mailto:${detail.email}`}>{detail.email} </a>

                            </p>
                            <p>
                              <IconContext.Provider value={{className:"icon-single"}}>
                                  <FiPhone/>
                              </IconContext.Provider>
                              Telephone : {detail.phone} 

                            </p>*/