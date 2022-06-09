import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";

const Carus = (list) => {

    const carusele = useRef(null);
    const caruseleItem = useRef(null);
    const caruseleContainer = useRef(null);

    const [fullwidth, setFullWidth] = useState(0);
    const [itemwidth, setItemWidth] = useState(0);
    const [currentPosition, setcurrentPosition] = useState(0);
    const [incriment, setIncriment] = useState(1);
    const [diableNext, setDiableNext] = useState(false);
    const [diablePrev, setDiablePrev] = useState(true);
    

    useEffect(() => {
        setFullWidth(carusele.current.clientWidth);
        setItemWidth(caruseleItem.current.clientWidth);
        setIncriment(carusele.current.clientWidth/caruseleItem.current.clientWidth)
        
    }, []);

    // useEffect(() => {
    //     console.log(incriment);
    //   }, [incriment])


    const next = () => {
        let numberOfImages = list.list.length;

        setIncriment(incriment + 1) ;
        setcurrentPosition( currentPosition + itemwidth);
        setDiablePrev(false);

        if(numberOfImages == incriment + 1){
            setDiableNext(true);
            console.log("uuuu")
        } 
    } 


    const prev = () => {

        setcurrentPosition( currentPosition - itemwidth);
        setIncriment(incriment - 1) ;
        setDiableNext(false);
        if(itemwidth == currentPosition){
            setDiablePrev(true);
            console.log("dddd")
        } 
    } 


   return  (

    <div className="carusele" >

<div className="carusele-navigation carusele-left">
{diablePrev
    ? (<div className="carusele-nav-arrow carusele-disabled">&#10094;</div>) 
    : (<div className="clickable carusele-nav-arrow" onClick={prev} >&#10094; </div>)
}
</div>

    <div className="carusele-object" ref={carusele}>  

<div className="carusele-container"  style={{marginLeft: -currentPosition + 'px'}}>
    {list.list.map((book, i) => {

        if(i < 5){
    
            return(
                <div className="carusele-items " key={book.id} ref={caruseleItem} >
                <Link to={"/book/" + book.slug}  >
                <img  className={"home-book-image"}
                    src={book._embedded["wp:featuredmedia"][0].media_details.sizes['medium_large'].source_url}
                    alt=""/>
            </Link>
            </div>
            )
        }
    })}
    </div>

    </div>

    <div className="carusele-navigation carusele-right">
{diableNext
    ? (<div className="carusele-nav-arrow carusele-disabled">&#10095;</div>) 
    : (<div className="clickable carusele-nav-arrow" onClick={next} >&#10095;</div>)
}
</div>
</div>
   )


 
}
export default Carus;