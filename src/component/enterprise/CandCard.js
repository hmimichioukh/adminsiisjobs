import React,{useState,useEffect} from 'react'
import { Col,Card,Button,Badge } from 'react-bootstrap'
import {IconContext} from "react-icons"
import { FiMapPin,FiBriefcase,FiMail,FiPhone,FiShield,FiLinkedin } from "react-icons/fi";
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/api'
});
function Candidateur(props) {
    const {detail}=props
    const [applicant,setApplicant] = useState(detail.jobApplicant)
    const[applicationInfo,setApplicationInfo]= useState(detail)
    const colorSet = {
        applied: "#3454D1",
        entertien:"#DC851F",
        accepted: "#09BC8A",
        rejected: "#D1345B",
        deleted: "#B49A67",
        cancelled: "#FF8484",
        finished: "#4EA5D9",
      }; 
    //console.log(applicationInfo)
    return (
        <Col xl={4}>
           <Card className="Cand-Card">
                <Badge bg="badge " style={{
                background: colorSet[detail.status],
                color: "#ffffff",}} >
                {detail.status} </Badge>
                <Card.Img variant="top" src={applicant.imageUser} className="Cand-pic justify-content-center" /> 
                <Card.Body>
                    <Card.Title>{applicant.name} </Card.Title>
                    <Card.Text>
                             <p>
                                  <IconContext.Provider value={{className:"icon-single"}}>
                                      <FiShield/>
                                  </IconContext.Provider>
                                   Experince : {applicant.experince || "No experince "}
                              </p>
                              <p>
                                  <IconContext.Provider value={{className:"icon-single"}}>
                                      <FiBriefcase/>
                                  </IconContext.Provider>
                                  Post : {applicant.domain || "No Domain "}
                                </p>
                                <p>
                                  <IconContext.Provider value={{className:"icon-single"}}>
                                      <FiLinkedin/>
                                  </IconContext.Provider>
                                  LinkednIn : <a href={`${applicant.linkend}`}>{applicant.linkend || "No LinkendIn "} </a>

                                </p>
                                <p>
                                  <IconContext.Provider value={{className:"icon-single"}}>
                                      <FiMail/>
                                  </IconContext.Provider>
                                  Email : <a href={`mailto:${applicant.email}`}>{applicant.email} </a>

                                </p>
                                <p>
                                  <IconContext.Provider value={{className:"icon-single"}}>
                                      <FiPhone/>
                                  </IconContext.Provider>
                                  Telephone : {applicant.phone} 

                                </p>
                    </Card.Text>
                    <h5>Message De Motivation</h5>
                    <Card.Text>

                        {applicationInfo.sop}
                    </Card.Text>
                    <div className="d-flex">
                   
                    <a href={`${applicant.cv}` } target="_blank">Telecharge le CV </a>
                    </div>
                </Card.Body>
                </Card>
        </Col>
    )
}

export default Candidateur
