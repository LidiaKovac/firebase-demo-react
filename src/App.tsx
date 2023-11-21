import { useEffect } from "react";
import "./App.css";
import { createPost, getPostById, getPosts } from "./api";

function App() {
  //  const [data, setData] = useState([])
  useEffect(() => {
    getPosts().then((res) => console.log(res));
    getPostById("B7fbrdCmmOQZjUi38Xky").then((res) => console.log(res));
    // createPost({img: "http://placehold.it/1000x2200", content: "Hello Wrld 2!"})
    // editPostById("B7fbrdCmmOQZjUi38Xky", "edit")
  }, []);

  return (
    <>
       <form onSubmit={createPost}>
        <input type="text" name="content" />
        <input type="file" name="img"/>
        <button>ok</button>
       </form>
    </>
  );
}

export default App;
