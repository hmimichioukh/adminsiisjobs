import './assetes/css/main.css'
import Home from './pages/home';
import Login from './pages/login'
import isAuth,{userType} from './services/isAuth'
import {BrowserRouter as Router, Switch,Route,Redirect } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
         <Route path="/" component={()=>(isAuth()&&userType()==='admin'?<Home/>:<Login />)}/>
      </Switch>
    </Router>
     
    
  );
}

export default App;
