import React,{useState,useEffect} from 'react'
import { Col,Card,Button,Badge,Row,Modal } from 'react-bootstrap'
import {IconContext} from "react-icons"
import { LinkContainer } from 'react-router-bootstrap'
import { FiMail,FiGlobe,FiMoreVertical } from "react-icons/fi";
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function PartCard(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {detail}=props
    //console.log(detail)
    const DeletePart=()=>{
        api.delete(`/partenaire/${detail._id}`,{
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }).then((res)=>{
              console.log(res)
              window.location.reload()
          })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Suprimmer le Parteniar {detail.name} </Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, Vous etes Sur vous voulez supprimer ce partenaire ?!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No je veux Pas
                </Button>
                <Button variant="danger" onClick={DeletePart} >
                Supprimer               
                 </Button>
                </Modal.Footer>
            </Modal>
            <Col xl={4}>       
                <div className="card" style={{"width": "18rem","marginBottom":"30px"}}>
                    <img src={detail.partImage} class="card-img-top" alt="partenaire logo" style={{"width": "200px","height":"120px","padding":"18px"}} />
                    <div className="card-body">
                        <h2 className="card-title">{detail.name}</h2>
                        <Button  className="btn btn-primary" onClick={handleShow}>Suprimmer Ce Parteniar</Button> 
                    </div>
                    </div>
             </Col>
    </>

    )
}
export default PartCard
