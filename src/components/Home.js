import {Link} from "react-router-dom";
import {Helmet, HelmetProvider} from "react-helmet-async";
import React, {useRef} from "react";
import {Navigation} from "./Navigation";
import {Footer} from "./Footer";

const Home = ({posts}) => {
    const transition = useRef(null);
    const feedHeading = useRef(null);
    const navigation = useRef(null);

    console.log(posts)

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
                                {posts.map((post) =>

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
                                    // <li  >{post.title['rendered']}</li>
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

export default Home;


