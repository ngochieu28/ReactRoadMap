import { useHistory } from "react-router-dom"

const NotFounds = () => {
    let history = useHistory()

    const handleClickGoHome = () => {
        history.push('/')
    }
    return (
        <div className="notFounf-container">
            <h4>This Page Isn't Avalible</h4>
            <h5>This link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct.</h5>
            <button className="btn btn-primary" onClick={() => handleClickGoHome()}>Go to HomePage</button>
        </div>
    )
}

export default NotFounds;