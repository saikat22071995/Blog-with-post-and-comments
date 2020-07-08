import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CommentCreate from '../comments/commentCreate'
import CommentList from '../comments/commentLists'

export default ()=>{
    const [posts,setPosts]=useState({})
    const fetchPosts=async ()=>{
        const res=await axios.get('http://localhost:4002/posts')
        setPosts(res.data)
    };
    useEffect(()=>{
        fetchPosts()
    },[]);
    // console.log('posts',posts);
    const renderedPosts=Object.values(posts).map(post=>{
        return(
            <div className="card" 
            key={post.id}
            style={{width:'30%',marginBottom:'20px'}}
            >
                 <div className="card-body">
                     <b>{post.title}</b>
                     <CommentList comments={post.comments} />
                     <CommentCreate postId={post.id}/>
                 </div>
            </div>
        )
    });
    return(
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    )
}