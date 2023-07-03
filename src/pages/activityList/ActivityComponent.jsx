import { Tabs } from "antd";
import ActivityList from "./ActivityList";
import useActivityList from "./useActivityList";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Participants from "../../components/participants/Participants";

const ActivityComponent = () => {
    const {
        getPrograms,
        programs
    } = useActivityList()
    const params = useParams()

    const items = [
        {
          key: '1',
          label: `Activities`,
          children: <ActivityList/>,
        },
        {
          key: '2',
          label: `Participant`,
          children: <Participants program={programs}/>,
        },
        {
          key: '3',
          label: `Evaluation`,
          children: `Content of Evaluation`,
        },
      ];

    useEffect(()=>{
        getPrograms(params.programId)
    }, [])

    return(
        <div className="container py-5 px-5 mb-5">
            <h2 className="mt-2"><b>{programs?.Name}</b></h2>
            <Tabs
                defaultActiveKey="1"
                tabPosition={"top"}
                items={items}
            />
        </div>
    )
}

export default ActivityComponent