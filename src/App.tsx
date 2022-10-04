import CardPost from "./components/CardPost";
import { postsMock } from "./mockup/post";

function App() {
  const post = postsMock[0];
  return (
    <div className="px-10 py-5 App">
      <CardPost post={post} />
    </div>
  );
}

export default App;
