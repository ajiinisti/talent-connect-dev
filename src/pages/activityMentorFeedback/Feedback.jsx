const Feedback = ({name, mentor, feedback, date, image}) => {
    return(
        <>
            <h5 className="mt-4 mb-4">{name}</h5>
            <div className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <div class="container mb-3" style={{
                        display: 'flex',
                        alignItems: 'flex-start'
                    }}>
                    <img src={image} alt="Profile Icon" class="image" style={{width: '40px', marginRight:'1rem'}}/>
                    <div class="content">
                        <div class="name">{mentor}</div>
                        <span style={{fontSize: '13px', color: 'gray'}}>{date}</span>
                    </div>
                </div>
                <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                    <span>{feedback}</span>
                </div>
            </div>
        </>
    )
}

export default Feedback