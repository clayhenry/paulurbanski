import { Navigation } from './Navigation';
import React, { useRef, useEffect } from 'react'


const Post = ({post}) => {

    const heroImage = useRef(null);
    const heroImageContainer = useRef(null);
    const contentContainer = useRef(null);
    const postHeading = useRef(null);
    const navigation = useRef(null);
    let figures = [];


    let currentImageTransform = 0;
    let appliedHidenClassTransition = false;

    
    function reportWindowSize(heroImage) {
        
        if (heroImage.current){
    
            let margin = (heroImage.current.width - window.innerWidth);
            currentImageTransform = (margin/100)*3
            heroImage.current.style.transform = "translate( -" + (margin/100)*3 + "%, 0)";
        }
      }

const getFigures = ()=>{
        figures = document.querySelectorAll("figure img"); 
    }     
 const scrollEffects= (()=>{
      
if (window.scrollY > 650 && !appliedHidenClassTransition && navigation.current  && !navigation.current.classList.contains("hide-me-now") ){
    navigation.current.classList.add("hide-me-now");
    navigation.current.classList.remove("show-me-now");
    appliedHidenClassTransition = true;
} 

if (window.scrollY < 650 && appliedHidenClassTransition && navigation.current && navigation.current.classList.contains("hide-me-now") ){
    appliedHidenClassTransition = false;
    navigation.current.classList.remove("hide-me-now");
    navigation.current.classList.add("show-me-now")  
}
        if (heroImage.current){

            // let opacity = 1- (window.scrollY/200);  
           
            // if (opacity <= 1){
            //     postHeading.current.style.opacity = opacity;
            // }

            if (window.scrollY > 350){
                heroImage.current.classList.add("hide-me-now");
                heroImage.current.classList.remove("show-me-now");
            } 
            if (window.scrollY < 350){
                heroImage.current.classList.add("show-me-now");
                heroImage.current.classList.remove("hide-me-now");
            }

            // contentContainer.current.style.transform = "translateY(-" + (window.scrollY /40) + "%)";
            postHeading.current.style.transform = "translateY(" + (window.scrollY /2 ) + "%)";         
            heroImage.current.style.transform = "translate(-"+ currentImageTransform + "%, " + (window.scrollY )/9 + "%)";

            if (window.scrollY > 700 && window.scrollY > 800){
                postHeading.current.style.transform = "translateY(0%)";     
            }
  
            [...figures].map((f)=>{

                    let offset = 80
                    if (window.scrollY  >= (f.offsetTop - offset) && window.scrollY  <= (f.offsetTop + offset)){
                
                setTimeout(()=>{ f.classList.add("show-me-now") }, 500)
                }
            })
    
        }
      })

      useEffect(() => {
    
        getFigures();
        reportWindowSize(heroImage);
        scrollEffects();
      }, []);
    
    window.addEventListener('resize', ()=>reportWindowSize(heroImage));
    window.addEventListener('scroll', ()=>scrollEffects(heroImageContainer));

        return (
            <>
            <div style={{backgroundColor: post.acf.backgroundcolor}} className="post-container"> 
                
                        <div className="post-feature-image2"  ref={heroImageContainer}>
                            <div className="hero-overlay"></div> 
                            <img className="hero-image" src={post._embedded["wp:featuredmedia"][0].media_details.sizes['1536x1536'].source_url} ref={heroImage}  />
                            </div>
                        <div ref={navigation} style={{color: post.acf.navigationtextcolor}}> <Navigation /> </div>
                        
                    <div className="post-heading" style={{color: post.acf.exerpttextcolor}} ref={postHeading} >
                        <div className="post-title"> {post.title['rendered']}</div>
                        <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt['rendered']}}></div>
                    </div>
            <div className="body-post-stub"></div>
              <div className="post-body" style={{backgroundColor: post.acf.backgroundcolor}} ref={contentContainer}>
                  
                  <span style={{color: post.acf.bodytextcolor}} dangerouslySetInnerHTML={{__html: post.content['rendered']}}></span> 
                
            </div>
            
            </div>
           
            </>
      
        )
    }
   

export default Post
