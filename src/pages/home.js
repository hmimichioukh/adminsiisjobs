import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Switch,Route,Redirect } from 'react-router-dom';
//import { withRouter } from "react-router";
import NavSide from "../component/NavSide";
import Missions from "./Missions";
import Consultans from "./Consultans";
import AddCon from "../component/Consultans/addCon"
import EnterAdd from "../component/enterprise/entAdd"
import Pub from "./pub"

import Dashboard from "./Dashboard";
import Addmission from "./addmission";
import Enterprise from "./enterprise";
import EditContent from "./editContent";
import Messages from "./messages";
import Parteniars from './parteniars'
import Hero from "./hero";
import About from "./About";
import Offres from "../component/enterprise/offres"
import Candidates from "../component/enterprise/candidates"
import MesCandidates from"../component/Consultans/candidates"
import ModifierJob from './modifjob';
function Home(){
    return(
    <>
        <Router>
            <Container fluid>
                        <Row>
                            <Col xl={3} id="sidebar-wrapper">      
                            <NavSide />
                            </Col>
                            <Col  xl={9} className="content" id="page-content-wrapper">
                                <Switch>
                                   <Route exact path="/main" component={Dashboard}  />
                                   <Route  path="/missions" component={Missions} /> 
                                   <Route  path="/consultans" component={Consultans} />  
                                   <Route  path="/consultantcandidates/:id" component={MesCandidates} />  
                                   <Route  path="/addconsultant" component={AddCon} /> 
                                   <Route  path="/addenterprise" component={EnterAdd} />  
                                   <Route  path="/pub" component={Pub} />  
                                   <Route  path="/candidates/:id" component={Candidates} />  
                                   <Route  path="/enterprise" component={Enterprise} />  
                                   <Route  path="/monenterprise/:id" component={Offres} />  
                                   <Route  path="/content" component={EditContent} />  
                                   <Route  path="/messages" component={Messages} />  
                                   <Route  path="/hero" component={Hero} />  
                                   <Route  path="/addmission" component={Addmission} />   
                                   <Route  path="/modifierjob/:id" component={ModifierJob} />         
                                   <Route  path="/about" component={About} />        
                                   <Route  path="/parteniars" component={Parteniars} />        
                                </Switch>
                            </Col> 
                        </Row>

            </Container>
        </Router>
        
        </>
)
}
//const Homes = withRouter(Home)
export default Home