const Button = ({title, navigate, styling, disabled}) => {
    return(
        <button type="submit" 
            onClick={navigate} 
            className="btn btn-primary custom-button"
            style={styling}
            disabled={disabled}
        >
                {title}
        </button>
    )
}

export default Button