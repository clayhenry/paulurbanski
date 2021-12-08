import {useState, useEffect} from 'react'
import './App.css';
import './External.css'
import Post from './components/Post';
import Home from './components/Home';
import Feed from './components/Feed';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route} from "react-router-dom";


function App() {

let postUrl = "http://paulurbanski.local/wp-json/wp/v2/posts?_embed";
let feedUrl = "http://paulurbanski.local/wp-json/wp/v2/feed?per_page=10";

const [posts, setData] = useState([]);
const [feeds, setFeed] = useState([]);
const [isLoading, setLoading] = useState(true);


useEffect(() => {
  getPosts();
}, []);

const getPosts = ()=>{
  fetch(postUrl)
  .then((res) => res.json())
  .then(
    (data) => {
      setData(data);
      setLoading(false);
    },
    (error) => {
      console.log(error);

    }
  );

  fetch(feedUrl).then((res)=>res.json()).then((data)=>setFeed(data))
}

// const getCurrentPost =() =>{
  
//   setData(prevValue => {
//     console.log(prevValue);
//   });
// }


// const doSomething = (id)=>{ 
//   setData(data.filter((d)=>d.id != id));
// }

if (isLoading) {
  return (
    <>


            <h1>Loading data... </h1>
    </>
  )
 
} else {


  return (
    <HelmetProvider >
    <div className="App">
   
           <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://paulurbanski.com" />
            </Helmet>


      <BrowserRouter >
     <Routes>
          <Route  path="/" element={<Home posts={posts} />} />
          <Route path="/post/:postId" element={<Post posts={posts} /> } />
          <Route path="/feed" element={<Feed feeds={feeds} /> } />
        
        </Routes>
  </BrowserRouter>
    </div>

    </HelmetProvider>
  );

}

}

export default App;
