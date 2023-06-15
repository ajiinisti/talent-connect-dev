import { DefaultProfileIcon } from "../../assets"

const Participants = ({participants}) => {
    return(
        <div className="col-md-3">
            <h5 className="mt-4 mb-4">Participants ({participants ? participants.length : 0})</h5>
            {participants && participants.map((v)=>(
                <div className="mt-3">
                    <img src={DefaultProfileIcon} alt="Profile Icon" /> <span>{v.User.FirstName} {v.User.LastName}</span>
                </div>
            ))}
        </div>
    )
}

export default Participants