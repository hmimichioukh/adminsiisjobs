import React,{useState,useEffect} from 'react'
import { Col, Container, Row,Form,Button } from 'react-bootstrap'
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import ErrorMessage from '../helpers/errormessage';
import { useHistory,useParams } from 'react-router';
import Loading from '../helpers/loading';
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});

function ModifierJob() {
    const history = useHistory()
    const { id } = useParams();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [skillsets, setSkillsets] = useState([]);
    const [jobImage,setJobImage] = useState("");
    const [imagePreview,setImagePreview] =useState("")
    const[experince,setExperince] = useState("");
    const[title,setTitle] = useState("");
    const[description,setDescription] = useState("");
    const[subtitle,setSubtitle] = useState("");
    const[domain,setDomain] = useState("");
    const[contrat,setContrat] = useState("");
    const[address,setAddress] = useState("");
    const[maxApplicants,setMaxApplicants] = useState("");
    const[deadline,setDeadline] = useState("");
    const[maxPositions,setMaxPositions] = useState("");
    const[jobType,setJobType] = useState("");
    const[salary,setSalary] = useState("");

const [signupError, setSignupError] = useState({
    errorTitle:false ,
    errorDes:false ,
    errorSubtitle:false,
    errorDomain:false ,
    errorSalary:false,
    errorExperince:false,
    errorContrat:false,
    errorJobType:false,
    errorAddress:false,
    errorDeadline:false,

  });
console.log(id)
useEffect(() => {
    api.get(`/jobs/${id}`)
    .then((res=>{
          console.log(res.data);
          setTitle(res.data.title)
          setDescription(res.data.description)
          setSubtitle(res.data.subtitle)
          setDomain(res.data.domain)
          setAddress(res.data.address)
          setMaxApplicants(res.data.maxApplicants)
          setDeadline(res.data.deadline)
          setMaxPositions(res.data.maxPositions)
          setJobType(res.data.jobType)
          setSalary(res.data.salary)
          setSkillsets(res.data.skillsets)
          setJobImage(res.data.jobImage)
          setContrat(res.data.contrat)

      })).catch((err)=>{
          console.log(err);
      })
    
}, [])


 

const getImageJob= (e) =>{
    setJobImage(e.target.files[0])
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
             setJobImage(data.url.toString());
         }).catch((err)=>{
             console.log(err)
         })
     }
}



