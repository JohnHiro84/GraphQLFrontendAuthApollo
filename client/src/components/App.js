import React from "react";
import { Route } from "react-router-dom";
import PostIndex from "./posts/PostIndex";
import CreatePost from "./posts/CreatePost";
import Register from "./Register";


const App = () => (
  <div>
    <Route path="/" component={Register} />;
    <Route path="/" component={PostIndex} />
    <Route path="/new" component={CreatePost} />


  </div>
);

export default App;
