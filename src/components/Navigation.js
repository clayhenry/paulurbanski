import {useNavigate} from 'react-router-dom'

export const Navigation = () => {

    const navigate = useNavigate();
    const goTo = (destination) => navigate(destination);


    return (
        <>
            <div className="top-navigation">
                <div className="clickable" onClick={() => goTo('/about')}>About</div>
                <div className="clickable" onClick={() => goTo('/posts')}>Posts</div>
                <div className="page-title clickable" onClick={() => goTo('/')}>PAUL URBANSKI</div>
                <div className="clickable" onClick={() => goTo('/dispatch')}>Dispatch</div>
                <div className="clickable" onClick={() => goTo('/books')}>Books</div>
                <div className="title-mobile clickable" onClick={() => goTo('/')}>PAUL URBANSKI</div>
            </div>


        </>
    )
}
