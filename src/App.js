import { Routes ,Route, Navigate } from 'react-router-dom';
import Login from './components/Authentication/login'
import RegisterVoter from './components/Authentication/RegisterVoter';
import Candidates from './components/Dashboards/AdminDashboard/candidates';
import AdminDashboard from './components/Dashboards/AdminDashboard/dashboard';
import Voters from './components/Dashboards/AdminDashboard/voters';
import Votes from './components/Dashboards/AdminDashboard/votes';



function App() {
	return(
		<>
      <Routes>
        <Route path = '/login'  element = { <Login/> }/>
        <Route path = '/RegisterVoter' element = { <RegisterVoter/> }/>
        <Route path = '/adminDashboard' element={ <AdminDashboard/> }/>
        <Route path = '/adminDashboard/votes'  element = {<Votes/>}/>
        <Route path = '/adminDashboard/voters'  element = {<Voters/>}/>
        <Route path = '/adminDashboard/candidates'  element = { <Candidates/>}/>
      </Routes>
		</>
	)	
}

export default App;