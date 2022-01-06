import React,{useState,useEffect} from 'react'
import { Container, Row,Col,Button ,Form, } from 'react-bootstrap'
import Loading from '../helpers/loading'
import axios from 'axios'
const api = axios.create({  
    baseURL:'http://localhost:4444/admin'
});
function About() {
    const[titleTop,setTitleTop]=useState("")
    const[siisDes,setSiisDes]=useState("")
    const[titleSecondary,setTitleSecondary]=useState("")
    const[siisMission,setSiisMission]=useState("")
    const[titleleft,setTitleleft]=useState("")
    const[siisEnt,setSiisEnt]=useState("")
    const[titleRight,seTtitleRight]=useState("")
    const[siisCan,setSiisCan]=useState("")
    const [loading, setLoading]=useState(false)

    const [about, setAbout] = useState({
        _id:"",
        titleTop:"",
        siisDes:"",
        titleSecondary:"",
        siisMission:"",
        titleleft:"",
        siisEnt:"",
        titleRight:"",
        siisCan:""

    })
    const [imageTop,setImageTop]=useState("")
    const [imagePreview,setImagePreview] =useState("")
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(false);

    const id = about._id
   
    useEffect(() => {
        setLoading(true)
        api.get(`/about`,{
            headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            })
            .then((response) => {
                console.log(response.data)
                setAbout(response.data[0])
                setImageTop(response.data[0].imageTop)
                setTitleTop(response.data[0].titleTop)
                setSiisDes(response.data[0].siisDes)
                setTitleSecondary(response.data[0].titleSecondary)
                setSiisMission(response.data[0].siisMission)
                setTitleleft(response.data[0].titleleft)
                setSiisEnt(response.data[0].siisEnt)
                seTtitleRight(response.data[0].titleRight)
                setSiisCan(response.data[0].siisCan)
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
            return setMessage("please select an image")
        }
        setMessage(null)
         if(pics.type==='image/jpeg'||pics.type==='image/png'|| pics.type==='image/jpg'|| pics.type==='image/png')
         {
             const data = new FormData();
             data.append('file',pics)
             data.append('upload_preset','siisjob')
             data.append('cloud_name','hmimi')
             fetch("https://api.cloudinary.com/v1_1/hmimi/image/upload",{
                 method:"post",
                 body: data,
             }).then((res)=>res.json()).then((data)=>{
                 console.log(data)
                 setImageTop(data.url.toString());
             }).catch((err)=>{
                 console.log(err)
             })
         }
    }
    const handleInput = (e) => {
        const {name,value} = e.target;
        setAbout({...about, [name]:value });
        
    };
    const UpdateAbout=(e)=>{
        e.preventDefault();
        if(!about.titleTop || !about.siisDes || !about.titleSecondary || !about.siisMission || !about.titleleft || !about.siisEnt || !about.titleRight || !about.siisCan){
            setMessage('Please fill the form before updating')
        }else{
           
           

            const data =  api.put(`/about/${id}`,{titleTop,siisDes,siisEnt,siisCan,titleRight,titleleft,titleSecondary,imageTop,siisMission}, {
                        headers: {
                              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                            },
                        })
                        .then((res)=>{
                            setUpdate(true)
                         console.log(res)
                         setMessage('')

                                })  
                               .catch ((err)=>{
                                console.log(err.response)
                                setError('Please fill the form before updating2')

                            })
                    
        }
        setError('')
    }
    return (
        <section className="edit-content">
            <Container>
                <Row>
                    <Col xl={9}>
                      <h4>Modifier La page About Us</h4>
                    </Col>
                    <Col xl={3}>
                    </Col>
                </Row>
            </Container>
            {loading?(<Loading/>):(  <Container className="updatedata">
            <Form onSubmit={UpdateAbout} enctype="multipart/form-data"  > 
            <Row>
            <h5>Image de about us</h5>

                        <Col xl={9}>
                          {imagePreview ? (<img  src={imagePreview} style={{"width":"480px"}} alt="profile picture" />):(<img style={{"width":"480px"}} src={imageTop} alt="profile picture" />) }

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
                        <h5>Presentation De SIIS</h5>
                        <Col xl={12}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Titre Haut</Form.Label>
                                <Form.Control type="text"
                                placeholder="Enter email"
                                onChange={(e)=>setTitleTop(e.target.value)}
                                name="titleTop"
                                value={titleTop}
                                />
                                
                            </Form.Group>  
                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={8} 
                                onChange={(e)=>setSiisDes(e.target.value)}
                                name="siisDes"
                                value={siisDes}
                                placeholder="Enter description de l'enterprise" />
                            </Form.Group>                    
                        </Col>
                    </Row>
                    <Row>
               <h5>Notre Mission</h5>

                <Col xl={12}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Titre Secondary</Form.Label>
                        <Form.Control type="text" placeholder="Enter email"
                         onChange={(e)=>setTitleSecondary(e.target.value)}
                         name="titleSecondary"
                         value={titleSecondary}
                        />
                    </Form.Group>  
                    <Form.Group className="mb-3" >
                        <Form.Label>Description Secondary</Form.Label> 
                        <Form.Control as="textarea" rows={8} 
                        placeholder="Enter description de l'enterprise"
                        onChange={(e)=>setSiisMission(e.target.value)}
                        name="siisMission"
                        value={siisMission} />
                    </Form.Group>                    
                </Col>
               </Row>
               <Row>
               <h5></h5>

                <Col xl={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Titre Section Enterprises</Form.Label>
                        <Form.Control type="text" placeholder="Enter email"
                        onChange={(e)=>setTitleleft(e.target.value)}
                         name="titleleft"
                         value={titleleft} />
                        
                    </Form.Group>  
                    <Form.Group className="mb-3" >
                        <Form.Label>Section Enterprises</Form.Label>
                        <Form.Control as="textarea" rows={8} 
                        placeholder="Enter description de l'enterprise"
                        onChange={(e)=>setSiisEnt(e.target.value)}
                        name="siisEnt"
                        value={siisEnt} />
                    </Form.Group>                    
                </Col>
                <Col xl={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Titre Section Candidates</Form.Label>
                        <Form.Control type="text" placeholder="Enter email"
                         onChange={(e)=>seTtitleRight(e.target.value)} 
                        name="titleRight"
                         value={titleRight}/>
                        
                    </Form.Group>  
                    <Form.Group className="mb-3" >
                        <Form.Label>Section Candidates</Form.Label>
                        <Form.Control as="textarea" rows={8} 
                        placeholder="Enter description de l'enterprise"
                        onChange={(e)=>setSiisCan(e.target.value)}
                        name="siisCan"
                        value={siisCan} />
                    </Form.Group>                    
                </Col>
                <Button variant="primary" type="submit" > Modifier la page about</Button>
               </Row> 
               </Form>
            </Container>)}
          
        </section>
    )
}

export default About
