import React,{useState,useEffect} from "react";
import { Col, Container,Card, Row,Form,Button } from 'react-bootstrap';
import { useParams} from "react-router";
import {FiBriefcase,FiGlobe,FiShield,FiMapPin} from "react-icons/fi"
import {IconContext} from "react-icons"
import Empty from '../../helpers/empty'
import OffreCard from './offer'
import axios from 'axios';
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/api'
});
function Offres() {
    const {id} = useParams();
    const [data,setData]=useState([])
    const [jobs,setJobs]=useState([])

    useEffect(() => {
        api.get(`/enterprise/${id}`)
        .then((res)=>{
            setData(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
        api.get(`/enterpriseJobs/${id}`)
        .then((res)=>{
            setJobs(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])    
    return (
        <section>
  <Container>
                <Row>
                    <Col xl={12}>
                    <div className="card mb-3 Cand-Card" >
                <div className="row no-gutters">
                    <div className="col-md-2">
                    <img src={data.imageUser} className=" Cand-pic card-img" alt="..."/>
                    </div>
                    <div className="col-md-9">
                    
                    <div className="card-body">
                        <div className="main-info">
                        <h5 className="card-title bold"><b>{data.name}</b> </h5>
                        <p class="card-text">
                        <IconContext.Provider value={{className:"icon-card"}}>
                                      <FiBriefcase/>
                        </IconContext.Provider>
                            Phone : {data.phone}
                        </p>

                        <p class="card-text ">
                        <IconContext.Provider value={{className:"icon-card"}}>
                                      <FiGlobe/>
                        </IconContext.Provider>
                       Website :  {data.webUrl}
                        </p>
                        <p class="card-text">
                        <IconContext.Provider value={{className:"icon-card"}}>
                                      <FiShield/>
                        </IconContext.Provider>
                        Domain :  {data.domain}
                        </p>

                        <p class="card-text">
                        <IconContext.Provider value={{className:"icon-card"}}>
                                      <FiMapPin/>
                        </IconContext.Provider>
                        Address :  {data.address}

                        </p>

                        </div>
                        
                    </div>
                    </div>
                </div>
                </div>
                    </Col>
                </Row>
            </Container>        
            <Container className="jobsAll">
                {jobs.length>0?(
                      <Row>
                          {(jobs || []).map((job) =>(
                                 <OffreCard idx={job._id} detail={job}/>

                          ))}
                     </Row>
                ):(
                    <Row>
                        <Empty/>
                    </Row>
                )}
              
            </Container>
            
            
            </section>
    )
}

export default Offres
