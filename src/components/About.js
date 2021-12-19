import {Link} from "react-router-dom";
import {Helmet, HelmetProvider} from "react-helmet-async";
import React, {useRef} from "react";
import {Navigation} from "./Navigation";
import {Footer} from "./Footer";

const About = () => {
    const transition = useRef(null);
    const feedHeading = useRef(null);
    const navigation = useRef(null);



    return (


        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Paul Urbanski </title>
                    <link rel="canonical" href="http://mysite.com/example"/>
                </Helmet>
                <div className="transition" ref={transition} style={{backgroundColor: '#f0f0f0'}} ></div>
                <div className="post-container">
                    <div className="feed-heading heading-transition" ref={feedHeading}>
                        <div className="post-excerpt">
                            Visual vignettes from the field. For quick digestion, expressions and motivation. Trying to keep it updated on regular basis.
                        </div>

                    </div>
                    <div ref={navigation} className='navigation-container'><Navigation/></div>
                    <div className="feed-body">
                        <div className="home-post-list">
                                  <div className={"home-feed" }>
                                      About stuff
                                  </div>

                        </div>
                        <Footer/>
                        <br/><br/>
                    </div>
                </div>

            </HelmetProvider>
        </>
    )
}

export default About;


