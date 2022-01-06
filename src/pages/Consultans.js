import { Container, Row,Col,Button , Card,Table} from 'react-bootstrap'
import React,{useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import MissionService from '../services/MissionService'
import { FiMoreVertical,FiBriefcase,FiUsers,FiDatabase } from "react-icons/fi";
import ConsCard from "../component/Consultans/ConsCard";
import {IconContext} from "react-icons"
import axios from 'axios'
const api = axios.create({  
    baseURL:'http://localhost:4444/admin'
});
function Consultans() {
const [consultans, setConsultans] = useState([])
useEffect(  () => {
    api.get('/consultans',{
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
    })
    .then((res)=>
        {console.log(res.data)
        setConsultans(res.data)
    }).catch((err) =>{
        console.log(err)
    })
}, [])
    return (
        <section className="mesConsultnas">
     <Container className="mb-3">
            <Row>
                <Col xl={10}>
                <h4>Les Consultans</h4>
                </Col>
                <Col xl={2}>
                <LinkContainer to="/missions/add">
                    <Button>Ajouter un Consultan </Button>
                    </LinkContainer>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row> 
          {consultans.map(consult=>(
              <ConsCard idx={consult._id} detail={consult} />
          ))}
            </Row>
        </Container>
    </section>
    )
}

export default Consultans
