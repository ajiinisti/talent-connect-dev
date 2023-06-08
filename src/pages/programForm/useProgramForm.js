import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { useNavigate } from "react-router-dom"

const useProgramForm = () => {
    const [data, setData] = useState({
        id: '',
        name: '',
        startDate: '',
        endDate: ''
    })
    const navigate = useNavigate()

    const postProgramForm = async (data) => {
        let res = await axiosInstance.post("/programs",data)
        if(res.status === 200) {
            console.log(res.data)
            navigate('/program')
        }
    }

    const putProgramForm = async (data) => {
        let res = await axiosInstance.put("/programs",data)
        if(res.status === 200) {
            console.log(res.data)
            navigate('/program')
        }
    }

    const getProgramById = async (id) => {
        let res = await axiosInstance.get("/programs/"+id)
        if(res.status === 200) {
            return res.data.data
        }
        return 
    }

    const fetchData = async(id) => {
        const getData = await getProgramById(id)
        console.log(getData)
        setData({
            id: getData.ID,
            name: getData.Name,
            startDate: getData.startDate,
            endDate: getData.endDate
        })
    }

    return {
        data,
        setData,
        postProgramForm,
        putProgramForm,
        getProgramById,
        fetchData
    }

}

export default useProgramForm