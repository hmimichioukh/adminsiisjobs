import { Container, Row,Col,Button , } from 'react-bootstrap'
import React,{useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import ConsCard from "../component/Consultans/ConsCard";
import Loading from '../helpers/loading'
import Empty from '../helpers/empty'
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function Consultans() {
const [consultans, setConsultans] = useState([])
const [loading, setLoading]=useState(false)

useEffect(  () => {
    setLoading(true)
    api.get('/consultans',{
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
    })
    .then((res)=>
        {console.log(res.data)
        setConsultans(res.data)
        setLoading(false)
    }).catch((err) =>{
        console.log(err)
        setLoading(false)

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
                <LinkContainer to="/addconsultant">
                    <Button>Ajouter un Consultan </Button>
                    </LinkContainer>
                </Col>
            </Row>
        </Container>
        <Container>
            {loading?(<Loading/>
            ):(
                <Row> 
                {consultans.map(consult=>(
                    <ConsCard idx={consult._id} detail={consult} />
                ))}
                  </Row>
            )}
          
        </Container>
    </section>
    )
}

export default Consultans
