import {Navigation} from './Navigation';
import {Footer} from './Footer';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import React, {useRef, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Books = ({books}) => {

    const transition = useRef(null);
    const navigation = useRef(null);
    const feedHeading = useRef(null);

    useEffect(() => {
        scrollEffects();
    }, []);

    const navigate = useNavigate();
    const goTo = (destination) => navigate('/book/' + destination);

    const scrollEffects = (() => {


        if (window.scrollY > 200 && navigation.current && !navigation.current.classList.contains("hide-me-now")) {

            navigation.current.classList.add("hide-me-now");
            navigation.current.classList.remove("show-me-now");

        }

        if (window.scrollY < 200 && navigation.current && navigation.current.classList.contains("hide-me-now")) {

            navigation.current.classList.remove("hide-me-now");
            navigation.current.classList.add("show-me-now")
        }

        if (feedHeading.current && feedHeading.current.style) {
            let opacity = 1 - (window.scrollY / 200)
            if (opacity <= 1) {
                feedHeading.current.style.opacity = opacity;
            }

            feedHeading.current.style.transform = "translateY(" + (window.scrollY * 1.2) + "%)";
            if (window.scrollY > 700 && window.scrollY > 900) {
                feedHeading.current.style.transform = "translateY(-10%)";
            }
            if (window.scrollY > 400) {
                feedHeading.current.style.marginTop = "-500px";
                // feedHeading.current.classList.remove("show-me-now");
            }

            if (window.scrollY < 400) {
                feedHeading.current.style.marginTop = "0";
                // feedHeading.current.classList.remove("hide-me-now");
                // feedHeading.current.classList.add("show-me-now")
            }
        }


    })

    if (books) {

        window.addEventListener('scroll', () => scrollEffects());
        return (
            <>
                <HelmetProvider>
                    <Helmet>
                        <meta charSet="utf-8"/>
                        <title>Photography Books by Paul Urbanski from Western Canada</title>
                        <link rel="canonical" href="https://paulurbanski.com/books"/>
                    </Helmet>
                    <div className="transition" ref={transition} style={{backgroundColor: '#f0f0f0'}}></div>
                    <div className="post-container book-container">
                        <div className="feed-heading heading-transition" ref={feedHeading}>
                            <div className="post-title">Books</div>
                            <div className="post-excerpt">
                                If you must stick to the latest react-router-dom v6.0.0, then replace useHistory with
                                useNavigate.
                            </div>
                        </div>
                        <div ref={navigation} className='navigation-container'><Navigation/></div>
                        <div className="feed-body books-body">
                            <div className="feed-posts books-post">

                                {
                                    books.map((book) =>
                                        <div key={book.id} className="feed-post-item book-post-item">
                                            <div className={'books-item clickable'} onClick={()=>goTo(book.slug)} >
                                                <div className='book-item-contents'>
                                                    <img src={book._embedded["wp:featuredmedia"][0].media_details.sizes['medium'].source_url} />
                                                    <div className={'books-item-title'} > {book.title['rendered']}</div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                            <Footer/>
                            <br/><br/>
                        </div>

                    </div>
                </HelmetProvider>
            </>
        )
    } else {
        return (
            []
        )
    }
}

export default Books;