import { Routes ,Route, Navigate } from 'react-router-dom';
import Login from './components/Authentication/login'
import SignUp from './components/Authentication/signUp';


function App() {
	return(
		<>
      <Routes>
        <Route path = '/login'  element = { <Login/> }/>
        <Route path = '/signup' element = { <SignUp/> }/>
      </Routes>
		</>
	)	
}

export default App;