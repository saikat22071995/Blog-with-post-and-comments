const express=require('express')
const bodyParser=require('body-parser')
const { randomBytes }=require('crypto')
const app=express()
const cors=require('cors')
const axios=require('axios')
app.use(bodyParser.json())
app.use(cors())
const commentsBypostId={}


app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsBypostId[req.params.id] || [])
})

app.post('/posts/:id/comments',async (req,res)=>{
    const commentId=randomBytes(4).toString('hex')
    const {content}=req.body
    const comments=commentsBypostId[req.params.id] || []
    comments.push({id:commentId,content,status:'pending'})
    commentsBypostId[req.params.id]=comments

    await axios.post('http://localhost:4005/events',{
        type:'commentCreated',
        data:{
            id:commentId,
            content,
            postId:req.params.id,
            status:'pending'
        }
    });
    res.status('201').send(comments)
})

app.post('/events', async (req,res)=>{
    console.log('Recieving Event',req.body.type);
    const {type,data}=req.body;
    if(type==='commentModerated'){
        const {postId,id,status,content}=data;
        const comments=commentsBypostId[postId];
        const comment=comments.find(comment=>{
            return comment.id===id
        });
        comment.status=status;

        await axios.post('http://localhost:4005/events',{
            type:'commentUpdated',
            data:{
                id,
                status,
                postId,
                content
            }
        });
    }
    res.send({});
})

app.listen(4001,()=>{
    console.log('Listenting on port 4001')
})