import { Container, Row,Col,Button , Card,Table} from 'react-bootstrap'
import React,{useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import MissionService from '../services/MissionService'
import { FiMoreVertical,FiBriefcase,FiUsers,FiDatabase } from "react-icons/fi";
import {IconContext} from "react-icons"
import ReactPaginate from 'react-paginate';
import Loading from '../helpers/loading'
import Empty from '../helpers/empty'
import Trmiss from './tr'
import axios from 'axios'
const api = axios.create({  
    baseURL:'https://siisbackjob.herokuapp.com/admin'
});
function Missions() {
    const[allmissions,setAllMissions]=useState([])
   const [numberPages,setNumberPages] = useState("")
   const [currentPage, setCurrentPage] = useState("");
   const [loading, setLoading]=useState(false)
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
    setLoading(true)
    await api.get(address,{
        headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        }
            })
    .then((res)=>{
        console.log(res.data)
        setAllMissions(res.data.data)
        setCurrentPage(res.data.page)
        setLoading(false)
        setNumberPages(res.data.numberPages)

    }).catch((err)=>{
        console.log(err)
        setLoading(false)

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
                    <>
                    
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
                                           <Trmiss idx={mission._id} detail={mission}/>
                                        ))}
                                        
                                    </tbody>
                        </Table>
                         </Col>
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
                    </Row>
                   
                    </>
                
                
               
                
            </Container>
        </section>
    )
}

export default Missions
