import { useEffect, useState } from "react"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import ActivityCard from "./ActivityCard"

const Pagination = ({content, programId}) => {
    const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1)
    const [currentPagePast, setCurrentPagePast] = useState(1)
    const [upcomingActivities, setUpcomingActivities] = useState([])
    const [pastActivities, setPastActivities] = useState([])
    const [totalPagesPast, setTotalPagesPast] = useState(0)
    const [totalPagesUpcoming, setTotalPagesUpcoming] = useState(0)

    const cardStyle = {
        top : '1rem',
        bot : '1rem'
    }

    const handlePrevious = (section) => {
        if (section === "past" && currentPagePast > 1) {
            setCurrentPagePast(currentPagePast - 1)
        }
        if(section === "up" && currentPageUpcoming > 1){
            setCurrentPageUpcoming(currentPageUpcoming - 1)
        }
    };

    const handleNext = (section) => {
        if (section === "past" && currentPagePast < totalPagesPast) {
            setCurrentPagePast(currentPagePast + 1)
        }
        if (section === "up" && currentPageUpcoming < totalPagesUpcoming){
            setCurrentPageUpcoming(currentPageUpcoming + 1)
        }
    };

    const handleData = () => {
        let allData = []
        const pastData = []
        const upComingData = []

        Object.entries(content).forEach(([key, value]) => {
            value.sort((a, b) => new Date(a.Date) - new Date(b.Date));
            let data = {
                date: key, 
                data: value
            }
            allData.push(data)
        })

        allData.sort((a, b) => new Date(a.date) - new Date(b.date));

        console.log(allData)

        allData.forEach((y) => {
            const filteredPast = y.data.filter((x) => new Date(x.Date) < new Date())
            if (filteredPast.length > 0) {
                pastData.push({
                    date: y.date,
                    data: filteredPast
                });     
            }

            const filteredUpcoming = y.data.filter((x) => new Date(x.Date) >= new Date())
            if (filteredUpcoming.length > 0) {
                upComingData.push({
                    date: y.date,
                    data: filteredUpcoming
                });     
            }
        });
        setPastActivities(pastData)
        setUpcomingActivities(upComingData)
        setTotalPagesPast(pastData.length)
        setTotalPagesUpcoming(upComingData.length)
        setCurrentPagePast(pastData.length)
    }

    useEffect(() => {
        handleData()
    }, [content])

    return (
        <div className="mt-4">
            <div className="mt-3">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <h5>Upcoming Activities</h5>
                        </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div className="d-flex justify-content-between mt-3">
                                    <h5><b>{upcomingActivities[currentPageUpcoming - 1]?.date}</b></h5>
                                    <div style={{ 
                                        justifyItems: 'end',
                                        alignItems: 'start'
                                    }}>
                                        <button
                                            className="btn"
                                            onClick={() => handlePrevious("up")}
                                            disabled={currentPageUpcoming === 1}
                                        >
                                            <AiOutlineLeft/>
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => handleNext("up")}
                                            disabled={currentPageUpcoming === totalPagesUpcoming}
                                        >
                                            <AiOutlineRight/>
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    {
                                        upcomingActivities[currentPageUpcoming - 1]?.data?.map((v) => (
                                            <div key={v.Date}>
                                            <h5 className="mt-4">{new Date(v.Date).toLocaleString('en-US', { weekday: 'long' })}, {v.Date}</h5>
                                            {
                                                v.Activities?.map((a) => (
                                                    <div style={{ marginTop: "1.5rem" }}>
                                                    <ActivityCard title={a.Name} styling={cardStyle} activity={a} programId={programId} isMentoring={false} isPassed={false}/>
                                                    </div>
                                                ))
                                            }
                                            {
                                                v.MentoringSchedules?.map((a) => (
                                                    <div style={{ marginTop: "1.5rem" }}>
                                                    <ActivityCard title={a.Name} styling={cardStyle} activity={a} programId={programId} isMentoring={true} isPassed={true}/>
                                                    </div>
                                                ))
                                            }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            <h5>Past Activities</h5>
                        </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div className="d-flex justify-content-between mt-3">
                                    <h5><b>{pastActivities[currentPagePast - 1]?.date}</b></h5>
                                    <div style={{ 
                                        justifyItems: 'end',
                                        alignItems: 'start'
                                    }}>
                                        <button
                                            className="btn"
                                            onClick={() => handlePrevious("past")}
                                            disabled={currentPagePast === 1}
                                        >
                                            <AiOutlineLeft/>
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => handleNext("past")}
                                            disabled={currentPagePast === totalPagesPast}
                                        >
                                            <AiOutlineRight/>
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    {
                                        pastActivities[currentPagePast - 1]?.data?.map((v) => (
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pagination