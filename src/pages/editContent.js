import React,{useState,useEffect} from 'react'
import { Container, Row,Col,Button , Modal,Form} from 'react-bootstrap'
import TestCard from "../component/testmonials/testCard"
import Loading from '../helpers/loading'
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function EditContent() {
    const [testmonials,setTesmonials] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [loading, setLoading]=useState(false)
    const handleShow = () => setShow(true);
    const [name,setName] = useState("")
    const [domain,setDomain] = useState("")
    const [message,setMessage] = useState("")
    const [testImage,setTestImage] = useState("https://res.cloudinary.com/hmimi/image/upload/v1641462070/jmtmh35lmkeeqngpjrvo.png");
    
    const [imagePreview, setImagePreview] = useState("");
    useEffect(() => {
        setLoading(true);
        api.get('/testmonials',{
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }).then((response) => {
            setLoading(false)
              setTesmonials(response.data)
              //console.log(response.data)
          }).catch((error) => 
          {console.log(error)
            setLoading(false)

        })
    }, [])
    const ImagePic=(pics)=>{
        if(!pics){
         console.log("please select an image")
        }
         if(pics.type==='image/jpeg'||pics.type==='image/png'|| pics.type==='image/jpg'|| pics.type==='image/png')
         {
             const data = new FormData();
             data.append('file',pics)
             data.append('upload_preset','siisjob')
             data.append('cloud_name','hmimi')
             fetch("https://api.cloudinary.com/v1_1/hmimi/image/upload",{
                 method:"post",
                 body: data,
             }
             ).then((res)=>res.json()).then((data)=>{
                 console.log(data)
                 setTestImage(data.url.toString());
    
             }).catch((err)=>{
                 console.log(err)
             })
         }
    }
    const profileImage = (e) =>{
        setTestImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
        //console.log(imagePreview)
    }

    const addPart=(e)=>{
        e.preventDefault();
        const send = api.post('/testmonials',{name,domain,message,testImage},{
            headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }).then((res)=>{
            console.log(res)
            window.location.reload()
        }).catch((err)=>{
            console.log(err)
        })
        
        }
    return (
        <section className="edit-content">
            <Container>
            <Modal show={show} onHide={handleClose}>
           <Form onSubmit={addPart}> 
                <Modal.Header closeButton>
                <Modal.Title>Ajouter Un Parteniar  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div>
                        {imagePreview ? (<img  src={imagePreview} style={{"width":"480px"}} alt="profile picture" />):(<img style={{"width":"480px"}} src={testImage} alt="profile picture" />) }

                            <input 
                            id="getImageJob" 
                                type="file" 
                                name='getImageJob'
                                className="input-pic" 
                                onChange={(e)=>ImagePic(e.target.files[0])}
                                Value={profileImage}
                                />
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nom </Form.Label>
                            <Form.Control type="text"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Nom de Utilisateur" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Dmoain </Form.Label>
                            <Form.Control type="text"
                            name="domain"
                            value={domain}
                            onChange={e => setDomain(e.target.value)}
                            placeholder="Domain" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={8}
                            name="message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Message" />
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button>
                <Button variant="success" type="submit">
                        Ajouter                 
                </Button>
                </Modal.Footer>
                </Form>

            </Modal>
            </Container>
            <Container style={{"marginBottom":"48px"}}>
                <Row>
                    <Col xl={10}>
                      <h4>Testmonials</h4>
                    </Col>
                    <Col xl={2}>
                    <Button onClick={handleShow}> Ajouter  Un Testmonial </Button>
                    </Col>
                </Row>
            </Container>
            <Container>
                {loading?(<Loading/>):(  
                     <Row>
                 {(testmonials||[]).map((testmonial) =>(
                    <TestCard idx={testmonial._id} detail={testmonial} />
                 ))}
                </Row>)}
         
            </Container>
        </section>
    )
}

export default EditContent
