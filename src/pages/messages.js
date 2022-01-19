import React,{useState,useEffect} from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import SingleMessage from '../component/messages/singleMessage'
import Loading from '../helpers/loading'
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function Messages() {
const [messages,setMessages] = useState([])
const [loading, setLoading]=useState(false)

useEffect(() => {
    setLoading(true)
    api.get('/messages',{
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
    }).then((response) =>{
        setLoading(false)
        console.log(response)
        setMessages(response.data)
    }).catch((error) =>{
        console.error(error)
        setLoading(false)

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
                {loading?(<Loading/>):( 
                <Row>
                    {(messages ||[]).map(message=>(
                        <SingleMessage idx={message._id} detail={message} />
                    ))}
                </Row>)}
               
            </Container>
        </section>
    )
}

export default Messages