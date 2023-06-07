import { Outlet } from "react-router-dom"
import Sidebar from "../sidebar/Sidebar"

const Layout = () => {
    return(
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-6 col-md-4 col-xl-3 px-sm-2 px-1 custom-navbar">
                    <Sidebar/>
                </div>
                <div className="col py-3">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Layout