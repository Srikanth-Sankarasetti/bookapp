import {Component} from "react";
import Loader from "react-loader-spinner"
import Header from "../Header";
import BookList from "../BookList"

import "./index.css"

const initialApiStatus={
    initial:"INITIAL",
    progress:"PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"
}

class Home extends Component{
    state={
        bookList:[],
        apiStatus:initialApiStatus.initial
    }

    componentDidMount(){
       this.getDetails()  
    }

    getDetails=async ()=>{
    this.setState({apiStatus:initialApiStatus.progress})
    const options={
        method:"GET"
    }
      const response=await fetch("https://example-data.draftbit.com/books?_limit=44",options)
      if(response.ok===true){
        const data=await response.json()
        const details=data.map(each=>({
            author:each.authors,
            format:each.format,
            imageUrl:each.image_url,
            ratingCount:each.rating_count,
            rating:each.rating,
            title:each.title,
            id:each.id
        }))
        this.setState({bookList:details,apiStatus:initialApiStatus.success})
      }else{
        this.setState({apiStatus:initialApiStatus.failure})
      }
    }


renderLoader=()=>(
    <div className="loader">
        <Loader type="TailSpin" color="red" height={50} width={50}/>
    </div>
)


renderDetails=()=>{
    const {bookList}=this.state
    return(
        <div>
        <ul className="bool-list-ul">
            {bookList.map(each=>(
                <BookList key={each.id} booklists={each}/>
            ))}
        </ul>
        </div>   
        )
    }

rendDetailsOnApiStaus=()=>{
    const {apiStatus}=this.state
    switch(apiStatus){
        case initialApiStatus.progress:
            return this.renderLoader()
        case initialApiStatus.success:
            return this.renderDetails()
        default:
            return null
    }
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

export default Home