const AddJobHandler = (e) =>{
    e.preventDefault();
    if(!title||!description||!subtitle||!domain||!experince||!contrat||!address||!jobType)
    {
        setMessage('please fill the form before submitting')

    }
    const formData = new FormData();
    skillsets.forEach((skill)=>{
        formData.append('skillsets[]',skill);
    })
  
    setLoading(true)

    const Addjob = api.put(`/jobs/${id}`, {jobImage,title,description,subtitle,domain,experince,contrat,address,maxApplicants,deadline,maxPositions,jobType},{
        headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
        }).then((response) => {
            setLoading(false)
            console.log(response.data.message);
            setMessage(response.data.message)
            history.push('/missions');
        }).catch((err)=>{
            console.log(err.response);
        })
//console.log(skillsets)

}
    return (
        <Container>
            {loading && <Loading/>}
            {error && <ErrorMessage variant="danger">{error} </ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message} </ErrorMessage>}
            <Row>
                <Col className="add-job-form"> 
                  <h5>Ajouter Un offer d'emplois </h5>
                  <div className="user-profile-pic">
                     <Row>
                        <Col xl={9}>
                          {imagePreview ? (<img  src={imagePreview} alt="profile picture" />):(<img  src={jobImage} alt="profile picture" />) }

                            <input 
                               xid="getImageJob" 
                                type="file" 
                                name='getImageJob'
                                className="input-pic" 
                                onChange={(e)=>ImagePic(e.target.files[0])}
                                value={getImageJob}
                                />
                            </Col>
                            <Col xl={3}>
                            </Col>
                    </Row>
                       </div>
                  <Form onSubmit={AddJobHandler}>
                    <Form.Group className="mb-3 input-add-job" controlId="formBasicEmail">
                        <Form.Label>Titre D'offre</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter un titre a votre offre"
                        value={title}
                        className={signupError.errorTitle ? "emptyinpute":""}
                        onChange={(e) => setTitle(e.target.value)}
                        name="title" 
                        onBlur={(e)=>{
                        if(e.target.value === ""){
                        setSignupError({...signupError, errorTitle:true });
                        }else{
                        setSignupError({...signupError, errorTitle:false });        
                        }
                        }}
                       />
                        {signupError.errorTitle ? (
                            <Form.Text className="text danger">
                                         Le champ Nom ne doit pas etre vide
                            </Form.Text>
                            ) :""
                                         }
                    </Form.Group>
                    <Form.Group className="mb-3 input-add-job" controlId="formBasicEmail">
                        <Form.Label>Subtitle D'offre</Form.Label>
                        <Form.Control
                        type="text" 
                        placeholder="Enter un titre a votre offre"
                        value={subtitle}
                        className={signupError.errorSubtitle ? "emptyinpute":""}
                        onChange={(e) => setSubtitle(e.target.value)}
                        name="subtitle" 
                        onBlur={(e)=>{
                        if(e.target.value === ""){
                        setSignupError({...signupError, errorSubtitle:true });
                        }else{
                        setSignupError({...signupError, errorSubtitle:false });        
                        }
                        }}
                         />
                          {signupError.errorSubtitle ? (
                            <Form.Text className="text danger">
                                         Le champ Nom ne doit pas etre vide
                            </Form.Text>
                            ) :""
                                         }
                    </Form.Group>
                   <div>
                       <Row>
                           <Col xl={6}>
                           <Form.Label>Experince Require</Form.Label>

                            <Form.Select aria-label="Default select example" 
                            className="input-add-job"
                            value={experince}
                            name="experince"
                            onChange={(e) => setExperince(e.target.value)}
                            onBlur={(e)=>{
                                if(e.target.value === ""){
                                setSignupError({...signupError, errorExperince:true });
                                }else{
                                setSignupError({...signupError, errorExperince:false });        
                                }
                                }}
                            >
                                    <option>Experince Require</option>
                                    <option name="Débutant" value="Débutant">Débutant</option>
                                    <option name="Junior" value="Junior">Junior</option>
                                    <option name="Confirmé" value="Confirmé">Confirmé</option>
                                    <option name="Sénior" value="Sénior">Sénior</option>
                                    <option name="Expert"value="Expert">Expert</option>

                                </Form.Select>
                                {signupError.errorExperince ? (
                            <Form.Text className="text danger">
                                         Le champ Nom ne doit pas etre vide
                            </Form.Text>
                            ) :""
                                         }
                           </Col>
                           <Col xl={6}>
                           <Form.Group className="mb-3 input-add-job" controlId="formBasicEmail">
                                <Form.Label>Salary</Form.Label>
                                <Form.Control 
                                type="number" 
                                placeholder="Enter un titre a votre offre"
                                value={salary}
                                className={signupError.errorSalary ? "emptyinpute":""}
                                onChange={(e) => setSalary(e.target.value)}
                                name="salary" 
                                onBlur={(e)=>{
                                if(e.target.value === ""){
                                setSignupError({...signupError, errorSalary:true });
                                }else{
                                setSignupError({...signupError, errorSalary:false });        
                                }
                                }}
                       />
                       {signupError.errorSalary ? (
                            <Form.Text className="text danger">
                                         Le champ Nom ne doit pas etre vide
                            </Form.Text>
                            ) :""
                                         }
                       </Form.Group>
                           </Col>
                       </Row>
                   </div>
                   <div>
                       <Row>
                           <Col xl={6}>
                           <Form.Label>Rythm de travailler</Form.Label>
                            <Form.Select aria-label="Default select example" className="input-add-job" 
                             value={jobType}
                             name="jobType"
                             onChange={(e) => setJobType(e.target.value)}
                             >
                                    <option>Rythm de travailler</option>
                                    <option name="Full Time" value="Full Time">Full time</option>
                                    <option name="Part Time" value="Part Time">Part Time</option>
                                    <option name="Remotly" value="Remotly">Remotly</option>
                                </Form.Select>
                           </Col>
                           <Col xl={6}>
                           <Form.Label>Domain</Form.Label>
                            <Form.Select aria-label="Default select example" className="input-add-job"
                            value={domain}
                            name="domain"
                            onChange={(e) => setDomain(e.target.value)}
                            >
                                    <option>Domain</option>
                                    <option  name="Web Development " value="Web Development">Development Web</option>
                                    <option  name="Graphic Designer" value="Graphic Designer">Graphic Designer</option>
                                    <option  name="Ingénieur Réseaux Et Sécurité" value="Ingénieur Réseaux Et Sécurité">Ingénieur réseaux et sécurité</option>
                                    <option  name="DevOps Et Sysadmin" value="DevOps Et Sysadmin">DevOps et sysadmin</option>
                                    <option  name="Gestion De Projet" value="Gestion De Projet">Produit et gestion de projet</option>
                                    <option  name="Testeur" value="Testeur">Testeur (QA)</option>
                                    <option  name="Recruteur" value="Recruteur">Recruteur IT</option>
                                    <option  name="Manager" value="Manager">Manager / Directeur (DSI)</option>
                                    <option  name="UX/UI Designer" value="UX/UI Designer">UX/UI Designer</option>
                                    <option  name="Administrateur DataBase" value="Administrateur DataBase">Administrateur de base de données / Data scientiste</option>
                                    <option  name="Community Manager" value="Community Manager">Community Manager / Growth Hacker</option>

                                </Form.Select>
                           </Col>
                       </Row>
                   </div>
                   <Form.Group className="mb-3 input-add-job" controlId="formBasicEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                        type="text"
                        placeholder="Enter un titre a votre offre"
                        value={address}
                        className={signupError.errorAddress ? "emptyinpute":""}
                        onChange={(e) => setAddress(e.target.value)}
                        name="address" 
                        onBlur={(e)=>{
                        if(e.target.value === ""){
                        setSignupError({...signupError, errorAddress:true });
                        }else{
                        setSignupError({...signupError, errorAddress:false });        
                        }
                        }}
                        />
                         {signupError.errorAddress ? (
                            <Form.Text className="text danger">
                                         Le champ Nom ne doit pas etre vide
                            </Form.Text>
                            ) :""
                                         }
                    </Form.Group>
                    <Form.Label>Type de contrat</Form.Label>
                            <div className="d-flex contrats">
                                
                            <Form.Group className="mb-3 contra-type input-add-job d-flex " controlId="formBasicCheckbox">
                              <Form.Check  checked={contrat === 'CDD'  } name='contrat' value='CDD'    type="radio" label="CDD" className="radio-profile"  onChange={(e) => setContrat(e.target.value)} />
                              <Form.Check  checked={contrat === 'CDI'  } name='contrat' value='CDI'    type="radio" label="CDI" className="radio-profile"  onChange={(e) => setContrat(e.target.value)} />
                              <Form.Check  checked={contrat === 'Stage'  } name='contrat' value='Stage'    type="radio" label="Stage" className="radio-profile"  onChange={(e) => setContrat(e.target.value)} />
                              <Form.Check  checked={contrat === 'Freelancer'  } name='contrat' value='Freelancer'    type="radio" label="Freelancer" className="radio-profile"  onChange={(e) => setContrat(e.target.value)} />
                            </Form.Group>
                            </div>
                    <div>
                       <Row>
                        <Col xl={12}>
                           <Form.Group className="mb-3 input-add-job" controlId="formBasicEmail">
                        <Form.Label>Application deadline</Form.Label>
                        <Form.Control 
                        type="datetime-local" placeholder="Enter un titre a votre offre" 
                        value={deadline}
                        className={signupError.errorDeadline ? "emptyinpute":""}
                        onChange={(e) => setDeadline(e.target.value)}
                        name="deadline" 
                        onBlur={(e)=>{
                        if(e.target.value === ""){
                        setSignupError({...signupError, errorDeadline:true });
                        }else{
                        setSignupError({...signupError, errorDeadline:false });        
                        }
                        }}
                        
                        />
                         {signupError.errorDeadline ? (
                            <Form.Text className="text danger">
                                         Le champ Nom ne doit pas etre vide
                            </Form.Text>
                            ) :""
                                         }
                    </Form.Group>
                           </Col>
                       </Row>
                   </div>
                    <div>
                       <Row>
                        <Col xl={6}>
                           <Form.Group className="mb-3 input-add-job" controlId="formBasicEmail">
                        <Form.Label>max application</Form.Label>
                        <Form.Control type="number" placeholder="Enter un titre a votre offre"
                          value={maxApplicants}
                          className={signupError.errorMaxApp ? "emptyinpute":""}
                          onChange={(e) => setMaxApplicants(e.target.value)}
                          name="maxApplicants" 
                          min="1"
                          onBlur={(e)=>{
                          if(e.target.value === ""){
                          setSignupError({...signupError, errorMaxApp:true });
                          }else{
                          setSignupError({...signupError, errorMaxApp:false });        
                          }
                          }}
                        />
                    </Form.Group>
                  </Col>
                           <Col xl={6}>
                           <Form.Group className="mb-3 input-add-job" controlId="formBasicEmail">
                        <Form.Label>maxPositions</Form.Label>
                        <Form.Control type="number" placeholder="Enter un titre a votre offre"
                        value={maxPositions}
                        className={signupError.errorMaxPos ? "emptyinpute":""}
                        onChange={(e) => setMaxPositions(e.target.value)}
                        name="maxPositions" 
                        min="1"
                        onBlur={(e)=>{
                        if(e.target.value === ""){
                        setSignupError({...signupError, errorMaxPos:true });
                        }else{
                        setSignupError({...signupError, errorMaxPos:false });        
                        }
                        }}
                        
                        
                        />
                    </Form.Group>
                           </Col>
                       </Row>
                   </div>
                   <div  className="mb-3">
                   <Form.Label>Skills</Form.Label>
                  <InputTags values={skillsets} onTags={(value) => setSkillsets(value.values)} />
                    <ol>
                        {skillsets.map((item, index) => (
                        <li key={item + index}>{item}</li>
                        ))}
                    </ol>
                  </div>
                    <Form.Group className="mb-3 input-add-job" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={8}
                         value={description}
                         className={signupError.errorDes ? "emptyinpute":""}
                         onChange={(e) => setDescription(e.target.value)}
                         name="description" 
                         onBlur={(e)=>{
                         if(e.target.value === ""){
                         setSignupError({...signupError, errorDes:true });
                         }else{
                         setSignupError({...signupError, errorDes:false });        
                         }
                         }}
                        />
                         {signupError.errorDes ? (
                            <Form.Text className="text danger">
                                         Le champ Nom ne doit pas etre vide
                            </Form.Text>
                            ) :""
                                         }
                    </Form.Group>
                    <Button variant="primary" type="submit" className="submit-add-job" onClick={AddJobHandler}>
                    Sauvgarder 
                    </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default ModifierJob
/*
<div  className="mb-3">
                  <Form.Label>Skills </Form.Label>
                        <ReactTags
                        className="mb-3 input-add-job form-control"
                        tags={skillsets}
                        placeholder="Add Skills you master"
                        //suggestions={suggestions}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        handleTagClick={handleTagClick}
                        inputFieldPosition="top"
                        maxLength="15"
                        autocomplete
                        />
                    </div>

*/ 