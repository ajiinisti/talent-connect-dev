const Button = ({title, navigate, styling}) => {
    return(
        <button type="submit" 
            onClick={navigate} 
            className="btn btn-primary custom-button"
            style={styling}
        >
                {title}
        </button>
    )
}

export default Button