import { createContext, useState, useEffect } from "react";
import {useHistory } from 'react-router-dom'
import {format} from 'date-fns'
import api from '../api/posts'
import useWindowSize from '../hooks/useWindowSize'
const DataContext = createContext({})

export const DataProvider = ({ children }) => {

        
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

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLocaleLowerCase()).includes(search.toLocaleLowerCase())||
      ((post.title).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
      )

      setSearchResults(filteredResults.reverse())
  }, [posts,search])

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
        <DataContext.Provider value={{
           searchResults,setSearchResults, width ,search, setSearch,setEditBody,  editTitle, setEditTitle,handleSubmit, postTitle, setPostTitle,postBody,setPostBody,posts, handleDelete,handleEdit
        }}>

            {children}
            </DataContext.Provider>
    )
}

export default DataContext