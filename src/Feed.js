import Post from './Post'

const Feed = ({ posts }) => {
    return (
        <>
            {posts.map(post => 
                <Post key={post.id} post={post} />)}
        </>
    )
}
//this is a comment
export default Feed
