import React,{useState,useEffect} from 'react'
import { Col, Container, Row,Badge } from 'react-bootstrap'
import {IconContext} from "react-icons"
import Loading from "../../helpers/loading"
import Empty from '../../helpers/empty'
import { FiMapPin,FiBriefcase,FiMail,FiPhone,FiShield,FiLinkedin } from "react-icons/fi";
import { useParams} from "react-router";
import CandCard from './CandCard'
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/'
});
function Candidates(){
    const {id} = useParams();
    const [candidateurs, setCandidateurs] = useState([])
    const [jobDetails,setJobDetails]= useState([])
    const [loading, setLoading] = useState(false);
    const [loadingCad, setLoadingCad] = useState(false);
    useEffect(() => {
        setLoading(true)
        api.get(`api/jobs/${id}`)
        .then((res)=>{
            //console.log(res.data)
            setJobDetails(res.data)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])
    useEffect(() => {
        setLoadingCad(true)
        api.get(`admin/applicants?jobId=${id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              },
        }).then((res)=>{
            setLoadingCad(false)
            //console.log(res.data)
            setCandidateurs(res.data)
        }).catch((err)=>{
            console.log(err)
            setLoadingCad(false)
    
        })
        api.get(`admin/applications/61d219ecab066b0042c85ccd`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              },
        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
    
        })
    }, [])
    return (
        <>
       <Container>
           <Row>
               {loading?(<Col xl={12}><Loading />)</Col>):( <Col xl={12} >

            <div className="info-tete d-flex ">           
              <div className="img-mi">
              <img src={jobDetails.jobImage} className="mission-pic" />
              </div>
             <div className="infos-mission">
             <h3>{jobDetails.title} </h3>
              <p>
                  <IconContext.Provider value={{className:"icon-single"}}>
                      <FiMapPin/>
                  </IconContext.Provider> 
                  Adresse : {jobDetails.address}                                  </p>
              <p>
                  <IconContext.Provider value={{className:"icon-single"}}>
                      <FiShield/>
                  </IconContext.Provider>
                 Experince : {jobDetails.experince}</p>
              <p>
                  <IconContext.Provider value={{className:"icon-single"}}>
                      <FiShield/>
                  </IconContext.Provider>
                 Domain : {jobDetails.domain}</p>
              <p>
                  <IconContext.Provider value={{className:"icon-single"}}>
                      <FiShield/>
                  </IconContext.Provider>
                 Rythm de traville : {jobDetails.jobType}                                  
                 </p>
                 <p>
                  <IconContext.Provider value={{className:"icon-single"}}>
                      <FiShield/>
                  </IconContext.Provider>
                Contart : {jobDetails.contrat}                                  
                 </p>
                 <p>
                  <IconContext.Provider value={{className:"icon-single"}}>
                      <FiShield/>
                  </IconContext.Provider>
                  Salaire : {jobDetails.salary} DZD                            
                 </p>
                 <ul className="d-flex skills">
                    {(jobDetails.skillsets||[]).map((skill)=>(
                    <li><Badge bg="primary badge-skill">{skill} </Badge></li>

                    ))}

                </ul>     
             </div>

</div>
</Col>)}
              
           </Row>
       </Container>
       <Container className="lesCands">
            <div>
                <h5>Les Candidateurs</h5>

            </div>
            {loadingCad?(<Loading/>):(<> {candidateurs.length>0 ?(
                 <Row>

                 {candidateurs.map(candidateur=>(
                         <CandCard idx={candidateur._id}  detail={candidateur}/>
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
export default Candidates