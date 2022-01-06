import React,{useState,useEffect} from 'react'
import { Container, Row,Col,Button , Card,Table} from 'react-bootstrap'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { FiMoreVertical,FiBriefcase,FiUsers,FiDatabase } from "react-icons/fi";
import {IconContext} from "react-icons"
import Loading from '../../helpers/loading'
import Empty from '../../helpers/empty'

const api = axios.create({  
    baseURL:'http://localhost:4444/admin'
});

function ConsultansTable() {
    const[consultans,setConsultans] = useState([])
    const [loading, setLoading]=useState(false)

    useEffect(() => {
        setLoading(true)
        api.get('/consultans',{
            headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            }
                },)
        .then((res)=>{
           console.log(res.data);
            setConsultans(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
        
     }, [])
    return(
        <>
         
    <Container className="consultants">
   
    {loading ?( <Row><Loading/></Row>)
    :(
        <>
        <Row>
        <h4>List des Nouveaux  Consultants</h4>
            {consultans.length>0?( <Col xl={12}> 
                    <Table responsive   hover size="xl" className="tablemission">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nom de Consultant</th>
                                        <th>email</th>
                                        <th>phone</th>
                                        <th>Domaine</th>
                                        <th>Experince</th>
                                        <th>Address</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consultans.map(consultant=>(
                                        <tr idx={consultant._id}>
                                            <td>{consultant.userId} </td>
                                            <td>{consultant.name} </td>
                                            <td>{consultant.email} </td>
                                            <td>{consultant.phone} </td>
                                            <td>{consultant.domain} </td>
                                            <td>{consultant.experince} </td>
                                            <td>{consultant.address} </td>
                                            <td>
                                            <div class="btn-group">
                                                <button type="button" className="btn btn-action-table  " data-bs-toggle="dropdown" aria-expanded="false">
                                                    <IconContext.Provider value={{className:"icon-table"}}>
                                                    <FiMoreVertical/>
        
                                                    </IconContext.Provider>
                                                </button>
                                                <ul class="dropdown-menu">
                                                <LinkContainer to="/">
                                                    <li className="dropdown-item">Voir</li>
                                                    </LinkContainer>
                                                    <li><a class="dropdown-item" href="#">Modifer</a></li>
                                                    <li><a class="dropdown-item"  >Suprimmer</a></li>
                                                </ul>
                                                </div>
                                            
                                            
                                            </td>
        
                                    </tr>
                                    ))}
                                    
                                </tbody>
                    </Table>
            </Col>):(<Empty/>)}

           
        </Row>
        </>
   
    )
    }
   
  
</Container>


       {/* <Container>
            <Row>
                <h4>List des users</h4>
           <Col xl={12}> <Table responsive   hover size="xl" className="tablemission">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom de Consultant</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(consultant=>(
                            <tr idx={consultant._id}>
                                <td>{consultant._id} </td>
                                <td>{consultant.name} </td>
                                <td>{consultant.email} </td>
                                <td>{consultant.type} </td>
                               
                                <td>
                                <div class="btn-group">
                                    <button type="button" className="btn btn-action-table  " data-bs-toggle="dropdown" aria-expanded="false">
                                        <IconContext.Provider value={{className:"icon-table"}}>
                                        <FiMoreVertical/>

                                        </IconContext.Provider>
                                    </button>
                                    <ul class="dropdown-menu">
                                    <LinkContainer to="/">
                                        <li className="dropdown-item">Voir</li>
                                        </LinkContainer>
                                        <li><a class="dropdown-item" href="#">Modifer</a></li>
                                        <li><a class="dropdown-item"  >Suprimmer</a></li>
                                    </ul>
                                    </div>
                                
                                
                                </td>

                        </tr>
                        ))}
                        
                    </tbody>
        </Table>
           </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <h4>List des users</h4>
           <Col xl={12}> <Table responsive   hover size="xl" className="tablemission">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom de Consultant</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recruiter.map(consultant=>(
                            <tr idx={consultant._id}>
                                <td>{consultant._id} </td>
                                <td>{consultant.name} </td>
                                <td>{consultant.email} </td>
                                <td>{consultant.type} </td>
                               
                                <td>
                                <div class="btn-group">
                                    <button type="button" className="btn btn-action-table  " data-bs-toggle="dropdown" aria-expanded="false">
                                        <IconContext.Provider value={{className:"icon-table"}}>
                                        <FiMoreVertical/>

                                        </IconContext.Provider>
                                    </button>
                                    <ul class="dropdown-menu">
                                    <LinkContainer to="/">
                                        <li className="dropdown-item">Voir</li>
                                        </LinkContainer>
                                        <li><a class="dropdown-item" href="#">Modifer</a></li>
                                        <li><a class="dropdown-item"  >Suprimmer</a></li>
                                    </ul>
                                    </div>
                                
                                
                                </td>

                        </tr>
                        ))}
                        
                    </tbody>
        </Table>
           </Col>
            </Row>
        </Container>*/}
        </>
      
    )
}
export default ConsultansTable


