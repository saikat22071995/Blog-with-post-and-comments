import React,{useState} from 'react'
import axios from 'axios'
export default ()=>{
    const [title,setTitle]=useState('')
    // console.log(title)
    const onSubmit= async (event)=>{
        event.preventDefault()
        await axios.post('http://localhost:4000/posts',{title});
        setTitle('')
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" 
                    value={title} 
                    onChange={e=>setTitle(e.target.value)}/>
                    <br />
                    <button className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    )
}