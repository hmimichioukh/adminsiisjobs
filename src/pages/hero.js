import React,{useState,useEffect} from 'react'
import { Container, Row,Col,Button ,Form} from 'react-bootstrap'
import Loading from '../helpers/loading'
import axios from 'axios'
const api = axios.create({  
    baseURL:'http://localhost:4444/admin'
});

 function Hero(){
    const [loading, setLoading]=useState(false)
     const[id,setId] = useState("")
const [title, setTitle] = useState("")
const [buttonText, setButtonText] = useState("")
const [heroImage,setHeroImage] = useState("")
const [imagePreview, setImagePreview] = useState("");
useEffect(() => {
    setLoading(true)
    api.get('/hero',{
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }).then((response) =>{
        setLoading(false)

        console.log(response.data[0])
        setHeroImage(response.data[0].heroImage)
        setTitle(response.data[0].title)
        setButtonText(response.data[0].buttonText)
        setId(response.data[0]._id)
    }).catch((error) =>{
        console.error(error)
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
             setHeroImage(data.url.toString());

         }).catch((err)=>{
             console.log(err)
         })
     }
}
const profileImage = (e) =>{
    setHeroImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
    //console.log(imagePreview)
}
const updateHero=(e)=>{
    e.preventDefault();
    const send = api.put(`/hero/${id}`,{title,buttonText,heroImage},{
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
        <section >
            <Container style={{"marginBottom":"48px"}}>
                <Row>
                    <Col xl={10}>
                      <h4>La Section Hero</h4>
                    </Col>
                    <Col xl={2}>
                    </Col>
                </Row>
            </Container>
            {loading?(<Loading/>)
            :(
                <Container>
                <Form onSubmit={updateHero}>
                    <Row>
                        <Col xl={12} >
                            {imagePreview ? (<img  src={imagePreview} style={{"width":"480px","Border":"1px solid blue"}} alt="profile picture" />):(<img style={{"width":"480px","Border":"1px solid blue"}} src={heroImage} alt="profile picture" />) }
                            <input 
                            id="getImageJob" 
                                type="file" 
                                name='getImageJob'
                                className="input-pic" 
                                onChange={(e)=>ImagePic(e.target.files[0])}
                                Value={profileImage}
                                />
                        </Col>
                        <Col xl={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Ttre </Form.Label>
                                <Form.Control type="text"
                                name="title"
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                 placeholder="Enter Title" />
                            </Form.Group> 
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Button text</Form.Label>
                                <Form.Control type="text"
                                name="buttonText"
                                onChange={e => setButtonText(e.target.value)}
                                value={buttonText}
                                 placeholder="Enter buttonText" />
                            </Form.Group> 
                        </Col>
                    </Row>

                    <Button type="submit"> Modifier  l'hero  </Button>
                </Form>
               
            </Container>
            )}
           
        </section>
    )
}
export default Hero