import PostsContainer from './../../../containers/posts'

const BestDiscussionsPages = () => {
  const title = 'Popular'
  const query = {
    order: 'comment',
    direction: 'desc',
  }
  return <PostsContainer title={title} query={query} />
}

export default BestDiscussionsPages
