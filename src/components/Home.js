import {Link, useNavigate} from "react-router-dom";
import {Helmet, HelmetProvider} from "react-helmet-async";
import React, {useEffect, useRef} from "react";
import {Navigation} from "./Navigation";
import {Footer} from "./Footer";

const Home = ({posts, feeds}) => {
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
            navigation.current.classList.add("show-me-now")
        }});

    window.addEventListener('scroll', () => scrollEffects());
    return (


        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Paul Urbanski </title>
                    <link rel="canonical" href="http://mysite.com/example"/>
                </Helmet>
                <div className="transition" ref={transition} style={{backgroundColor: '#f0f0f0'}}></div>
                <div className="post-container">
                    <div className="feed-heading heading-transition" ref={feedHeading}>
                        <div className="post-excerpt">
                            Visual vignettes from the field. For quick digestion, expressions and motivation. Trying to
                            keep it updated on regular basis.
                        </div>

                    </div>
                    <div ref={navigation} className='navigation-container'><Navigation/></div>
                    <div className="feed-body">
                        <div className="home-post-list">
                            <ul>
                                {posts.map((post, i) => {
                                        if (i < 6) {
                                            return (
                                                <li key={post.id} className={"item"}>
                                                    <div className={"home-post-title"}>
                                                        <Link to={"/post/" + post.slug}>
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

                            <div className="next-project">
                                <div className="home-next-link">

                                    <Link to={"/posts/"}> There's more, see all post &rarr;</Link>
                                </div>
                            </div>

                        </div>

                        <div className={"home-feed clickable"} onClick={()=>goTo('/dispatch')}>
                            {feeds.map((feed, i) => {
                                if(i < 3){
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


