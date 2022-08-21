import { Routes ,Route, Navigate } from 'react-router-dom';
import Login from './components/Authentication/login'
import SignUp from './components/Authentication/signUp';
import Dashboard from './components/Authentication/dashboard';


function App() {
	return(
		<>
      <Routes>
        <Route path = '/login'  element = { <Login/> }/>
        <Route path = '/signup' element = { <SignUp/> }/>
        <Route path = '/dashboard' element={ <Dashboard/> }/>
      </Routes>
		</>
	)	
}

export default App;