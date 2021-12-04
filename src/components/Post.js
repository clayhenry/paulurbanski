import { Navigation } from './Navigation';
import React, { useRef, useEffect, useState } from 'react'
import {useParams } from "react-router-dom";


const Post = ({posts}) => {

    const { postId } = useParams();
    const [currentPost, setCurrentPost] = useState();
    
    const heroImage = useRef(null);
    const heroImageContainer = useRef(null);
    const contentContainer = useRef(null);
    const postHeading = useRef(null);
    const navigation = useRef(null);

    useEffect(() => {
        reportWindowSize(heroImage);
        scrollEffects();
      }, []);

      useEffect(() => {
          if (posts.length > 0){
            setCurrentPost(posts.filter((p)=> p.title['rendered'] == postId)[0]);
          }
      },[currentPost])

    let figures = [];
    let paragraphs = [];
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
        paragraphs = [...document.querySelectorAll(".post-body p")]; 
    }     

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
                    if (heroImage.current){

                        // let opacity = 1- (window.scrollY/200);  
                    
                        // if (opacity <= 1){
                        //     postHeading.current.style.opacity = opacity;
                        // }

                        if (window.scrollY > 400 && heroImage.current.classList.contains("show-me-now")){
                            heroImage.current.classList.add("hide-me-now");
                            heroImage.current.classList.remove("show-me-now");
                        } 

                        if (window.scrollY < 400 && heroImage.current.classList.contains("hide-me-now")){
                            heroImage.current.classList.add("show-me-now");
                            heroImage.current.classList.remove("hide-me-now");
                        }

                        if (paragraphs[0]){
                        if (window.scrollY > 300 ){

                            paragraphs[0].classList.remove("hide-me-now-move");
                            paragraphs[0].classList.add("show-me-now-move");
                        }
                        if (window.scrollY < 300 && paragraphs[0].classList.contains("show-me-now-move") ){

                            paragraphs[0].classList.add("hide-me-now-move");
                            paragraphs[0].classList.remove("show-me-now-move");
                        }
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
    
if (currentPost){
    
    getFigures();
    window.addEventListener('resize', ()=>reportWindowSize(heroImage));
    window.addEventListener('scroll', ()=>scrollEffects(heroImageContainer));

        return (
            <>
            <div style={{backgroundColor: currentPost.acf.backgroundcolor}} className="post-container"> 
                
                        <div className="post-feature-image2"  ref={heroImageContainer}>
                            <div className="hero-overlay"></div> 
                            <img className="hero-image" src={currentPost._embedded["wp:featuredmedia"][0].media_details.sizes['1536x1536'].source_url} ref={heroImage}  />
                            </div>
                        <div ref={navigation} style={{color: currentPost.acf.navigationtextcolor}}> <Navigation /> </div>
                        
                    <div className="post-heading" style={{color: currentPost.acf.exerpttextcolor}} ref={postHeading} >
                        <div className="post-title"> {currentPost.title['rendered']}</div>
                        <div className="post-excerpt" dangerouslySetInnerHTML={{__html: currentPost.excerpt['rendered']}}></div>
                    </div>
            <div className="body-post-stub"></div>
              <div className="post-body" style={{backgroundColor: currentPost.acf.backgroundcolor}} ref={contentContainer}>
                  <span style={{color: currentPost.acf.bodytextcolor}} dangerouslySetInnerHTML={{__html: currentPost.content['rendered']}}></span> 
            </div>
            </div>
            </>
        )
    }
    return ([])
}


   

export default Post
