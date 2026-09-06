import { createHashRouter } from "react-router";
import Layout from "../../Pages/Layout/Layout";
import Posts from "../../Pages/Posts/Posts";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import NotFound from "../../Pages/NotFound/NotFound";
import ProtectedRoute from "../../Components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "../../Components/AuthProtectedRoute/AuthProtectedRoute";
import PostDetails from "../../Pages/PostDetails/PostDetails";
import Profile from "../../Pages/Profile/Profile";
import Settings from "../../Pages/Settings/Settings";


export const router = createHashRouter([
    {path: '', element: <Layout/>,children: [
        {index : true , element: <ProtectedRoute><Posts/></ProtectedRoute>},
        {path : 'posts' , element: <ProtectedRoute><Posts/></ProtectedRoute>},
        {path : 'profile' , element: <ProtectedRoute><Profile/></ProtectedRoute>},
        {path : 'Settings' , element: <ProtectedRoute><Settings/></ProtectedRoute>},
        {path : 'postDetails/:id' , element: <ProtectedRoute><PostDetails/></ProtectedRoute>},
        {path : 'login' , element:<AuthProtectedRoute><Login/></AuthProtectedRoute> },
        {path : 'register' , element: <AuthProtectedRoute><Register/></AuthProtectedRoute>},
        {path : '*' , element: <NotFound/>},
    ]}
])