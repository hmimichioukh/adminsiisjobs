import React,{useState,useEffect} from 'react'
import { Container, Row,Col,Button , Modal,Form} from 'react-bootstrap'
import TestCard from "../component/testmonials/testCard"
import Loading from '../helpers/loading'
import ErrorMessage from '../helpers/errormessage'

import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function Pub() {
    const[titleTop,setTitleTop]=useState("")
    const [error, setError] = useState(false)
    const [messageErr, setMessageErr] = useState(null);
    const[title,setTitle]=useState("")
    const[message,setMessage] =useState("")
    const[buttonText,setButtonText] = useState("")
    const[newsImage,setNewsImage] = useState("")

    const [loading, setLoading]=useState(false)
    const [loadingSend, setLoadingSend]=useState(false)

    const [about, setAbout] = useState({
        _id:"",
        title:"",
        buttonText:"",
        message:"",

    })
    const [imageTop,setImageTop]=useState("")
    const [imagePreview,setImagePreview] =useState("")
    const [update, setUpdate] = useState(false);

    const id = about._id
   
    useEffect(() => {
        setLoading(true)
        api.get(`/newsletter`,{
            headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            })
            .then((response) => {
                console.log(response.data)
                setAbout(response.data[0])
                setNewsImage(response.data[0].newsImage)
                setTitle(response.data[0].title)
                setMessage(response.data[0].message)
                setButtonText(response.data[0].buttonText)
                setLoading(false)

            }).catch((error)=>{
                console.log(error)
                setLoading(false)

            })

    }, [])
   
    const getImageJob= (e) =>{
        setImageTop(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
    const ImagePic=(pics)=>{
        if(!pics){
            return setMessageErr("please select an image")
        }
        setMessageErr(null)
         if(pics.type==='image/jpeg'||pics.type==='image/png'|| pics.type==='image/jpg'|| pics.type==='image/png')
         {
            setLoadingSend(true)

             const data = new FormData();
             data.append('file',pics)
             data.append('upload_preset','siisjob')
             data.append('cloud_name','hmimi')
             fetch("https://api.cloudinary.com/v1_1/hmimi/image/upload",{
                 method:"post",
                 body: data,
             }).then((res)=>res.json()).then((data)=>{
                 console.log(data)
                 setNewsImage(data.url.toString());
                 setLoadingSend(false)

             }).catch((err)=>{
                 console.log(err)
                 setLoadingSend(false)

             })
         }
    }
    const handleInput = (e) => {
        const {name,value} = e.target;
        setAbout({...about, [name]:value });
        
    };

    const UpdateAbout=(e)=>{
        setLoading(true)
        e.preventDefault();
        if(!about.title || !about.message || !about.buttonText){
            setMessageErr('Please fill the form before updating')
        }else{
           
           

            const data =  api.put(`/newsletter/${id}`,{title,message,buttonText,newsImage}, {
                        headers: {
                              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                            },
                        })
                        .then((res)=>{
                            setUpdate(true)
                            setLoading(false)
                            setMessageErr(res.data.message)

                         console.log(res)
                         setMessageErr('')
                                })  
                               .catch ((err)=>{
                                console.log(err.response)
                                setError('Please fill the form before updating2')
                                setLoading(true)
                            })
                    
        }
        setError('')
    }
    return (
        <section className="edit-content">
            <Container>
                <Row>
                    <Col xl={9}>
                      <h4>Modifier La Section Pub</h4>
                    </Col>
                    <Col xl={3}>
                    </Col>
                </Row>
            </Container>
            {loading?(<Loading/>):(  <Container className="updatedata">
            <Form onSubmit={UpdateAbout} enctype="multipart/form-data"  > 
          
            <Row>
            {error && <ErrorMessage variant="danger">{error} </ErrorMessage>}
            {loadingSend && <Loading/>}
            {messageErr && <ErrorMessage variant="danger">{messageErr} </ErrorMessage>}
            <h5>Image de about us</h5>

                        <Col xl={9}>
                          {imagePreview ? (<img  src={imagePreview} style={{"width":"480px"}} alt="profile picture" />):(<img style={{"width":"480px"}} src={newsImage} alt="profile picture" />) }

                            <input 
                               id="getImageJob" 
                                type="file" 
                                name='getImageJob'
                                className="input-pic" 
                                onChange={(e)=>ImagePic(e.target.files[0])}
                                Value={getImageJob}
                                />
                            </Col>
                            <Col xl={3}>
                            </Col>
                    </Row>

                    <Row>
                        <h5>Pub</h5>
                        <Col xl={12}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Titre Haut</Form.Label>
                                <Form.Control type="text"
                                placeholder="Enter email"
                                onChange={(e)=>setTitle(e.target.value)}
                                name="title"
                                value={title}
                                />
                                
                            </Form.Group>  
                            <Form.Group className="mb-3" >
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={8} 
                                onChange={(e)=>setMessage(e.target.value)}
                                name="message"
                                value={message}
                                placeholder="Enter description de l'enterprise" />
                            </Form.Group>                    
                        </Col>
                    </Row>
                    <Row>
                <Col xl={12}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Text Button</Form.Label>
                        <Form.Control type="text" placeholder="Enter email"
                         onChange={(e)=>setButtonText(e.target.value)}
                         name="buttonText"
                         value={buttonText}
                        />
                    </Form.Group>                 
                </Col>
               </Row> 
               <Button variant="primary" type="submit" > Modifier la page about</Button>

               </Form>
            </Container>)}
          
        </section>
    )
}

export default Pub
