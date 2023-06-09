import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const useProgramForm = () => {
    const [data, setData] = useState({
        id: '',
        name: '',
        startDate: '',
        endDate: ''
    })
    const navigate = useNavigate()

    const postProgramForm = async (data) => {
        try {
            const isoStartDate = new Date(data.startDate).toISOString();
            const isoEndDate = new Date(data.endDate).toISOString();
            let newData = {
                ...data,
                startDate: isoStartDate,
                endDate: isoEndDate
            }
            let res = await axiosInstance.post("/programs",newData)
            if(res.status === 200) {
                navigate('/program')
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const putProgramForm = async (data) => {
        try {
            const isoStartDate = new Date(data.startDate).toISOString();
            const isoEndDate = new Date(data.endDate).toISOString();
            let newData = {
                ...data,
                startDate: isoStartDate,
                endDate: isoEndDate
            }
            let res = await axiosInstance.put("/programs",newData)
            if(res.status === 200) {
                navigate('/program')
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const getProgramById = async (id) => {
        try {
            let res = await axiosInstance.get("/programs/"+id)
            if(res.status === 200) {
                return res.data.data
            }
            return 
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const fetchData = async(id) => {
        const getData = await getProgramById(id)
        setData({
            id: getData.Program.ID,
            name: getData.Program.Name,
            startDate: getData.Program.startDate,
            endDate: getData.Program.endDate
        })
        console.log(getData)
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