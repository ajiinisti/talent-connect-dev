import Button from "./Button"
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs"

const ArrowButton = ({isTwoSection}) => {
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

    return(
        <Button title={<h2><BsArrowLeft/></h2>} styling={ !isTwoSection ? {...buttonCancelStyle, marginBottom: '1rem'}: buttonCancelStyle} navigate={()=>navigate(-1)}/>
    )
}

export default ArrowButton