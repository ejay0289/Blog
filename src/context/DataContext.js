import { createContext, useState, useEffect } from "react";
import api from '../api/posts'
const DataContext = createContext({})

export const DataProvider = ({ children }) => {
        
  const [search, setSearch] = useState('')
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
        <DataContext.Provider value={{
           searchResults,setSearchResults ,
           search, setSearch
           , setPosts,
           posts
        }}>

            {children}
            </DataContext.Provider>
    )
}

export default DataContext