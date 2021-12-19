import {Navigation} from './Navigation';
import {Footer} from './Footer';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import React, {useRef, useEffect, useState} from 'react'

const Feed = ({feeds}) => {

    const transition = useRef(null);
    const navigation = useRef(null);
    const feedHeading = useRef(null);

    useEffect(() => {
        scrollEffects();
    }, []);


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
                feedHeading.current.classList.add("hide-me-now");
                feedHeading.current.classList.remove("show-me-now");
            }

            if (window.scrollY < 400) {
                feedHeading.current.classList.remove("hide-me-now");
                feedHeading.current.classList.add("show-me-now")
            }
        }


    })

    if (feeds) {

        window.addEventListener('scroll', () => scrollEffects());
        return (
            <>
                <HelmetProvider>
                    <Helmet>
                        <meta charSet="utf-8"/>
                        <title>Dispatch by Paul Urbanski - Photography</title>
                        <link rel="canonical" href="https://paulurbanski.com/dispatch"/>
                    </Helmet>
                    <div className="transition" ref={transition} style={{backgroundColor: '#f0f0f0'}}></div>
                    <div className="post-container">
                        <div className="feed-heading heading-transition" ref={feedHeading} style={{top: '25%'}} >
                            <div className="post-title">Dispatch</div>
                            <div className="post-excerpt">
                             Visual vignettes from the field. For quick digestion, expressions and motivation. Trying to keep it updated on regular basis.
                            </div>
                        </div>
                        <div ref={navigation} className='navigation-container'><Navigation/></div>
                        <div className="feed-body">
                            <div className="feed-posts">

                                {
                                    feeds.map((feed) =>
                                        <div key={feed.id} className="feed-post-item">
                                            <div>
                                                {/* <div className="feed-item-title">{feed.title['rendered']}</div> */}
                                                <div dangerouslySetInnerHTML={{__html: feed.content['rendered']}}></div>
                                                <div
                                                    className="feed-datetime">{new Date().toDateString('', feed.date)}</div>
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

export default Feed;