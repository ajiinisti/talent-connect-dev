import Button from "./Button"
import { useNavigate } from 'react-router-dom';

const CancelButton = () => {
    const navigate = useNavigate()
    const goBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    const buttonCancelStyle = {
        borderRadius : '5px',
        height: '40px',
        backgroundColor: 'white',
        color: 'black',
        border: '0.5px solid #d3d3d3',
        outline: 'gray',
        marginLeft: '1rem'
    }

    return(
        <Button title={"Cancel"} styling={buttonCancelStyle} navigate={goBack} />
    )
}

export default CancelButton