import { useContext } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import api from './api/posts'
import format from 'date-fns/format'
import DataContext from './context/DataContext'

const NewPost = () => {

    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) =>{
        e.preventDefault( )
        const id = posts.length? posts[posts.length - 1].id + 1 : 1
        const datetime= format(new Date(), 'MMMM dd, yyyy pp')
        const newPost = {id, title: postTitle, datetime, body:postBody}
        try{
  
          const response = await api.post('/posts', newPost)
        const allPosts = [...posts, response.data]
        setPosts(allPosts)
      setPostTitle('')
    setPostBody('')
    history.push('/')
        }catch (err){
          console.log(`Error: ${err.message}`);
        }
     }

    const {posts, setPosts} = useContext(DataContext)
    return (
        <main className='NewPost'>
            <h2>NewPost</h2>
            <form onSubmit={handleSubmit} action="" className="newPostForm">
                <label htmlFor="postTitle">Title:</label>
                <input
                    id='postTitle'
                    type='text'
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    />

                    <label htmlFor="postBody">Post:</label>
                    <textarea name="" value={postBody} onChange={(e) => setPostBody(e.target.value)} required id="postBody"></textarea>
                    <button type='submit'>Submit</button>
            </form>
    
        </main>
    )
}

export default NewPost
