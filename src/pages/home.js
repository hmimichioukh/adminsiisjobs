import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Switch,Route,Redirect } from 'react-router-dom';
//import { withRouter } from "react-router";
import NavSide from "../component/NavSide";
import Missions from "./Missions";
import Consultans from "./Consultans";
import Dashboard from "./Dashboard";
import Addmission from "./addmission";
import Enterprise from "./enterprise";
import EditContent from "./editContent";
import Messages from "./messages";
import Parteniars from './parteniars'
import Hero from "./hero";
import About from "./About";
function Home(){
    return(
    <>
        <Router>
            <Container fluid>
                        <Row>
                            <Col xl={2} id="sidebar-wrapper">      
                            <NavSide />
                            </Col>
                            <Col  xl={10} className="content" id="page-content-wrapper">
                                <Switch>
                                   <Route exact path="/main" component={Dashboard}  />
                                   <Route  path="/missions" component={Missions} /> 
                                   <Route  path="/consultans" component={Consultans} />  
                                   <Route  path="/enterprise" component={Enterprise} />  
                                   <Route  path="/content" component={EditContent} />  
                                   <Route  path="/messages" component={Messages} />  
                                   <Route  path="/hero" component={Hero} />  

                                   <Route  path="/addmission" component={Addmission} />      
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