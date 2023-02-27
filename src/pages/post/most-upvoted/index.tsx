import PostsContainer from './../../../containers/posts'

const MostUpvotedPages = () => {
  const title = 'Popular'
  const query = {
    order: 'upvote',
    direction: 'desc',
  }
  return <PostsContainer title={title} query={query} />
}

export default MostUpvotedPages
