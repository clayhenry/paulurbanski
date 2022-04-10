import {Link, useNavigate} from "react-router-dom";
import {Helmet, HelmetProvider} from "react-helmet-async";
import React, {useEffect, useRef} from "react";
import {Navigation} from "./Navigation";
import {Footer} from "./Footer";
import Books from "./Books";

const Home = ({posts, feeds, books}) => {
    const transition = useRef(null);
    const feedHeading = useRef(null);
    const navigation = useRef(null);

    useEffect(() => {
        scrollEffects();
    }, []);


    function goTo(destination) {
        window.location.href = destination
    }

    const scrollEffects = (() => {

        if (window.scrollY > 200 && navigation.current && !navigation.current.classList.contains("hide-me-now")) {

            navigation.current.classList.add("hide-me-now");
            navigation.current.classList.remove("show-me-now");

        }

        if (window.scrollY < 200 && navigation.current && navigation.current.classList.contains("hide-me-now")) {

            navigation.current.classList.remove("hide-me-now");
            navigation.current.classList.add("show-me-now");

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

    });

    window.addEventListener('scroll', () => scrollEffects());
    return (


        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Paul Urbanski - Photography and stories from Western Canada </title>
                    <link rel="canonical" href="https://paulurbanski.com"/>
                </Helmet>
                <div className="transition" ref={transition} style={{backgroundColor: '#f0f0f0'}}></div>
                <div className="post-container">
                    <div className="feed-heading heading-transition" ref={feedHeading} style={{top: '25%'}}>
                        <div className="post-excerpt">
                            Personal photography and stories from Paul Urbanski. Here, I feature fiction and non fiction stories,
                            posts from my home town in Western Canada, and family life... <a href={'/about'}>Read more here.</a>
                        </div>

                    </div>
                    <div ref={navigation} className='navigation-container'><Navigation/></div>
                    <div className="feed-body">
                        <div className="home-post-list">
                            <ul>
                                {posts.map((post, i) => {
                                    
                                        if (i < 6 & post.acf.private[0] != 'yes')  {
                                            return (
                                                <li key={post.id} className={"item"}>
                                                    <div className={"home-post-title"}>
                                                        <Link to={"/stories/" + post.slug}>
                                                            <span dangerouslySetInnerHTML={{__html: post.title['rendered']}} ></span> 
                                                        
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

                            <div className="next-project">
                                <div className="home-next-link">

                                    <Link to={"/stories"}> There's more, see all stories &rarr;</Link>
                                </div>
                            </div>

                        </div>

                        <div className={"home-feed clickable"} onClick={()=>goTo('/dispatch')}>
                            {feeds.map((feed, i) => {
                                if(i < 5){
                                    return(
                                        <div className={'home-feed-item'} key={feed.id} dangerouslySetInnerHTML={{__html: feed.content['rendered']}}></div>
                                    )
                                }
                            })}
                        </div>
                        <div className="next-project">
                            <div className="home-next-link">

                                <Link to={"/dispatch"}> See all dispatches &rarr;</Link>
                            </div>
                        </div>
                    
                        <div className={"home-books clickable"}>
                            {books.map((book, i) => {
                                if(i < 5){
                                    return(
                                        <Link to={"/book/" + book.slug}>
                                        <img className={"home-book-image"}
                                            src={book._embedded["wp:featuredmedia"][0].media_details.sizes['medium_large'].source_url}
                                            alt=""/>
                                    </Link>
                                    )
                                }
                            })}
                        </div>
                        <div className="next-project">
                            <div className="home-next-link">

                                <Link to={"/books"}> See all books &rarr;</Link>
                            </div>
                        </div>

                            <br/><br/>
                        <Footer/>
                        <br/><br/>
                    </div>
                </div>

            </HelmetProvider>
        </>
    )
}

export default Home;


