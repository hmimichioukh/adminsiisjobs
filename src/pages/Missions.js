import { Container, Row,Col,Button , Card,Table} from 'react-bootstrap'
import React,{useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import MissionService from '../services/MissionService'
import { FiMoreVertical,FiBriefcase,FiUsers,FiDatabase } from "react-icons/fi";
import {IconContext} from "react-icons"
import ReactPaginate from 'react-paginate';
import axios from 'axios'
const api = axios.create({  
    baseURL:'http://localhost:4444/admin'
});
function Missions() {
    const[allmissions,setAllMissions]=useState([])
   const [numberPages,setNumberPages] = useState("")
   const [currentPage, setCurrentPage] = useState("");
   const [searchOptions, setSearchOptions] = useState({
    page:"",
    limit:""
   })
    const [jobs, setJobs] = useState([] );
   
    useEffect(() => {
       getData();
         
    }, []);
    const handlePageClick = async (pageNum) => {    
        searchOptions.page =  pageNum.selected+1;
        //console.log(searchOptions.page);
  
        const JobsFormServer = await getData(pageNum);
      
        //setSearch(JobsFormServer);
        // scroll to the top
        //window.scrollTo(0, 0)
      };
const getData=async()=>{
    let searchParams = [];
    if (searchOptions.page !== "") {
        searchParams = [...searchParams, `page=${searchOptions.page}`];
      } 
    searchParams = [...searchParams,];
    const queryString = searchParams;
    console.log(queryString)
    let address = `/jobs`;
    if(queryString !== "" ){
        address = `${address}?${queryString}`;
    }
    await api.get(address,{
        headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        }
            })
    .then((res)=>{
        console.log(res.data)
        setAllMissions(res.data.data)
        setCurrentPage(res.data.page)
        setNumberPages(res.data.numberPages)

    })
}
    return (
        <section className="mesMissions">
           <Container className="top-mission">
               <Row>
               <Col xl={10}>
                        <h4>Tous Les Missions </h4>
                   </Col>
                   <Col xl={2}>
                        <LinkContainer to="/addmission">
                            <Button>Ajouter une Mission </Button>
                         </LinkContainer>
                   </Col>
               </Row>
           </Container>
            <Container>
            <Row>
                     <Col xl={12}>
                     <Table responsive   hover size="xl" className="tablemission justify-content-start">
                                <thead>
                                    <tr>
                                        <th>Image De l'offre</th>
                                        <th>Titre de l'offre</th>
                                        <th>Nom d'enterprise</th>
                                        <th>Type de contrat</th>
                                        <th>Rythme de travaille</th>
                                        <th>Domaine</th>
                                        <th>Experince</th>
                                        <th>Address</th>
                                        <th>date of posting</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allmissions.map(mission=>(
                                        <tr idx={mission._id}>   
                                            <td><img src={mission.jobImage} style={{"width":"48px"}} /> </td>                                         
                                            <td>{mission.title} </td>
                                            <td>{mission.name} </td>
                                            <td>{mission.contrat} </td>
                                            <td>{mission.jobType} </td>
                                            <td>{mission.domain} </td>
                                            <td>{mission.experince} </td>
                                            <td>{mission.address} </td>
                                            <td>{new Date(mission.dateOfPosting).toLocaleDateString()}</td>

                                            <td>
                                            <div class="btn-group">
                                                <button type="button" className="btn btn-action-table  " data-bs-toggle="dropdown" aria-expanded="false">
                                                    <IconContext.Provider value={{className:"icon-table"}}>
                                                    <FiMoreVertical/>

                                                    </IconContext.Provider>
                                                </button>
                                                <ul class="dropdown-menu">
                                                <LinkContainer to="/">
                                                    <li className="dropdown-item">Voir</li>
                                                    </LinkContainer>
                                                    <li><a class="dropdown-item" href="#">Modifer</a></li>
                                                    <li><a class="dropdown-item"  >Suprimmer</a></li>
                                                </ul>
                                                </div>
                                            
                                            
                                            </td>

                                    </tr>
                                    ))}
                                    
                                </tbody>
                    </Table>
                     </Col>
                     
                </Row>
                <ReactPaginate
                      previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      pageCount={numberPages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName={ "pagination justify-content-center " }
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      activeClassName={"active"}
                   />
            </Container>
        </section>
    )
}

export default Missions
