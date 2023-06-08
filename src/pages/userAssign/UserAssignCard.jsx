import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

const UserAssignCard = ({title, programId}) => {
    const navigate = useNavigate()
    const buttonCancelStyle = {
        borderRadius : '5px',
        height: '40px',
        backgroundColor: 'white',
        color: 'black',
        border: '0.5px solid white',
        outline: 'gray',
        marginLeft: '1rem'
    }

    return (
        <div className="card d-flex flex-column gap-4 mt-5" style={{borderRadius: '10px', paddingBottom:'0.5rem', paddingTop:'0.5rem' }}>
            <ul className="list-group list-group-flush">
                <div
                    className="container d-flex align-items-center justify-content-between px-4 py-5"
                    style={{ height: '10vh'}}
                >
                    <div className="d-flex align-items-center">
                        <div className="box-program-list" style={{marginRight: '1rem'}}>
                        </div>
                        <Link to={programId}>
                            <h5 style={{ marginRight: 'auto', marginTop: '0.5rem' }}>{title}</h5>
                        </Link> 
                    </div>
                    <div>
                        <Button title={<h3>{`>`}</h3>} styling={buttonCancelStyle} navigate={()=>navigate(programId)}/>
                    </div>
                </div>
            </ul>
        </div>
    );
}

export default UserAssignCard