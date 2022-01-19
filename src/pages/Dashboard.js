import React,{useState,useEffect} from 'react'
import { Container, Row,Col,Button , Card} from 'react-bootstrap'
import ConsultansTable from '../component/Dashboard/ConstultansTables'
import {FiBriefcase,FiUsers,FiDatabase } from "react-icons/fi";
import {LinkContainer} from "react-router-bootstrap"
import {IconContext} from "react-icons"

import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function Dashboard() {
    const[users,setUsers]=useState([])
    const [loading, setLoading]=useState(false)
    const[jobs,setJobs] = useState([])
    const[consultans,setConsultans] = useState([])
    const[recruiter,setRecruiter] = useState([])
    const [total,setTotal] = useState("")
useEffect(() => {
   api.get('/users',{
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
})
   .then((res)=>{
       //console.log(res);
       setUsers(res.data)
   }).catch((err) => {
       console.log(err);
   })
   api.get('/consultans',{
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
})
   .then((res)=>{
      // console.log(res);
       setConsultans(res.data)
   }).catch((err) => {
       console.log(err);
   })
   api.get('/recruiter',{
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
})
   .then((res)=>{
       //console.log(res);
       setRecruiter(res.data)
   }).catch((err) => {
       console.log(err);
   })
   api.get('/countjobs') .then((res)=>{
       //console.log(res.data);
       setJobs(res.data.data)
       setTotal(res.data.total)
   }).catch((err) => {
       console.log(err);
   })
}, [])
const usersLength = users.length
const consultansLength = consultans.length
const recruiterLength = recruiter.length
//const jobsLength = jobs.length

    return (
       <>
       <section className="dashboard">
           <Container>
               <Row>
                   <Col xl={4}>
                   <Card  className="dashboard-card">
                        <Card.Body>
                        <IconContext.Provider value={{className:"icon-table icon-dash"}}><FiBriefcase/></IconContext.Provider>
                            <Card.Title>Total des Offres d'emplois</Card.Title>
                            <Card.Text>
                            {total}
                            </Card.Text>
                            <LinkContainer to="/missions">
                                 <Button variant="primary">Voir Les Offres</Button>
                            </LinkContainer>
                        </Card.Body>
                        </Card>
                   </Col>
                   <Col xl={4}>
                   <Card  className="dashboard-card">
                        <Card.Body>
                        <IconContext.Provider value={{className:"icon-table icon-dash"}}><FiBriefcase/></IconContext.Provider>
                            <Card.Title>Total Chercheurs d'emplois</Card.Title>
                            <Card.Text>
                            {consultansLength}
                            </Card.Text>
                            <LinkContainer to="/consultans">
                                 <Button variant="primary">Voir Les Chercheurs</Button>
                            </LinkContainer>                        
                            </Card.Body>
                        </Card>
                   </Col>
                   <Col xl={4}>
                       <Card  className="dashboard-card">
                        <Card.Body>
                        <IconContext.Provider value={{className:"icon-table icon-dash"}}><FiDatabase/></IconContext.Provider>
                            <Card.Title>Total  Enterprise</Card.Title>
                            <Card.Text>
                            {recruiterLength}
                            </Card.Text>
                            <LinkContainer to="/enterprise">
                                 <Button variant="primary">Voir Les Enterprises</Button>
                            </LinkContainer>                        
                            
                             </Card.Body>
                        </Card>
                   </Col>
               </Row>
           </Container>
       </section>
       <section>
           <ConsultansTable/>
       </section>
       
       </>
    )
}

export default Dashboard
