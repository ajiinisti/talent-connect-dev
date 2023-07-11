import { Collapse } from "antd"
import { UpOutlined,DownOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import useScore from "./useScore"
import { useParams } from "react-router-dom"
const EvaluationScore = () => {
    const params = useParams()
    const {getScore, items} = useScore()
    useEffect(() => {
      getScore(params.programId)
    }, [])
    

    return (
        <>
        <Collapse 
            expandIconPosition="right" 
            expandIcon={({isActive }) => isActive? <UpOutlined /> : <DownOutlined/> } 
            style={{background: 'transparent', borderBottom: '1px solid #d9d9d9', borderBottomLeftRadius:'0px', borderBottomRightRadius:'0px'}} bordered={false} 
            accordion 
            items={items}
        />
        </>
    )
}

export default EvaluationScore