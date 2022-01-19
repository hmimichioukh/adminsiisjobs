import React from "react";
import { Row,Col,Card,Button,Badge } from "react-bootstrap";
import { FiBriefcase,FiMapPin } from "react-icons/fi";
import {IconContext} from "react-icons"
import {LinkContainer} from 'react-router-bootstrap'

function OffreCard(props){
   const { detail } = props;
    //console.log(info.jobImage)
  
    return(
        
    
       <Col xl={4}>
           <div className="Card-Search-Job">
            <Card  style={{ width: '18rem' }} className="card-job">
                <Row>
                    <Col xl={4}> 
                         <Card.Img variant="top" className="card-job-img" src={detail.jobImage} />
                    </Col>
                    <Col xl={8}> 
                    <div className="job-info-ess">
                        <h6>{detail.title}</h6>
                        <p> <IconContext.Provider value={{size:18, className:"icon-card"}}><FiMapPin/></IconContext.Provider>{detail.address}  </p>
                        <p> <IconContext.Provider value={{size:18, className:"icon-card"}}><FiBriefcase/></IconContext.Provider>{detail.experince}  </p>
                    </div>
                    </Col>
                </Row>
                <Card.Body>
                <Card.Text>
                {detail.subtitle}                 
                </Card.Text>
                <ul className="d-flex skills">
                    {(detail.skillsets || []).map((skill)=>(
                    <li><Badge bg="primary badge-skill">{skill} </Badge></li>

                    ))}

                </ul>
                <LinkContainer to={`/candidates/${detail._id}`}>
                    <Button variant="primary btn-apply">Voir les Candidates</Button>
                </LinkContainer>
                </Card.Body>
            </Card>
        </div>
       </Col>
       
  )
}
export default OffreCard