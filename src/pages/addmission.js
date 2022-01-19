import React,{useState,useEffect} from 'react'
import { Col, Container, Row,Form,Button } from 'react-bootstrap'
import axios from 'axios'
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import ErrorMessage from '../helpers/errormessage';
import { useHistory } from 'react-router';
import Loading from '../helpers/loading';
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});

/*
image
titre
description
experince
domain
contrat

*/
function AddJob() {
    const history = useHistory()

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [taches, setTaches] = useState([])
    const [skillsets, setSkillsets] = useState([]);
    const [jobImage,setJobImage] = useState("https://res.cloudinary.com/hmimi/image/upload/v1641223565/mission.png");
    const [imagePreview,setImagePreview] =useState("")
    const[experince,setExperince] = useState("");
    const [jobDetails, setJobDetails] = useState({
    title:'',
    description:'',
    subtitle:'',
    domain:'',
    experince:'',
    contrat:'',
    address:'',
    TeleTravailler:false,
    maxApplicants:100,
    deadline:new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 2000)
    .toISOString()
    .substr(0, 16),
    maxPositions:1,
    skillsets: [],
    taches: [],
    jobType:'',
    salary:'',

})
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
  const handleInput = (e) => {
    const {name,value} = e.target;
    setJobDetails({...jobDetails, [name]:value });
    
};
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
    if(!jobDetails.title||!jobDetails.description||!jobDetails.subtitle||!jobDetails.domain||!jobDetails.experince||!jobDetails.contrat||!jobDetails.address||!jobDetails.jobType)
    {
        setMessage('please fill the form before submitting')

    }
    const formData = new FormData();
    formData.append('jobImage',jobImage)
    formData.append('title',jobDetails.title);
    formData.append('description',jobDetails.description);
    formData.append('subtitle',jobDetails.subtitle);
    formData.append('domain',jobDetails.domain);
    formData.append('experince',jobDetails.experince);
    formData.append('contrat',jobDetails.contrat);
    formData.append('address',jobDetails.address);
    formData.append('maxApplicants',jobDetails.maxApplicants);
    formData.append('deadline',jobDetails.deadline);
    formData.append('maxPositions',jobDetails.maxPositions);
    formData.append('jobType',jobDetails.jobType);
    skillsets.forEach((skill)=>{
        formData.append('skillsets[]',skill);

    })
    formData.append('salary',jobDetails.salary);
  
    setLoading(true)

    const Addjob = api.post('/jobs', formData,{
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
            setLoading(false);
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
                          {imagePreview ? (<img  src={imagePreview} alt="profile picture" style={{"width":"120px;"}} className="jobImage" />):(<img  src={jobImage} alt="profile picture" className="jobImage" />) }

                            <input 
                               xid="getImageJob" 
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
                       </div>
                  <Form onSubmit={AddJobHandler}>
                    <Form.Group className="mb-3 input-add-job" controlId="formBasicEmail">
                        <Form.Label>Titre D'offre</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter un titre a votre offre"
                        value={jobDetails.title}
                        className={signupError.errorTitle ? "emptyinpute":""}
                        onChange={handleInput}
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
                        type="text" placeholder="Enter un titre a votre offre" 
                        placeholder="Enter un titre a votre offre"
                        value={setJobDetails.subtitle}
                        className={signupError.errorSubtitle ? "emptyinpute":""}
                        onChange={handleInput}
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
                            value={jobDetails.experince}
                            name="experince"
                            onChange={handleInput}
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
                                value={jobDetails.salary}
                                className={signupError.errorSalary ? "emptyinpute":""}
                                onChange={handleInput}
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
                             value={jobDetails.jobType}
                             name="jobType"
                             onChange={handleInput}
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
                            value={jobDetails.domain}
                            name="domain"
                            onChange={handleInput}
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
                        value={jobDetails.address}
                        className={signupError.errorAddress ? "emptyinpute":""}
                        onChange={handleInput}
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
                              <Form.Check  checked={jobDetails.contrat === 'CDD'  } name='contrat' value='CDD'    type="radio" label="CDD" className="radio-profile"  onChange={handleInput} />
                              <Form.Check  checked={jobDetails.contrat === 'CDI'  } name='contrat' value='CDI'    type="radio" label="CDI" className="radio-profile"  onChange={handleInput} />
                              <Form.Check  checked={jobDetails.contrat === 'Stage'  } name='contrat' value='Stage'    type="radio" label="Stage" className="radio-profile"  onChange={handleInput} />
                              <Form.Check  checked={jobDetails.contrat === 'Freelancer'  } name='contrat' value='Freelancer'    type="radio" label="Freelancer" className="radio-profile"  onChange={handleInput} />
                            </Form.Group>
                            </div>
                    <div>
                       <Row>
                        <Col xl={12}>
                           <Form.Group className="mb-3 input-add-job" controlId="formBasicEmail">
                        <Form.Label>Application deadline</Form.Label>
                        <Form.Control 
                        type="datetime-local" placeholder="Enter un titre a votre offre" 
                        value={jobDetails.deadline}
                        className={signupError.errorDeadline ? "emptyinpute":""}
                        onChange={handleInput}
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
                          value={jobDetails.maxApplicants}
                          className={signupError.errorMaxApp ? "emptyinpute":""}
                          onChange={handleInput}
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
                        value={jobDetails.maxPositions}
                        className={signupError.errorMaxPos ? "emptyinpute":""}
                        onChange={handleInput}
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
                  <Form.Group className="mb-3 input-add-job" controlId="formBasicEmail">
                        <Form.Label>Taches de la mission</Form.Label>
                        <Form.Control type="text" placeholder="Enter une taches"
                        value={jobDetails.taches}
                        className={signupError.errorMaxPos ? "emptyinpute":""}
                        onChange={handleInput}
                        name="taches" 
                        onBlur={(e)=>{
                        if(e.target.value === ""){
                        setSignupError({...signupError, errorMaxPos:true });
                        }else{
                        setSignupError({...signupError, errorMaxPos:false });        
                        }
                        }}
                        
                        
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 input-add-job" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={8}
                         value={jobDetails.description}
                         className={signupError.errorDes ? "emptyinpute":""}
                         onChange={handleInput}
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

export default AddJob
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