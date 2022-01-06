import React,{useState,useEffect} from 'react'
import { Col,Card,Button,Badge,Row,Container } from 'react-bootstrap'
import {IconContext} from "react-icons"
import { LinkContainer } from 'react-router-bootstrap'
import { FiMapPin,FiMail,FiPhone,FiShield,FiLinkedin,FiGlobe,FiMoreVertical } from "react-icons/fi";
import SingleMessage from '../component/messages/singleMessage'
import axios from 'axios'
const api = axios.create({  
    baseURL:'http://localhost:4444/admin'
});
function Messages() {
const [messages,setMessages] = useState([])
useEffect(() => {
    api.get('/messages',{
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
    }).then((response) =>{
        console.log(response)
        setMessages(response.data)
    }).catch((error) =>{
        console.error(error)
    })
}, [])
    return(
        <section>
            <Container>
                <Row>
                   <Col xl={9}>
                   <h4>Mes Messages</h4>
                   </Col>
                   <Col xl={3}>
                   </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    {(messages ||[]).map(message=>(
                        <SingleMessage idx={message._id} detail={message} />
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default Messages