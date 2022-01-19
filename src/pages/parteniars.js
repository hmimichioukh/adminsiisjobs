import React,{useState,useEffect} from 'react'
import { Container, Row,Col,Button,Form , Modal} from 'react-bootstrap'
import Loading from '../helpers/loading'
import PartCard from "../component/partenaires/partCard"
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function Parteniars() {
    const [show, setShow] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [name,setName] = useState("")
    const [partImage,setPartImage] = useState("https://res.cloudinary.com/hmimi/image/upload/v1641462070/jmtmh35lmkeeqngpjrvo.png");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [parteniars, setParteniars]= useState([])
    const [loading, setLoading]=useState(false)

    useEffect(() => {
        setLoading(true)
        api.get('/partenaire',{
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }).then((response) =>{
            setLoading(false);

              console.log(response.data)
              setParteniars(response.data)
          }).catch((error) =>{
              console.log(error)
              setLoading(false)

            })
    }, [])

 /* Add a partenaire */
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
             setPartImage(data.url.toString());

         }).catch((err)=>{
             console.log(err)
         })
     }
}
const profileImage = (e) =>{
    setPartImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
    //console.log(imagePreview)
}
const handlchange=(e)=>{
    const {name,value} = e.target;
    setName({[name]:value });
}
const addPart=(e)=>{
e.preventDefault();
const send = api.post('/partenaire',{name,partImage},{
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
       <section>
           <Container>
           <Modal show={show} onHide={handleClose}>
           <Form onSubmit={addPart}> 
                <Modal.Header closeButton>
                <Modal.Title>Ajouter Un Parteniar  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div>
                        {imagePreview ? (<img  src={imagePreview} style={{"width":"480px"}} alt="profile picture" />):(<img style={{"width":"480px"}} src={partImage} alt="profile picture" />) }

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
                            <Form.Label>Nom Parteniar</Form.Label>
                            <Form.Control type="text"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Nom de parteniar" />
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button>
                <Button variant="success" type="submit"  >
                        Ajouter                 
                        </Button>
                </Modal.Footer>
                </Form>

            </Modal>
           </Container>
            <Container style={{"marginBottom":"48px"}}>
                <Row>
                    <Col xl={10}>
                      <h4>Nos Parteniars</h4>
                    </Col>
                    <Col xl={2}>
                    <Button  className="btn btn-primary" onClick={handleShow}>Ajouter Un  Parteniar</Button> 
                    </Col>
                </Row>
            </Container>
            <Container>
                {loading?(<Loading/>)
                :( <Row>
                    {(parteniars||[]).map((parteniar) =>(
                        <PartCard idx={parteniar._id} detail={parteniar} />    
                    ))}
                </Row>)}
               
            </Container>
       </section>
    )
}

export default Parteniars
