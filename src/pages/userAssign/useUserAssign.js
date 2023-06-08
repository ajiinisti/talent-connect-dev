import { useState } from "react"

const useUserAssign = () => {
    const [programs, setProgram] = useState([])

    const getPrograms = async (role, id) => {

    }

    return {
        programs,
        getPrograms
    }
}

export default useUserAssign