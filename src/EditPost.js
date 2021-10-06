import { useEffect } from "react"
import { useParams, Link, useHistory} from "react-router-dom"
import format from "date-fns/format"
import api from './api/posts'
import { useState } from "react"
import { useContext } from 'react'
import DataContext from './context/DataContext'

const EditPost = () => {
    const history = useHistory()
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
const { posts, setPosts} = useContext(DataContext)
    const {id} = useParams()
    const post = posts.find(post => post.id.toString() === id)
    const handleEdit = async (id) =>{

        const datetime= format(new Date(), 'MMMM dd, yyyy pp')
        const updatedPost = {id, title: editTitle, datetime, body:editBody}
    
        try{
          const response = await api.put(`/posts/${id}`, updatedPost)
          setPosts(posts.map(post=> post.id === id ? {...response.data}:post))
          setEditTitle('')
          setEditBody('')
          history.push('/')
        }catch (err){
    
        }
      }
      
    useEffect(() => {
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post, setEditTitle, setEditBody])
    return (
        <main className='NewPost'>
            
            {editTitle &&
            <>
            <h2>Edit Post</h2>
            <form onSubmit={(e) => e.preventDefault()} action="" className="newPostForm">
                <label htmlFor="postTitle">Title:</label>
                <input
                    id='postTitle'
                    type='text'
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <label htmlFor="postBody">Post:</label>
                    <textarea name="" value={editBody} onChange={(e) => setEditBody(e.target.value)} required id="postBody"></textarea>
                    <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
            </form>
            </>
            }

            {
                !editTitle &&
                <>
                    <h2>not found</h2>
                    <Link to='/'>Go home</Link>
                </>
            }
            
        </main>
    )
}

export default EditPost
