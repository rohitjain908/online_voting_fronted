import { Navigate } from "react-router-dom";

const Protected = ({isLoggedIn, children}) => {
    console.log("isLoggedIn in protected", isLoggedIn)
    if(!isLoggedIn){
        return <Navigate to = "/login" replace/>
    }
    return children;
}

export default Protected;