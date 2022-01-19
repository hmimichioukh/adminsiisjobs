import React,{useState,useEffect} from 'react'
import { Col,Card,Button,Badge,Row } from 'react-bootstrap'
import {IconContext} from "react-icons"
import { FiMapPin,FiBriefcase,FiMail,FiPhone,FiShield,FiLinkedin } from "react-icons/fi";
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/api'
});
function MyCand(props) {
    const {detail}=props
    const [jobdetails,setJobDetails] =useState([])
    console.log(detail)
    const [applicant,setApplicant] = useState(detail.jobApplicant)
    const[applicationInfo,setApplicationInfo]= useState(detail)
    useEffect(() => {
       api.get(`/jobs/${detail.jobId}`).then((res)=>{
           console.log(res)
           setJobDetails(res.data)
       }).catch((err) => {
           console.log(err)
       })
    }, [])
    const colorSet = {
        applied: "#3454D1",
        entertien:"#DC851F",
        accepted: "#09BC8A",
        rejected: "#D1345B",
        deleted: "#B49A67",
        cancelled: "#FF8484",
        finished: "#4EA5D9",
      };
        const refuse=(status)=>{
           const statusData={
               status:status,
               dateOfJoining:new Date().toISOString(),
           };
                api.put(`/applications/${detail._id}`,statusData,{
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                      }, 
                }).then((res)=>{

                    console.log(res)
                    window.location.reload()
                }).catch((err)=>{
                    console.log(err)
                })
           
        }
        const accepet=(status)=>{
            const statusData={
                status:status,
                dateOfJoining:new Date().toISOString(),
            };
                 api.put(`/applications/${detail._id}`,statusData,{
                     headers: {
                         Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                       }, 
                 }).then((res)=>{
                           
                     console.log(res)
                     window.location.reload()
                 }).catch((err)=>{
                     console.log(err)
                 })
            
         }

        
         const ButtonStatus ={
          applied :(
          <>
            <Button style={{background: colorSet["entertien"],color: "#ffffff",}}      onClick={()=>accepet("entertien")}  className="accepte-btn"  >Entertien</Button>
            <Button style={{background: colorSet["rejected"],color: "#ffffff",}}      onClick={()=>refuse("rejected")}     className="accepte-btn"  >Refuser</Button>
          </>
          ),
          entertien :(
            <>
              <Button style={{background: colorSet["accepted"],color: "#ffffff",}}    onClick={()=>accepet("accepted")}  className="accepte-btn"  >Accept</Button>
              <Button style={{background: colorSet["rejected"],color: "#ffffff",}}      onClick={()=>refuse("rejected")}     className="accepte-btn"  >Refuser</Button>
            </>
            ),
         rejected :(
            <>
              <Button style={{background: colorSet["rejected"],color: "#ffffff",}}  className="accepte-btn"  >Refuser</Button>
            </>
                ),
         accepted :(
                <>
                  <Button style={{background: colorSet["accepted"],color: "#ffffff",}}  className="accepte-btn"  >Accepted</Button>
                </>
                ),
        cancelled :(
                <>
                   <Button style={{background: colorSet["cancelled"],color: "#ffffff",}}  className="accepte-btn"  >Cancelled</Button>
                </>
                    ),
        finished :(
                <>
                    <Button style={{background: colorSet["finished"],color: "#ffffff",}}  className="accepte-btn"  >Finished</Button>
                </>
                            ),
         }
         
    //console.log(applicationInfo)
    return (        
        <Col xl={4} className="Card-Cand-Job card-pro" >
        <Card  style={{ width: '18rem' }} className="card-job">
        <Badge bg="badge badge-skill" style={{
            background: colorSet[detail.status],
            color: "#ffffff",
          }} >{detail.status} </Badge>

            <Row>
                <Col xl={4}> 
                     <Card.Img variant="top" className="card-job-img" src={jobdetails.jobImage} />
                </Col>
                <Col xl={8}> 
                <div className="job-info-ess">
                    <h6>{jobdetails.title}</h6>
                    <p> <IconContext.Provider value={{size:18, className:"icon-card"}}><FiMapPin/></IconContext.Provider>  {jobdetails.address}</p>
                    <p> <IconContext.Provider value={{size:18, className:"icon-card"}}><FiBriefcase/></IconContext.Provider>{jobdetails.experince}</p>
                </div>
                </Col>
            </Row>
            <Card.Body>
            <Card.Text>
            {jobdetails.subtitle}                
            </Card.Text>
            <ul className="d-flex skills">
                
            {(jobdetails.skillsets|| []).map((skill)=>(
                <li><Badge bg="primary badge-skill">{skill} </Badge></li>

                ))}
            </ul>
           
            </Card.Body>
        </Card>
         </Col>
         
    )
}

export default MyCand
