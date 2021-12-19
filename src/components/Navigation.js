import {useNavigate} from 'react-router-dom'
import {useEffect} from "react";

export const Navigation = () => {

    const navigate = useNavigate();
    const goTo = (destination) => navigate(destination);

    useEffect(() => {
        scrollDocToTop();
    },[]);

    const scrollDocToTop = ()=>{
        setTimeout(()=>{
            window.scrollTop = 0;
            window.scrollTo(0,0);
            document.documentElement.scrollTop = 0;
        }, 0)
    }

    scrollDocToTop();

    return (
        <>
            <div className="top-navigation">
                <div className="clickable" onClick={() => goTo('/about')}>About</div>
                <div className="clickable" onClick={() => goTo('/stories')}>Stories</div>
                <div className="page-title clickable" onClick={() => goTo('/')}>PAUL URBANSKI</div>
                <div className="clickable" onClick={() => goTo('/dispatch')}>Dispatch</div>
                <div className="clickable" onClick={() => goTo('/books')}>Books</div>
                <div className="title-mobile clickable" onClick={() => goTo('/')}>PAUL URBANSKI</div>
            </div>


        </>
    )
}
