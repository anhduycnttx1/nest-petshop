import PostsContainer from './../../../containers/posts'

const BestDiscussonsPages = () => {
  const title = 'Popular'
  const query = {
    order: 'comment',
    direction: 'desc',
  }
  return <PostsContainer title={title} query={query} />
}

export default BestDiscussonsPages
