import React,{useState,useEffect} from 'react'
import { Col, Container, Row,Badge } from 'react-bootstrap'
import {IconContext} from "react-icons"
import Loading from "../../helpers/loading"
import Empty from '../../helpers/empty'
import { FiMapPin,FiMail,FiPhone,FiShield,FiLinkedin,FiGlobe,FiMoreVertical } from "react-icons/fi";
import { useParams} from "react-router";
import MyCand from './Mycand'
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function MesCandidates(){
    const {id} = useParams();
    const [candidateurs, setCandidateurs] = useState([])
    const [user, setUser] = useState([])
    const [jobDetails,setJobDetails]= useState([])
    const [loading, setLoading] = useState(false);
    const [loadingCad, setLoadingCad] = useState(false);
    useEffect(() => {
        api.get(`/applicant/${id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              },
        }).then((res)=>{
            //console.log(res.data);
            setUser(res.data)
        })
        api.get(`/applications/${id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              },
        }).then((res)=>{
            console.log(res.data);
            setCandidateurs(res.data)
        })
    }, [])
    return (
        <>
        <Container>
                <Row>
                <Col xl={12}>       
            <div className="card mb-3 Cand-Card" >
                <div className="row no-gutters">
                    <div className="col-md-2">
                    <img src={user.imageUser} className="Cand-pic card-img" alt="..."/>
                    </div>
                    <div className="col-md-9">
                    
                    <div className="card-body">
                        <div className="main-info">
                        <h5 className="card-title bold"><b>{user.name}</b> </h5>
                        <div className="d-flex">
                        <p class="card-text ">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiMail/>
                        </IconContext.Provider>
                       Email :  {user.email}
                        </p>
                        <p class="card-text">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiPhone/>
                        </IconContext.Provider>
                            Phone :{user.phone}
                        </p>

                        </div>
                        <div className="d-flex">
                        <p class="card-text ">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiGlobe/>
                        </IconContext.Provider>
                       Domain : {user.domain}
                        </p>
                        <p class="card-text">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiShield/>
                        </IconContext.Provider>
                            Experince : {user.experince}
                        </p>

                        </div>
                        <p class="card-text">
                        <IconContext.Provider value={{className:"icon-Cn"}}>
                                      <FiLinkedin/>
                        </IconContext.Provider>
                           LinkednIn :  <a href={`${user.linkend}`}> {user.linkend}</a>
                            
                        </p>

                        </div>
                        
                    </div>
                    </div>
                   
                </div>
                </div>
    </Col>
                </Row>
        </Container>
       <Container className="lesCands">
            <div>
                <h5>Les Candidateurs</h5>

            </div>
            {loadingCad?(<Loading/>):(<> {candidateurs.length>0 ?(
                 <Row>

                 {candidateurs.map(candidateur=>(
                         <MyCand idx={candidateur._id}  detail={candidateur}/>
                 ))}
               </Row>
            ):(
            <Row>
              <Empty/>
            </Row>
            )}</>)}
           
             
       </Container>
        </>
 )
}
export default MesCandidates