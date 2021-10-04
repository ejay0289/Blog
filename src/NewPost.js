const NewPost = ({
    handleSubmit, postTitle, setPostTitle,postBody,setPostBody
}) => {
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
