import { Navigation } from './Navigation';
import { Footer } from './Footer';
import React, { useRef, useEffect, useState } from 'react'
import {useParams } from "react-router-dom";
import { Link} from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Post = ({posts}) => {

    const { postId } = useParams();
    const [currentPost, setCurrentPost] = useState();
    
    const heroImage = useRef(null);
    const heroImageContainer = useRef(null);
    const contentContainer = useRef(null);
    const postHeading = useRef(null);
    const navigation = useRef(null);
    const transition = useRef(null);


    const onRef = (node) => { if (node) heroImage.current = node; reportWindowSize();}
    

    let nextPost = [];


    useEffect(() => {
        // reportWindowSize();
        scrollEffects();
      }, []);

    useEffect(() => {
          if (posts.length > 0){
            setCurrentPost(posts.filter((p)=> p.slug == postId)[0]);
          }
      },[postId]);

    let figures = [];
    let paragraphs = [];
    let currentImageTransform = 0
    let appliedHidenClassTransition = false;


    
const reportWindowSize = () => {

        if (heroImage.current){
                console.log("image");
            let margin = (heroImage.current.width - window.innerWidth);
            currentImageTransform = (margin/100)*3
            heroImage.current.style.transform = "translate( -" + (margin/100)*3 + "%, 0)";
        }

      }
const getNextPost =()=>{
        let index = posts.findIndex((i) => i.id == currentPost.id );
    
        if (posts[index + 1]){
            nextPost = posts[index + 1]
        } else {
            nextPost = posts[0]
        }
}

const getFigures = ()=>{

    if (currentPost){
           setTimeout(() => {
            figures = document.querySelectorAll("figure img"); 
            paragraphs = [...document.querySelectorAll(".post-body p")]; 
           }); 
     }
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

                        let opacity = 1- (window.scrollY/200);

                        if (opacity <= 1 && postHeading.current){
                            postHeading.current.style.opacity = opacity;
                        }

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

                    if (postHeading.current){
                        postHeading.current.style.transform = "translateY(" + (window.scrollY /2 ) + "%)";
                    }
                         
                        heroImage.current.style.transform = "translate(-"+ currentImageTransform + "%, " + (window.scrollY )/30 + "%)";

                        if (window.scrollY > 700 && window.scrollY > 900 && postHeading.current){
                            postHeading.current.style.transform = "translateY(0%)"; 
                        }

                        [...figures].map((f)=>{
                                let offset = 80
                                if (window.scrollY  >= (f.offsetTop - offset) && window.scrollY  <= (f.offsetTop + offset)){
                            
                            setTimeout(()=>{ f.classList.add("show-me-now-move") }, 300)
                            }
                        })
                    }
                })


    
if (currentPost){

    const divider = {
        borderTop: "1px solid" + currentPost.acf.bodytextcolor
    }

    const box = { borderBottom: "1px solid" + currentPost.acf.bodytextcolor}

    getFigures();
    getNextPost();  

        // window.addEventListener('resize', ()=>reportWindowSize(heroImage));
    window.addEventListener('scroll', ()=>scrollEffects(heroImageContainer));

        return (
            <>
            <HelmetProvider >
            <Helmet>
                <meta charSet="utf-8" />
                <title>{currentPost.title['rendered']} by Paul Urbanski </title>
            
            </Helmet>

            <div className="transition" ref={transition} style={{backgroundColor: currentPost.acf.backgroundcolor}} />
            <div style={{backgroundColor: currentPost.acf.backgroundcolor}} className="post-container"> 
                {console.log(currentPost._embedded["wp:featuredmedia"][0].media_details.sizes)}
                        <div className="post-feature-image2"  ref={heroImageContainer}>
                            <div className="hero-overlay"></div>
                            <img className="hero-image hero-transition" 
                            src={currentPost._embedded["wp:featuredmedia"][0].media_details.sizes['1536x1536'].source_url} 
                            ref={onRef}  />
                            </div>
                        <div ref={navigation} style={{color: currentPost.acf.navigationtextcolor}}> <Navigation /> </div>
                        
                    <div className="post-heading heading-transition" style={{color: currentPost.acf.exerpttextcolor}} ref={postHeading} >
                        <div className="post-title" dangerouslySetInnerHTML={{__html: currentPost.title['rendered']}} ></div>
                        <div className="post-excerpt" dangerouslySetInnerHTML={{__html: currentPost.excerpt['rendered']}}></div>
                        <div className="post-category">
                        <div style={box} className="divider-category"></div>    
                            From {currentPost.acf.category}
                            <div style={box} className="divider-category"></div>    
                        </div>

                    </div>
        
              <div className="post-body" style={{backgroundColor: currentPost.acf.backgroundcolor,color: currentPost.acf.bodytextcolor} } ref={contentContainer}>
                  <span dangerouslySetInnerHTML={{__html: currentPost.content['rendered']}}></span> 
                  <div className="next-project" > 
                  
                    <div className="next-link">
                        <div className="divider" style={divider} ></div>
                            <Link to={"/stories/" + nextPost.slug} style={{color: currentPost.acf.navigationtextcolor}}> Thanks for viewing, see next &rarr;</Link>
                        <div className="divider" style={divider} ></div>
                    </div>
                     <Footer />
                    </div>
            </div>
            </div>
            </HelmetProvider>
            </>
        )
    }
    return ([])
}
export default Post