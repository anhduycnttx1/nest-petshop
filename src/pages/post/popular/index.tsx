import PostsContainer from './../../../containers/posts'

const PopularPages = () => {
  const title = 'Popular'
  const query = {
    order: 'popularity',
    direction: 'desc',
  }
  return <PostsContainer title={title} query={query} />
}

export default PopularPages
