import EditPost from './EditPost'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {format} from 'date-fns'
import api from './api/posts'
import useWindowSize from './hooks/useWindowSize'



function App() {


  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])

  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const history = useHistory()
  const {width} = useWindowSize()

  useEffect(() =>{
    const fetchPosts = async () =>{
      try{
          const response = await api.get('/posts')
          setPosts(response.data)
      }catch (err){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
      }
    }
    fetchPosts()
  },[])

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

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLocaleLowerCase()).includes(search.toLocaleLowerCase())||
      ((post.title).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
      )

      setSearchResults(filteredResults.reverse())
  }, [posts,search])

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


  return (
    <div className="App">

      <Header width={width} title='React JS Blog'/>
      <Nav search={search} setSearch={setSearch}/>

      <Switch>
        <Route exact path='/'>
           <Home posts={searchResults} />
        </Route>
         <Route exact path='/post'>
            <NewPost 
            postTitle={postTitle}
            handleSubmit={handleSubmit}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}

            />
         </Route> 
         <Route path='/edit/:id'>
            <EditPost 
            editTitle={editTitle}
            posts={posts}
            handleEdit={handleEdit}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody }

            />
         </Route> 
         
        <Route path='/post/:id'>
          <PostPage posts={posts} handleDelete={handleDelete}/>
        </Route>

        <Route path='/about' component={About} />
        <Route path='*' component={Missing} />

      </Switch>
     
      <Footer />

    </div>
  );
}

export default App;