import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import { useContext } from 'react'
import DataContext from './context/DataContext'

const EditPost = () => {

const { posts, handleEdit, editBody,setEditBody, editTitle, setEditTitle} = useContext(DataContext)
    const {id} = useParams()
    const post = posts.find(post => post.id.toString() === id)

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
