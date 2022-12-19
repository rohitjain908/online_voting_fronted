import { Routes ,Route, Navigate } from 'react-router-dom';
import Login from './components/Authentication/login'
import RegisterVoter from './components/Authentication/RegisterVoter';
import BallotPosition from './components/Dashboards/AdminDashboard/ballotPosition';
import Candidates from './components/Dashboards/AdminDashboard/candidates';
import AdminDashboard from './components/Dashboards/AdminDashboard/dashboard';
import Position from './components/Dashboards/AdminDashboard/position';
import Voters from './components/Dashboards/AdminDashboard/voters';
import Votes from './components/Dashboards/AdminDashboard/votes';
import UserDashBoard from './components/Dashboards/VoterDashboard/dashboard';

import { useState } from "react";
import { validateToken } from './api';

async function ValidToken(token){
  let body = {
    "token" : token
  }

  let result = false;
  const res = await validateToken(body)
  let data = res['data']
  if(data['message']){
    result = true;
  }
  return result
}


export const ProtectedVoter =  ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  if(localStorage.getItem("voterToken") == null){
    return <Navigate to = "/login" replace/>
  }
  
  let token = localStorage.getItem("voterToken")
  ValidToken(token).then((result)=>{
    setLoggedIn(result);
    setLoading(false);
  }).catch((err)=>{
    console.log(err)
  })
  
  
  //return loading?null:loggedIn?children:<Navigate to = "/login" replace/>;
  console.log("Logged In, ", loggedIn);
  if(loading){
    return null
  }
  if(loggedIn){
    return children
  }
  
  return <Navigate to = "/login" replace/>
}



function App() { 
    return(
      <>
        <Routes>
          <Route path = '/login'  element = { <Login/> }/>
          <Route path = '/register-voter' element = { <RegisterVoter/> }/>
          <Route path = '/user-dashboard' 
          element = { <ProtectedVoter><UserDashBoard/></ProtectedVoter>}/>
          <Route path = '/admin-dashboard' element={ <AdminDashboard/> }/>
          <Route path = '/admin-dashboard/votes'  element = {<Votes/>}/>
          <Route path = '/admin-dashboard/voters'  element = {<Voters/>}/>
          <Route path = '/admin-dashboard/candidates'  element = { <Candidates/>}/>
          <Route path = '/admin-dashboard/ballotPosition'  element = { <BallotPosition/>}/>
          <Route path = '/admin-dashboard/position'  element = { <Position/> }/>
          <Route path="*" element = { <Navigate to = "/login" replace />}/>
        </Routes>

        <Routes/>
      </>
    )	
  
}

export default App;