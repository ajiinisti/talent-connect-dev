import Sidebar from "../sidebar/Sidebar"
import ProtectedRoute from "../../routers/ProtectedRouter"
import Navbar from "../navbar/Navbar"

const Layout = () => {
    return(
        <div 
            style={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Navbar/>
            
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-6 col-md-4 col-xl-3 px-sm-2 px-1 custom-sidebar">
                        <div className="sidebar d-flex flex-column align-items-center justify-content-center text-secondary min-vh-100" style={{ width: '100%' }}>
                            <Sidebar/>
                        </div>
                    </div>
                    <div className="col custom-content">
                        <ProtectedRoute/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout