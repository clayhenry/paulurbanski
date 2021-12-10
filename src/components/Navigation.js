import {useNavigate} from 'react-router-dom'

export const Navigation = () => {

const navigate = useNavigate();
const goTo = (destination) => navigate(destination);


    return (
        <div className="top-navigation">
            <div className="clickable" onClick={()=>goTo('/about')}>About</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
         
            <div className="page-title clickable" onClick={()=>goTo('/')}>PAUL URBANSKI</div>
            <div className="clickable" onClick={()=>goTo('/feed')} >Feed</div>
            <div className="clickable" onClick={()=>goTo('/books')}>Books</div>
        </div>
    )
}
