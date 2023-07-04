import { useEffect, useState } from "react"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import ActivityCard from "../../pages/activityList/ActivityCard"

const Pagination = ({content, programId}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [allActivities, setAllActivities] = useState([])
    const totalPages = Object.keys(content).length; 

    const cardStyle = {
        top : '1rem',
        bot : '1rem'
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        let allData = []
        Object.entries(content).forEach(([key, value]) => {
            value.sort((a, b) => new Date(a.Date) - new Date(b.Date));
            let data = {
                date: key, 
                data: value
            }
            allData.push(data)
        })
        setAllActivities(allData)
    }, [content])

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-between">
                <h4><b>{allActivities[currentPage-1]?.date}</b></h4>
                <div style={{ 
                    justifyItems: 'end',
                    alignItems: 'start'
                }}>
                    <button
                        className="btn"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        <AiOutlineLeft/>
                    </button>
                    <button
                        className="btn"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        <AiOutlineRight/>
                    </button>
                </div>
            </div>
            <div className="mt-3">
                {
                    allActivities[currentPage - 1]?.data?.map((v) => (
                        <div key={v.Date}>
                        <h5 className="mt-4">{new Date(v.Date).toLocaleString('en-US', { weekday: 'long' })}, {v.Date}</h5>
                        {
                            v.Activities?.map((a) => (
                                <div style={{ marginTop: "1.5rem" }}>
                                <ActivityCard title={a.Name} styling={cardStyle} activity={a} programId={programId} isMentoring={false} />
                                </div>
                            ))
                        }
                        {
                            v.MentoringSchedules?.map((a) => (
                                <div style={{ marginTop: "1.5rem" }}>
                                <ActivityCard title={a.Name} styling={cardStyle} activity={a} programId={programId} isMentoring={true} />
                                </div>
                            ))
                        }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Pagination