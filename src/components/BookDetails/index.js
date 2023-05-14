import { Component } from "react";
import {AiFillStar} from "react-icons/ai"
import Loader from "react-loader-spinner"
import Header from "../Header";

import "./index.css"


const initialApiStatus={
    initial:"INITIAL",
    progress:"PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"
}

class BookDetails extends Component{
   state={
    bookDetails:{},
    apiStatus:initialApiStatus.initial
   }

   componentDidMount(){
    this.getBookDetails()
   }

   getBookDetails=async ()=>{
    this.setState({apiStatus:initialApiStatus.progress})
    const options={
        method:"GET"
    }
    const {match}=this.props
    const {params}=match
    const {id}=params
    const response=await fetch(`https://example-data.draftbit.com/books?id=${id}`,options)
    if(response.ok===true){
    const data=await response.json()
    console.log(data)
    const details={
        authors:data[0].authors,
        description:data[0].description,
        edition:data[0].edition,
        format:data[0].format,
        genres:data[0].genres,
        imageUrl:data[0].image_url,
        numPages:data[0].num_pages,
        rating:data[0].rating,
        ratingCount:data[0].rating_count,
        reviewCount:data[0].review_count,
        title:data[0].title
    }
    console.log(details)
    this.setState({bookDetails:details,apiStatus:initialApiStatus.success})
    }
   }

   renderLoader=()=>(
    <div className="loader">
        <Loader type="TailSpin" color="red" height={50} width={50}/>
    </div>
)


rendDetailsOnApiStaus=()=>{
    const {apiStatus}=this.state
    switch(apiStatus){
        case initialApiStatus.progress:
            return this.renderLoader()
        case initialApiStatus.success:
            return this.renderBookDetails()
        default:
            return null
    }
}


   renderBookDetails=()=>{
    const {bookDetails}=this.state 
    const { authors,
        description,
        edition,
        format,
        genres,
        imageUrl,
        numPages,
        rating,
        ratingCount,
        reviewCount,
        title
   }=bookDetails

   return(
    <div className="book-indetails-container">
        <div>
            <img className="singleImage" src={imageUrl} alt={title}/>
        </div>
        <div>
            <h1 className="book-head">{title} ({format}, {authors})</h1>
             <div className="rating-and-ratingcount-container">
            <div className="rating-container">
                <p>{rating}</p>
                <AiFillStar color="yellow"/>
            </div>
            <p className="rate-and-review">{ratingCount} Ratings & {reviewCount} Reviews</p>
            </div>
            <p className="gener-para"><span className="span-element">Geners:</span> {genres}</p>
            <h1 className="description-head"> Description:</h1>
            <p className="discription-para">{description}</p>
            <div>
                {edition!==""?<p><span className="span-element">Edition:</span> {edition}</p>:null}
                <p> <span className="span-element">Number Of Pages:</span> {numPages}</p>
            </div>
            <button className="favorite-button" type="button">Add Favorite List</button>
        </div>
    </div>
   )

}

    render(){
        return(
            <>
            <Header/>
            <div>
              {this.rendDetailsOnApiStaus()}
            </div>
            </>  
        )
    }
}

export default BookDetails