import logo from './logo.svg';
import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import './External.css'
import Post from './components/Post';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";


function App() {
let postUrl = "http://paulurbanski.local/wp-json/wp/v2/posts?_embed";

const [posts, setData] = useState([]);
const [isLoading, setLoading] = useState(true);

useEffect(() => {
  getPosts();
}, []);

const getPosts = ()=>{
  fetch(postUrl)
  .then((res) => res.json())
  .then(
    (data) => {
      setData(data)
      setLoading(false)
 
    },
    (error) => {
      console.log(error);

    }
  );
}



// const doSomething = (id)=>{ 
//   setData(data.filter((d)=>d.id != id));
// }

if (isLoading) {
  return <h1>Loading data... </h1>
} else {


  return (
    <div className="App">

      {/* <Image color="blue" onDosomething={doSomething} data={data} /> */}
      <BrowserRouter>
      
      {/* <Post post={posts[0]} /> */}

      <Routes>
        
          <Route  path="/" element={<Home posts={posts} />} />
    
          <Route path="post" element={<Post post={posts[0]} /> }>
             <Route path=":postId" element={<Post post={posts[0]} /> } />
           </Route>

        </Routes>

  </BrowserRouter>
    </div>

    
  );
}
}

export default App;
