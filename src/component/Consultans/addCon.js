import React,{useState,useEffect} from 'react'
import {Container, Row,Col,Button ,Form} from 'react-bootstrap'
import Loading from '../../helpers/loading'
import ErrorMessage from '../../helpers/errormessage'
import { useHistory } from "react-router-dom";

import axios from 'axios'
const api = axios.create({  
   baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function AddCon() {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null);
    const [user,setUser]= useState({
       name:"",
       email:"",
       password:"",
       phone:"",
       type:"applicant"

   })
   let history = useHistory();
   const [signupError, setSignupError] = useState({
    errorEmail:false ,
    errorPassword:false ,
    errorName:false ,
    errorPhone:false ,
  });
   const handleInput = (e) => {
    const {name,value} = e.target;
    setUser({...user, [name]:value });
  };
  const addCont=(e)=>{
      e.preventDefault();
      if(!user.name || !user.email || !user.password || !user.phone){
          setMessage("Svp Remplir les Champs")
      }else{
          setMessage("")

          setLoading(true)
          const data = api.post('/consultant',user,{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              },
          }).then((res)=>{
              setLoading(false)
              console.log(res.data)
              setMessage(res.data.message)
              history.push("/consultans");

          }).catch((err)=>{
              setLoading(false)
              console.log(err.response)
              setError("Il y un problem")

            })
      }
  }
    return (
        <Container>
            <Row>
                            {error && <ErrorMessage variant="danger">{error} </ErrorMessage>}
                            {loading && <Loading/>}
                            {message && <ErrorMessage variant="danger">{message} </ErrorMessage>}
                <Col xl={12}>
                <Form onSubmit={addCont}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nom Complet</Form.Label>
                        <Form.Control
                         type="text"
                         placeholder="Nom de Consultant"
                         name="name"
                         onChange={handleInput}
                         value={user.name}
                         onBlur={(e)=>{
                            if(e.target.value === ""){
                                setSignupError({...signupError, errorName:true });
                            }else{
                                setSignupError({...signupError, errorName:false });
                    
                            }
                        }}
                           />
                                 {signupError.errorName ? (
                                    <Form.Text className="text danger">
                                                 Le champ Nom ne doit pas etre vide
                                    </Form.Text>
                                    ) :""
                                                 }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email de Consultant</Form.Label>
                        <Form.Control
                         type="email"
                         placeholder="Email de Consultant"
                         name="email"
                         onChange={handleInput}
                         value={user.email}
                         onBlur={(e)=>{
                            if(e.target.value === ""){
                                setSignupError({...signupError, errorEmail:true });
                            }else{
                                setSignupError({...signupError, errorEmail:false });
                    
                            }
                        }}
                           />
                                 {signupError.errorEmail ? (
                                    <Form.Text className="text danger">
                                                 Le champ Email ne doit pas etre vide
                                    </Form.Text>
                                    ) :""
                                                 }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Numéro De Consultant</Form.Label>
                        <Form.Control
                         type="number"
                         placeholder="Numéro de Consultant"
                         name="phone"
                         onChange={handleInput}
                         value={user.phone}
                         onBlur={(e)=>{
                            if(e.target.value === ""){
                                setSignupError({...signupError, errorPhone:true });
                            }else{
                                setSignupError({...signupError, errorPhone:false });
                    
                            }
                        }}
                           />
                                 {signupError.errorPhone ? (
                                    <Form.Text className="text danger">
                                                 Le champ Telephone ne doit pas etre vide
                                    </Form.Text>
                                    ) :""
                                                 }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Mot de Passe</Form.Label>
                        <Form.Control
                         type="password"
                         placeholder="Nom de Consultant"
                         name="password"
                         onChange={handleInput}
                         value={user.password}
                         onBlur={(e)=>{
                            if(e.target.value === ""){
                                setSignupError({...signupError, errorPassword:true });
                            }else{
                                setSignupError({...signupError, errorPassword:false });
                    
                            }
                        }}
                           />
                                 {signupError.errorPassword ? (
                                    <Form.Text className="text danger">
                                                 Le champ Mot de passe ne doit pas etre vide
                                    </Form.Text>
                                    ) :""
                                                 }
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Ajouter le Consultan
                    </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddCon
