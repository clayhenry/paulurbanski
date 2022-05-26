import {Link, useNavigate} from "react-router-dom";

const Carus = (list) => {

 function next() {
       console.log("next")
   } 
function prev() {
    console.log("prev")
} 


   return  (
    <div className="carusele">

<div onClick={prev}>Prev</div>

    {list.list.map((book, i) => {
       console.log(book)
        if(i < 5){
    
            return(
                <div className="carusele-items" key={book.id}>
                <Link to={"/book/" + book.slug}  >
                <img  className={"home-book-image"}
                    src={book._embedded["wp:featuredmedia"][0].media_details.sizes['medium_large'].source_url}
                    alt=""/>
            </Link>
            </div>
            )
        }
    })}
<div onClick={next} >Next</div>
    
    </div>
   )


 
}
export default Carus;