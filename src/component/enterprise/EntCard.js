import React,{useState,useEffect} from 'react'
import { Container, Row,Col,Button , Card} from 'react-bootstrap'
import { FiMapPin,FiMail,FiPhone,FiShield,FiLinkedin,FiGlobe,FiMoreVertical } from "react-icons/fi";
import { LinkContainer } from 'react-router-bootstrap'
import {IconContext} from "react-icons"
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});

function EntCard(props){
    const {en} = props;
    const handleDelete=()=>{
        console.log(en._id); 
        api.delete(`/ent/${en._id}`).then((res)=>{
            console.log(res.data)
            window.location.reload(true);
        }).catch((err)=>{
            console.log(err.res)
        })
    }
    return (<Col xl={12}>       
        <div className="card mb-3 Cand-Card" >
            <div className="row no-gutters">
                <div className="col-md-2">
                <img src={en.imageUser} className=" Cand-pic card-img" alt="..."/>
                </div>
                <div className="col-md-9">
                
                <div className="card-body">
                    <div className="main-info">
                    <h5 className="card-title bold"><b>{en.name}</b> </h5>
                    <div className="d-flex">
                    <p class="card-text ">
                    <IconContext.Provider value={{className:"icon-Cn"}}>
                                  <FiMail/>
                    </IconContext.Provider>
                   Email : {en.email} 
                    </p>
                    <p class="card-text">
                    <IconContext.Provider value={{className:"icon-Cn"}}>
                                  <FiPhone/>
                    </IconContext.Provider>
                        Phone : {en.phone}
                    </p>

                    </div>
                    <div className="d-flex">
                    <p class="card-text ">
                    <IconContext.Provider value={{className:"icon-Cn"}}>
                                  <FiMapPin/>
                    </IconContext.Provider>
                   Address : {en.address} 
                    </p>

                    </div>
                    <p class="card-text">
                    <IconContext.Provider value={{className:"icon-Cn"}}>
                                  <FiLinkedin/>
                    </IconContext.Provider>
                       Website :  <a href={`${en.website}`}> {en.website}</a> 
                        
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
                                <LinkContainer to={`/monenterprise/${en.userId} `}>
                            <li className="dropdown-item">Voir les Offres</li>
                            </LinkContainer>
                            <li><a className="dropdown-item" onClick={handleDelete} >Suprimmer</a></li>
                            </ul>
                        </div>                    
                </div>
            </div>
            </div>
</Col>
)
}
export default EntCard