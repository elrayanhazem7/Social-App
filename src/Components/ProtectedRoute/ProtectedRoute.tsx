import { Navigate } from "react-router";

export default function ProtectedRoute({children}:{children: React.ReactNode}) {

    if(localStorage.getItem("user_token")){
        // navigate to desired cpt
        return children
        
    }


  return (
    <>
    <Navigate to="/login"/>
    </>
  )
}
