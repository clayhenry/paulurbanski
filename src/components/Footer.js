import {useNavigate} from 'react-router-dom'

export const Footer = () => {


    const navigate = useNavigate();
    const goTo = (destination) => navigate(destination);

    return (
        <div className="footer-navigation">
            <div className="clickable" onClick={()=>goTo('/about')}>About</div>
            <div className="clickable" onClick={()=>goTo('/feed')} >Feed</div>
            <div className="clickable" onClick={()=>goTo('/books')}>Books</div>
        </div>
    )
}
 