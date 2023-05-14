
import {AiFillStar} from "react-icons/ai"
import {Link} from "react-router-dom"
import "./index.css"


const BookList=(props)=>{
    const {booklists}=props 
    const {id,imageUrl,title,author,rating,format,ratingCount}=booklists

    return(
        <li className="list-data">
            <Link to={`/book/${id}`} className="link-data">
            <div className="book-container">
            <img className="book-image" src={imageUrl} alt={title}/>
            <h1 className="title">{title}</h1>
            <p>{format}, {author}</p>
            <div className="rating-and-ratingcount-container">
            <div className="rating-container">
                <p>{rating}</p>
                <AiFillStar color="yellow"/>
            </div>
            <p>({ratingCount})</p>
            </div>
            </div>
            </Link>
        </li>
    )
}

export default BookList