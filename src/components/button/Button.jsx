const Button = ({title, navigate}) => {
    return(
        <button type="submit" onClick={navigate} className="btn btn-primary custom-button">{title}</button>
    )
}

export default Button