import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

const Home = ({posts}) => {

    
    return (
        <div>
           Main Page 

         
<ul>
{posts.map((post)=>

  <li key={post.id}>
      <Link to={"/post/" + post.title['rendered']} key={post.title['rendered']}>{post.title['rendered']}</Link>
  </li>
  // <li  >{post.title['rendered']}</li>
)
}
</ul>


        </div>
    )
}

export default Home;


