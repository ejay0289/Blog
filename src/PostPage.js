import {useParams,useHistory, Link} from 'react-router-dom'
import { useContext } from 'react'
import api from './api/posts'
import DataContext from './context/DataContext'

const PostPage = () => {
    const {setPosts, posts} = useContext(DataContext)
    const history = useHistory()

    const handleDelete = async (id) =>{
        try{
          await api.delete(`/posts/${id}`)
        const postsLists =posts.filter(post => post.id !== id)
        setPosts(postsLists)
        history.push('/')
        }catch (err){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
      }
      }
    
    

    const {id } = useParams()
    const post = posts.find(post => post.id.toString() === id)
    return (
        <main className='PostPage'>
           <article className="post">
            {post && 
                <>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postDate">{post.body}</p>
                    <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                    <button className='deleteButton' onClick={() => handleDelete(post.id)}>
                        Delete Post
                    </button>
                </>   
               
               }
            {!post &&
                <>
                <h2>Post not found</h2>
                <p style={{textAlign: 'center'}}>The requested post does not exist</p>
                <Link to='/'>Visit Homepage</Link>
                </>
            }

           </article>
        </main>
    )
}

export default PostPage
