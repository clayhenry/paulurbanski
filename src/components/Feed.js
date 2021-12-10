import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useRef, useEffect, useState } from 'react'

const Feed = ({feeds}) => {

    const transition = useRef(null);
    const navigation = useRef(null);
    const postHeading = useRef(null);

    let appliedHidenClassTransition = false;

    useEffect(() => {
        scrollEffects();
      }, []);

    const scrollEffects= (()=>{


        if (window.scrollY > 200 && !appliedHidenClassTransition && navigation.current  && !navigation.current.classList.contains("hide-me-now") ){
            
            navigation.current.classList.add("hide-me-now");
            navigation.current.classList.remove("show-me-now");
            appliedHidenClassTransition = true;
        } 

        if (window.scrollY < 200 && appliedHidenClassTransition && navigation.current && navigation.current.classList.contains("hide-me-now") ){
            appliedHidenClassTransition = false;
            navigation.current.classList.remove("hide-me-now");
            navigation.current.classList.add("show-me-now")  
        }


        if (postHeading.current){
            postHeading.current.style.transform = "translateY(" + (window.scrollY /2 ) + "%)";  
            if (window.scrollY > 700 && window.scrollY > 900){
                postHeading.current.style.transform = "translateY(0%)"; 
            }
            if (window.scrollY > 700){
                postHeading.current.classList.add("hide-me-now");
                postHeading.current.classList.remove("show-me-now");
            } 

            if (window.scrollY < 700 ){
                postHeading.current.classList.remove("hide-me-now");
                postHeading.current.classList.add("show-me-now")  
            }
        }
        


    })

if (feeds){

    window.addEventListener('scroll', ()=>scrollEffects());
    return (
        <>
        <HelmetProvider >
            <Helmet>
                <meta charSet="utf-8" />
                <title>Feed by Paul Urbanski</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="transition" ref={transition} style={{backgroundColor: '#f0f0f0'}} ></div>
        <div className="post-container"> 
        <div className="post-heading feed-heading heading-transition" ref={postHeading}>
                  <div className="post-title" >Feed</div>
                  <div  className="post-excerpt">
                  If you must stick to the latest react-router-dom v6.0.0, then replace useHistory with useNavigate. Else, downgrade your react-router-dom to v5.2.0 and your code works as it should.
                  </div>
              </div>
          <div ref={navigation} className='navigation-container'> <Navigation /> </div>
          <div className="post-body" >
          <div className="feed-posts" >
          
                {
                        feeds.map((feed)=>
                        <div key={feed.id} className="feed-post-item" >
                        <div>
                            {/* <div className="feed-item-title">{feed.title['rendered']}</div> */}
                            <div dangerouslySetInnerHTML={{__html: feed.content['rendered']}}></div>
                             <div className="feed-datetime">{ new Date().toDateString('', feed.date) }</div>
                        </div>
                        </div> 
                            
                        )
                }
       
          </div>
          <Footer />
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