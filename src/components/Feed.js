import { Navigation } from './Navigation';
import { Helmet, HelmetProvider } from 'react-helmet-async';
const Feed = ({feeds}) => {

if (feeds){

    console.log(feeds);
    return (
        <>
        <HelmetProvider >
            <Helmet>
                <meta charSet="utf-8" />
                <title>Feed by Paul Urbanski</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        <div className="post-container"> 
        <div className="post-heading feed-heading heading-transition" >
                  <div className="post-title" >Feed</div>
                  <div  className="post-excerpt">
                  If you must stick to the latest react-router-dom v6.0.0, then replace useHistory with useNavigate. Else, downgrade your react-router-dom to v5.2.0 and your code works as it should.
                  </div>
              </div>
          <div> <Navigation /> </div>
          <div className="post-body" >
          <div className="feed-posts" >
          
                {
                        feeds.map((feed)=>
                        <div className="feed-post-item" >
                        <div key={feed.id}>
                            {/* <div className="feed-item-title">{feed.title['rendered']}</div> */}
                            <div dangerouslySetInnerHTML={{__html: feed.content['rendered']}}></div>
                             <div className="feed-datetime">{ new Date().toDateString('', feed.date) }</div>
                        </div>
                        </div> 
                            
                        )
                }
         
          </div>
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