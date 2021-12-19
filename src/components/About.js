import {Link} from "react-router-dom";
import {Helmet, HelmetProvider} from "react-helmet-async";
import React, {useRef} from "react";
import image from './paulurbanski.jpg';
import {Navigation} from "./Navigation";
import {Footer} from "./Footer";

const About = () => {
    const transition = useRef(null);
    const feedHeading = useRef(null);
    const navigation = useRef(null);


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
    window.addEventListener('scroll', () => scrollEffects());


    return (


        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>About Paul Urbanski - Photographer, stories and more. </title>
                    <link rel="canonical" href="https://paulurbanski.com/about"/>
                </Helmet>
                <div className="transition" ref={transition} style={{backgroundColor: '#f0f0f0'}}></div>
                <div className="post-container">
                    <div className="feed-heading heading-transition" ref={feedHeading} style={{top: '25%'}}>
                        <div className="post-title">About</div>
                        <div className="post-excerpt">
                            Thanks for taking a peak! Here is a quick info about the author of this page and its
                            content.
                        </div>

                    </div>
                    <div ref={navigation} className='navigation-container'><Navigation/></div>
                    <div className="feed-body"><br/><br/>
                        <div className="home-post-list">
                            <div className={"home-feed about-feed"}>
                                <img className={'paul-image'} src={image}/>
                                <div>
                                    Name: Paul Urbanski <br/>
                                    Location: Edmonton, Canada <br/>
                                    Contact: pawel*clusterone.ca <br/><br/>
                                    There is not much to it, this is my website where I lke to post stories (some true, some not) with the emphasis on photography and other visual medium:  experimenting with audio, video when I get the chance. <br/><br/>
                                    Sometimes, I  <a href={'/books'}> self-publish books or magazines. </a> These can be experimental or personal. <br/><br/>
                                    A lot of visuals focus on family and life in Western Canada. Not very exotic or exciting but very challenging. <br/><br/>
                                    My <a href={'/dispatch'}>dispatches </a> focus on quick, behind the scenes, posts. Inspired by Instagram, it's meant for frequent updates and up-to date content. <br/><br/>
                                    <a href={'/stories'}> Stories</a> are the meat of the site, mini-projects, posts that can be creative, experimental or just a record of events. I can't guarantee the truthiness of these posts, these can be real events or pure fiction. <br/><br/>


                                </div>
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


