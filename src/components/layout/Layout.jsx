import Sidebar from "../sidebar/Sidebar"
import ProtectedRoute from "../../routers/ProtectedRouter"

const Layout = () => {
    return(
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-6 col-md-4 col-xl-3 px-sm-2 px-1 custom-navbar" style={{ flex: '0 0 auto' }}>
                <div className="sidebar d-flex flex-column align-items-center justify-content-center text-secondary min-vh-100" style={{ width: '100%' }}>
                    <Sidebar/>
                </div>
                </div>
                <div className="col py-3" style={{ flex: '1 1 auto' }}>
                    <ProtectedRoute/>
                </div>
            </div>
        </div>

    )
}

export default Layout