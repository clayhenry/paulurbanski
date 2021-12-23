import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Navigation} from "./Navigation";
import {Footer} from "./Footer";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Book = ({book}) => {
    const { bookId } = useParams();
    const [currentBook, setCurrentBook] = useState();
    const navigation = useRef(null);
    const transition = useRef(null);

    useEffect(() => {

        if (book.length > 0){
            setCurrentBook(book.filter((p)=> p.slug == bookId)[0]);
        }

    },[book]);


    const scrollEffects = (() => {


        if (window.scrollY > 200 && navigation.current && !navigation.current.classList.contains("hide-me-now")) {

            navigation.current.classList.add("hide-me-now");
            navigation.current.classList.remove("show-me-now");

        }

        if (window.scrollY < 200 && navigation.current && navigation.current.classList.contains("hide-me-now")) {

            navigation.current.classList.remove("hide-me-now");
            navigation.current.classList.add("show-me-now")
        }

    })

    if (currentBook){

        window.addEventListener('scroll', () => scrollEffects());
        return (
            <>

                <HelmetProvider>
                    <Helmet>
                        <meta charSet="utf-8"/>
                        <title>{currentBook.title['rendered']} - Photography Books by Paul Urbanski</title>
                        <link rel="canonical" href={'https://paulurbanski.com/book/' + currentBook.title['rendered']} />
                    </Helmet>

                <div className="transition" ref={transition} style={{backgroundColor: '#cad2db'}}></div>
                <div className="post-container book-item-element">
                    <div ref={navigation}> <Navigation /> </div>
                </div>


                <div className="post-heading book-heading heading-transition"  >
                    <div className="post-title"> {currentBook.title['rendered']}</div>
                </div>
                <div className="post-body book-body book-element">
                    <span dangerouslySetInnerHTML={{__html: currentBook.content['rendered']}}></span>
                    <Footer/>
                </div>

                </HelmetProvider>
                </>

        )

    }
    return (
        <>Hold on...</>
    )
}
export default Book;