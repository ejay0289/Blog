import { useContext } from 'react'
import DataContext from './context/DataContext'
import Feed from './Feed'

const Home = () => {
    const { searchResults } = useContext(DataContext)
    return (
        <main className='Home'>
           {searchResults.length ? (
              <Feed posts={searchResults} /> 
           ) : (
            <p style={{ marginTop: '2rem'}}>
                No posts to display
            </p>   
           )}
        </main>
    )
}

export default Home
