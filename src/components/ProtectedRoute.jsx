import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../contexts/AppContexts";

 function ProtectedRoute ({
    children,
    anonymous = false,
    //indicates routes that can be visited anonymously (i.e., without authorization)
}) {
    
    // Invoking the useLocation hook, accessing the value of the
    // 'from' property from its state object or default to "/".
    const location = useLocation();
    const from = location.state?.from || "/";
    
    // Destructuring isLoggedIn from the value provided by AuthenticationContext
    const { isLoggedIn } = useContext(AuthenticationContext);

    // If user is logged in redirect them away from anonymous routes
  
    
    // If user is not logged in and tries to access nonanonymous route redirect them to the main route.
    if(!anonymous && !isLoggedIn){

        // While redirecting to /login set the location objects
        // state.from property to store the current location value.
        // to redirect them appropriately after login
         return <Navigate to="/" state={{ from: location }} />;
    }

    // Otherwise, render the protected route's child component.
    return children;
}

export default ProtectedRoute