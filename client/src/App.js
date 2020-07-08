import React from 'react';
// import logo from './logo.svg';
import './App.css';
import PostCreate from '../src/components/posts/postCreate'
import PostsList from '../src/components/posts/postList'

function App() {
  return (
    <div className="container">
    
     <h1>Create Post</h1>
      <PostCreate />
      <h1>Posts</h1>
      <PostsList />
    </div>
  
  );
}

export default App;
