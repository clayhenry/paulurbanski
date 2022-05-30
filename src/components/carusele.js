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

    
    <div className="carusele" ref={carusele}>

{diablePrev
    ? (<div>Prev Disabled</div>) 
    : (<div className="clickable" onClick={prev} >Prev </div>)
}
        

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

{diableNext
    ? (<div>Next Disabled</div>) 
    : (<div className="clickable" onClick={next} >Next </div>)
}

    
    </div>
   )


 
}
export default Carus;