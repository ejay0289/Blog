import EditPost from './EditPost'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from './api/posts'
import { DataProvider } from './context/DataContext'


function App() {


  const [search] = useState('')
  const [posts, setPosts] = useState([])

  const [searchResults, setSearchResults] = useState([])

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

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLocaleLowerCase()).includes(search.toLocaleLowerCase())||
      ((post.title).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
      )

      setSearchResults(filteredResults.reverse())
  }, [posts,search])



  return (
    <div className="App">
      <DataProvider>
      <Header title='React JS Blog'/>
      <Nav />

      <Switch>
        <Route exact path='/'>
           <Home posts={searchResults} />
        </Route>
         <Route exact path='/post'>
            <NewPost />
         </Route> 
         <Route path='/edit/:id'>
            <EditPost />
         </Route> 
         
        <Route path='/post/:id'>
          <PostPage />
        </Route>

        <Route path='/about' component={About} />
        <Route path='*' component={Missing} />

      </Switch>
     
      <Footer />
      </DataProvider>

    </div>
  );
}

export default App;