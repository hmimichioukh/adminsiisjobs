import React,{useState,useEffect} from 'react'
import { Container, Row,Col,Button ,Form, Card} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link,Redirect } from 'react-router-dom';
import LogoSIIS from '../assetes/image/Logo.png'
import isAuth,{userType} from '../services/isAuth'
import ErrorMessage from '../middilware/errormessage'
import Loading from '../middilware/loading'

import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});

function Login(){
    const [loggedin, setLoggedin] = useState(isAuth());
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null);
    const [loginDetails, setLoginDetails] = useState({
        email:"",
        password:"",
    })
    const [signupError, setSignupError] = useState({
        errorEmail:false ,
        errorPassword:false ,
      });
      const handleInput = (e) => {
        const {name,value} = e.target;
        setLoginDetails({...loginDetails, [name]:value });
      };
const LogAdmin=(e)=>{
    e.preventDefault();
if(!loginDetails.email || !loginDetails.password){
    setMessage("Please Fill the Inputs")
}else{
    setMessage("")
    const config= {
        headers: {
            "Content-type" : "application/json",
        },
    }
    setLoading(true)
    const data = api.post('/login',loginDetails,config)
    .then((res)=>{
        localStorage.setItem("token",JSON.stringify(res.data.token));
        localStorage.setItem("type",JSON.stringify(res.data.type)); 
        setLoggedin(isAuth());
        setLoading(false)
        console.log(res.data)

    })
    .catch ((err)=>{
        console.log(err.response)

        setError("email or password are inncorect")
        setLoading(false)
    })
}
}
return loggedin ?(
    <Redirect  to='/main'/>
): (
    <section className="auth">
        <Container >
            <Row className="justify-content-center">
                <Col xl={6}>
                    <div className="logo justify-content-center ">
                        <img src={LogoSIIS} alt="SIIS logo" />
                    </div>
                    {error && <ErrorMessage variant="danger">{error} </ErrorMessage>}
                            {loading && <Loading/>}
                            {message && <ErrorMessage variant="danger">{message} </ErrorMessage>}
                <Form onSubmit={LogAdmin}>
                              <Form.Group className="mb-3 input-auth" >
                                  <Form.Label>Email address</Form.Label>
                                  <Form.Control
                                   type="email"
                                   name="email"
                                   className={signupError.errorEmail ? "emptyinpute":""}

                                   value={loginDetails.email}
                                   placeholder="Enter email"
                                   onChange={handleInput}
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
                                                         Le champ Nom ne doit pas etre vide
                                            </Form.Text>
                                            ) :""
                                                         }
                              </Form.Group>

                              <Form.Group className="mb-3 input-auth" >
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control
                                   type="password"
                                   name="password"
                                   placeholder="Password"
                                   className={signupError.errorPassword ? "emptyinpute":""}
                                   onChange={handleInput}
                                    value={loginDetails.pasword}
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
                                                             Le champ Nom ne doit pas etre vide
                                                </Form.Text>
                                                ) :""
                                                             }
                              </Form.Group>
                             <Row>
                                 <Col xl={12}>
                                          
                                          <Button variant="primary btn-auth" type="submit">
                                              Connecter to your account
                                          </Button>
                                 </Col>
                             </Row>
                          </Form>
                </Col>
            </Row>
        </Container>
    </section>
)
}
export default Login
/**
 *                                               <Link to='/auth/forget-password'>Forgot password</Link>

 */