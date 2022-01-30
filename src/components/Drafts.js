import {Link} from "react-router-dom";
import {Helmet, HelmetProvider} from "react-helmet-async";
import React, {useEffect, useRef} from "react";
import {Navigation} from "./Navigation";
import {Footer} from "./Footer";

const Drafts = ({posts}) => {
    const transition = useRef(null);

    const navigation = useRef(null);


    const scrollEffects = (() => {

        if (window.scrollY > 200 && navigation.current && !navigation.current.classList.contains("hide-me-now")) {

            navigation.current.classList.add("hide-me-now");
            navigation.current.classList.remove("show-me-now");

        }

        if (window.scrollY < 200 && navigation.current && navigation.current.classList.contains("hide-me-now")) {

            navigation.current.classList.remove("hide-me-now");
            navigation.current.classList.add("show-me-now")
        }});

    window.addEventListener('scroll', () => scrollEffects());
    return (

        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Paul Urbanski - Photography and other visual medium </title>
                    <link rel="canonical" href="https://paulurbanski.com/stories"/>
                </Helmet>
                <div className="transition" ref={transition} style={{backgroundColor: '#f0f0f0'}} ></div>
                <div className="post-container">

                    <div ref={navigation} className='navigation-container'><Navigation/></div>
                    <div className="feed-body">
                        <div className="home-post-list" style={{marginTop: '200px'}}>

                            <ul>
                                {posts.map((post, i) =>
                                            {
                                            if(post.acf.private[0] == 'yes'){
                                                return(
                                                <li key={post.id} className={"item"}>
                                                    <div className={"home-post-title"}>
                                                        <Link to={"/stories/" + post.slug}>
                                                            {post.title['rendered']}

                                                            <img
                                                                src={post._embedded["wp:featuredmedia"][0].media_details.sizes['thumbnail'].source_url}
                                                                alt=""/>
                                                        </Link>
                                                        <div className="post-category home-category">

                                                            From {post.acf.category}

                                                        </div>
                                                        <div>
                                                        </div>
                                                    </div>
                                                </li>
                                                )
                                            }

                                }
                                )
                                }
                            </ul>

                        </div>
                        <Footer/>
                        <br/><br/>
                    </div>
                </div>

            </HelmetProvider>
        </>
    )
}

export default Drafts;


