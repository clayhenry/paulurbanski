import { Navigation } from './Navigation';
import React, { useRef, useEffect } from 'react'


const Post = ({post}) => {

    const heroImage = useRef(null);
    const heroImageContainer = useRef(null);
    const contentContainer = useRef(null);
    const postHeading = useRef(null);
    const navigation = useRef(null)

    let currentImageTransform = 0;
    let appliedHidenClassTransition = false;

    
    function reportWindowSize(heroImage) {
        
        if (heroImage.current){
    
            let margin = (heroImage.current.width - window.innerWidth);
            currentImageTransform = (margin/100)*3
            heroImage.current.style.transform = "translate( -" + (margin/100)*3 + "%, 0)";
        }
      }

      const scrollEffects= (()=>{

      
if (window.scrollY > 130 && !appliedHidenClassTransition && navigation.current  && !navigation.current.classList.contains("hide-me-now") ){
    navigation.current.classList.add("hide-me-now");
    navigation.current.classList.remove("show-me-now")
    appliedHidenClassTransition = true;
} 

if (window.scrollY < 130 && appliedHidenClassTransition && navigation.current && navigation.current.classList.contains("hide-me-now") ){
    appliedHidenClassTransition = false;
    navigation.current.classList.remove("hide-me-now");
    navigation.current.classList.add("show-me-now")
    
}


        if (heroImage.current){

            // let size = window.scrollY  <= 0 ? 1 : 1 - window.scrollY /2000;

            contentContainer.current.style.transform = "translateY(-" + (window.scrollY /20) + "%)";
            postHeading.current.style.transform = "translateY(-" + (window.scrollY /5) + "%)";
            // postHeading.current.style.transform = "scale(" + size + ")";
            heroImage.current.style.transform = "translate(-"+ currentImageTransform + "%, -" + (window.scrollY )/10 + "%)";
            // heroImage.current.style.transform = "skewX(-" + (window.scrollY )/80 + "deg)";
        }
      })

      useEffect(() => {
    
        reportWindowSize(heroImage);
        scrollEffects();
      }, []);
  
    
    window.addEventListener('resize', ()=>reportWindowSize(heroImage));

    window.addEventListener('scroll', ()=>scrollEffects(heroImageContainer))


        return (
            <>
            <div style={{backgroundColor: post.acf.background_color}} className="post-container"> 
                
                        <div className="post-feature-image2"  ref={heroImageContainer}>
                            <div className="hero-overlay"></div> 
                            <img className="hero-image" src={post._embedded["wp:featuredmedia"][0].media_details.sizes['1536x1536'].source_url} ref={heroImage}  />
                            </div>
                        <div ref={navigation} style={{color: post.acf.navigationtextcolor}}> <Navigation /> </div>
                        
                    <div className="post-heading" style={{color: post.acf.exerpttextcolor}} ref={postHeading} >
                        <div className="post-title"> {post.title['rendered']}</div>
                        <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt['rendered']}}></div>
                    </div>
            
              <div className="post-body" style={{backgroundColor: post.acf.background_color}} ref={contentContainer}>
                  
                  <span style={{color: post.acf.bodytextcolor}} dangerouslySetInnerHTML={{__html: post.content['rendered']}}></span> 
                
            </div>
            <br /><br />
            </div>
            </>
      
        )
    }
   

export default Post
