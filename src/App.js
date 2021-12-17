import {useState, useEffect} from 'react'
import './App.css';
import './External.css'
import Post from './components/Post';
import Home from './components/Home';
import Feed from './components/Feed';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Books from "./components/Books";
import Book from "./components/Book";
import About from "./components/About";


function App() {

let postUrl = "http://paulurbanski.local/wp-json/wp/v2/posts?_embed";
let feedUrl = "http://paulurbanski.local/wp-json/wp/v2/feed?per_page=10";
let booksUrl = "http://paulurbanski.local/wp-json/wp/v2/books?_embed"

const [posts, setData] = useState([]);
const [feeds, setFeed] = useState([]);
const [books, setBooks] = useState([]);
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
    fetch(booksUrl).then((res)=>res.json()).then((data)=>setBooks(data))
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
         <Route path="/books" element={<Books books={books} /> } />
         <Route path="/book/:bookId" element={<Book book={books} /> } />
          <Route path="/dispatch" element={<Feed feeds={feeds} /> } />
         <Route path="/about" element={<About /> } />

        </Routes>
  </BrowserRouter>
    </div>

    </HelmetProvider>
  );

}

}

export default App;
