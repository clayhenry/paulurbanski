import {useState, useEffect} from 'react'
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
   
      setData(data);
    
      setLoading(false);
      // getCurrentPost(data);
 
    },
    (error) => {
      console.log(error);

    }
  );
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
  return <h1>Loading data... </h1>
} else {


  return (
    <div className="App">

      <BrowserRouter >
     <Routes>
          <Route  path="/" element={<Home posts={posts} />} />
            <Route path="/post/:postId" element={<Post posts={posts} /> } />
        
        </Routes>
  </BrowserRouter>
    </div>

    
  );
}
}

export default App;
