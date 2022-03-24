import React from 'react'
import {Nav,Navbar} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'

//import { withRouter } from "react-router";
import { FiHome,FiUsers,FiSettings,FiDatabase,FiGlobe,FiHardDrive } from "react-icons/fi";
import { IconContext } from "react-icons/";
import Logo from '../assetes/image/Logo.svg'
function NavSide() {
    return (
        <aside className="float-left navbar ">
            <>
            <Nav defaultActiveKey="/home" className="flex-column nav-left justify-flex-end d-flex">
            <Navbar.Brand ><img src={Logo} className="Nav-logo" /></Navbar.Brand>
                 <LinkContainer exact to="/main">
                 <Nav.Link > <IconContext.Provider value={{className:"icon-nav"}}><FiHome/></IconContext.Provider> Tableau de board</Nav.Link>
                 </LinkContainer>
                 <LinkContainer  to="/missions">
                 <Nav.Link eventKey="link-1"><IconContext.Provider value={{className:"icon-nav"}}><FiHardDrive/></IconContext.Provider>  Offres d'emplois</Nav.Link>
                 </LinkContainer>
                 <LinkContainer  to="/consultans">
                 <Nav.Link ><IconContext.Provider value={{className:"icon-nav"}}><FiUsers/></IconContext.Provider> Chercheurs d'emplois</Nav.Link>
                 </LinkContainer>
                 <LinkContainer  to="/enterprise">
                 <Nav.Link ><IconContext.Provider value={{className:"icon-nav"}}><FiDatabase/></IconContext.Provider>Enterprise</Nav.Link>
                 </LinkContainer>
                 <LinkContainer  to="/parteniars">
                 <Nav.Link ><IconContext.Provider value={{className:"icon-nav"}}><FiDatabase/></IconContext.Provider>Parteniars</Nav.Link>
                 </LinkContainer>
                 <LinkContainer  to="/hero">
                 <Nav.Link ><IconContext.Provider value={{className:"icon-nav"}}><FiGlobe/></IconContext.Provider>Modifier le Hero</Nav.Link>
                 </LinkContainer>
                 <LinkContainer  to="/content">
                 <Nav.Link ><IconContext.Provider value={{className:"icon-nav"}}><FiGlobe/></IconContext.Provider>Les Avis d'utilisateurs</Nav.Link>
                 </LinkContainer>
                 <LinkContainer  to="/pub">
                 <Nav.Link ><IconContext.Provider value={{className:"icon-nav"}}><FiGlobe/></IconContext.Provider>Section Pub</Nav.Link>
                 </LinkContainer>
                 <LinkContainer  to="/about">
                 <Nav.Link ><IconContext.Provider value={{className:"icon-nav"}}><FiGlobe/></IconContext.Provider>Modifier La page About</Nav.Link>
                 </LinkContainer>
                 <LinkContainer  to="/messages">
                 <Nav.Link ><IconContext.Provider value={{className:"icon-nav"}}><FiGlobe/></IconContext.Provider>Messages</Nav.Link>
                 </LinkContainer>

                </Nav>
                
            </>
        </aside>
    )
}
//const Navs = withRouter(NavSide)
export default NavSide
