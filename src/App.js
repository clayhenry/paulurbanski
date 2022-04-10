import {useState, useEffect} from 'react'
import './App.css';
import './External.css'
import Post from './components/Post';
import Home from './components/Home';
import Feed from './components/Feed';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Books from "./components/Books";
import Book from "./components/Book";
import About from "./components/About";
import Posts from "./components/Posts";
import Drafts from './components/Drafts';


function App() {

    let postUrl = "https://wp.paulurbanski.com/wp-json/wp/v2/posts?_embed";
    let feedUrl = "https://wp.paulurbanski.com/wp-json/wp/v2/feed?_embed";
    let booksUrl = "https://wp.paulurbanski.com//wp-json/wp/v2/books?_embed"

    const [posts, setData] = useState([]);
    const [feeds, setFeed] = useState([]);
    const [books, setBooks] = useState([]);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
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

        fetch(feedUrl).then((res) => res.json()).then((data) => setFeed(data))
        fetch(booksUrl).then((res) => res.json()).then((data) => setBooks(data))
    }

    if (isLoading) {
        return (
            <>
                <div className={"loading-message"}> Hold on</div>
            </>
        )

    } else {
        return (
            <HelmetProvider>
                <div className="App">

                    <Helmet>
                        <meta charSet="utf-8"/>
                        <title>Paul Urbanski - Photography and stories from Western Canada</title>
                        <link rel="canonical" href="http://paulurbanski.com"/>
                    </Helmet>


                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home posts={posts} feeds={feeds} books={books}/>}/>
                            <Route path="/stories/:postId" element={<Post posts={posts}/>}/>
                            <Route path="/books" element={<Books books={books}/>}/>
                            <Route path="/book/:bookId" element={<Book book={books}/>}/>
                            <Route path="/dispatch" element={<Feed feeds={feeds}/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/stories" element={<Posts posts={posts}/>}/>
                            <Route path="/drafts" element={<Drafts posts={posts}/>}/>


                        </Routes>
                    </BrowserRouter>
                </div>

            </HelmetProvider>
        );

    }

}

export default App;
