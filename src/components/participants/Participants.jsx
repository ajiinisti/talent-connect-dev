import { useEffect, useState } from "react"
import { DefaultProfileIcon } from "../../assets"
import useParticipants from "./useParticipants"
import AsyncSelect from 'react-select/async';
import Button from "../button/Button";
import useProgram from "../../pages/programList/useProgram";

const Participants = ({program}) => {
    const {getAllMentorMentee, mentor} = useParticipants()
    const [selectShow, setSelectShow] = useState(false)    
    const [allSelectedParticipants, setAllSelectedParticipants] = useState([])
    const [defaultSelect, setDefaultSelect] = useState([])
    const {getMenteeCandidate} = useProgram()

    console.log(program)
    const searchParticipant = async (inputValue) => {
        try {
            const data = await getMenteeCandidate(program.ID, inputValue)
            return data.map((v)=> ({value: v.ID, label: `${v.FirstName} ${v.LastName}`}))
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const getDefault = async () => {
            const data = await getMenteeCandidate(program.ID,"")
            setDefaultSelect(data.map((v)=> ({value: v.ID, label: `${v.FirstName} ${v.LastName}`})))
        }
        if(selectShow)
            getDefault()
    }, [selectShow])

    useEffect(() => {
        getAllMentorMentee(program?.participants)
    },[])

    let buttonStyle = {
        height: "6vh",
        color: "#A684F2",
        backgroundColor: "white"
    }
    return(
        <div>
            <h5 className="mt-4 mb-4">Mentors ({mentor ? mentor.length : 0})</h5>
            {mentor && mentor.map((v)=>(
                <div className="mt-3">
                    <img src={DefaultProfileIcon} alt="Profile Icon" /> <span>{v.Name}</span>
                </div>
            ))}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h5 className="mt-4 mb-4">Mentees ({program?.participants ? program?.participants.length : 0})</h5>
                
                <Button styling={buttonStyle} title={selectShow?"Cancel" : "+ Add Mentee"} navigate={() => setSelectShow(!selectShow)}/>
                {selectShow && 
                <div style={{marginTop: "1.5rem"}}>
                    <AsyncSelect 
                        isMulti
                        defaultOptions={defaultSelect}
                        loadOptions={searchParticipant}
                        onChange={setAllSelectedParticipants}/>
                </div>
                }
            </div>
            {program?.participants && program?.participants.map((v)=>(
                <div className="mt-3">
                    <img src={DefaultProfileIcon} alt="Profile Icon" /> <span>{v.User.FirstName} {v.User.LastName}</span>
                </div>
            ))}
        </div>
    )
}

export default Participants