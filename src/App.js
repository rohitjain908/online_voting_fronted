import { Routes ,Route, Navigate } from 'react-router-dom';
import Login from './components/Authentication/login'
import Dashboard from './components/Authentication/dashboard';
import RegisterVoter from './components/Authentication/RegisterVoter';


function App() {
	return(
		<>
      <Routes>
        <Route path = '/login'  element = { <Login/> }/>
        <Route path = '/RegisterVoter' element = { <RegisterVoter/> }/>
        <Route path = '/dashboard' element={ <Dashboard/> }/>
      </Routes>
		</>
	)	
}

export default App;