import React,{useState,useEffect} from 'react'
import { Container, Row,Col,Button , Card} from 'react-bootstrap'
import ConsultansTable from '../component/Dashboard/ConstultansTables'
import { FiMapPin,FiMail,FiPhone,FiShield,FiLinkedin,FiGlobe,FiMoreVertical } from "react-icons/fi";
import { LinkContainer } from 'react-router-bootstrap'
import Hmimi from "../assetes/image/hmimi.jpg"
import {IconContext} from "react-icons"
import Loading from '../helpers/loading'
import Empty from '../helpers/empty'
import EntCard from '../component/enterprise/EntCard'
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});

function Enterprise(){
    const [enterprise,setEnterprise] = useState([])
    const [loading, setLoading]=useState(false)

    useEffect(() => {
        setLoading(true)
        api.get('recruiter',{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
        })
        .then((res)=>{
            setEnterprise(res.data)
            setLoading(false)
            //console.log(res.data)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }, [])
return(
    <section>
        <Container className="mb-3">
            <Row>
                <Col xl={10}>
                <h4>Les Enterprises</h4>
                </Col>
                <Col xl={2}>
                <LinkContainer to="/addenterprise">
                    <Button>Ajouter  Une Enterprise </Button>
                    </LinkContainer>
                </Col>
            </Row>
        </Container>
        <Container>
            {loading?(<Loading/>)
            :(<Row>
                {enterprise.map(en=>(
                    <EntCard en={en}/>
                ))}
            </Row>)}
            
        </Container>

    </section>
)
}
export default Enterprise