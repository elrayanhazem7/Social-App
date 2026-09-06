import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";

export default function Layout() {
  return (
    
    <>
        <Navbar/>
          <div className="flex min-h-screen justify-center items-center bg-gray-200">
          <Outlet/>
        </div>
    </>
  )
}
