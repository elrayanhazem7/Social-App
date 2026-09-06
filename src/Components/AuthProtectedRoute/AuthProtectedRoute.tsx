import { Navigate } from "react-router"

export default function AuthProtectedRoute({children}:{children: React.ReactNode}) {

    if(localStorage.getItem("user_token")){
        // navigate to desired cpt
        return <Navigate to="/posts"/>
        
    }

  return (
    children
  )
}
