import {Link} from "react-router-dom"
import "./index.css"


const Header=()=>(
    <div className="headerContainer">
        <Link to="/" className="link-head">
        <h1 className="app-title">Book App</h1>
        </Link>
        <div className="favorite">
            <p>Favorite Books</p>
        </div>
    </div>
)

export default Header