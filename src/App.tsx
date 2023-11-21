import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { createPost, getPostById, getPosts } from "./api";
import { createUser, login } from "./api/auth";
import { FirebaseError } from "@firebase/util";

function App() {
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    getPosts().then((res) => console.log(res));
    getPostById("B7fbrdCmmOQZjUi38Xky").then((res) => console.log(res));
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      setEmail("");

      const userLogged = await login(email, password);
      if (userLogged?.email) {
        setUser(userLogged?.email);
      }
    } catch (error) {
      console.log("error");
      setError((error as FirebaseError).message);
    }
  };
  const handleRegister = async () => {
    try {
      setEmail("");
      const user = await createUser(email, password);
      if (user?.email) {
        login(email, password);
      }
    } catch (error) {
      setError((error as FirebaseError).message);
    }
  };
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.name === "email") setEmail(ev.target.value);
    else setPassword(ev.target.value);
  };
  return (
    <>
      {error}
      <input onChange={handleChange} type="email" name="email" value={email} />
      <input
        onChange={handleChange}
        type="password"
        name="password"
        value={password}
      />
      <button type="button" onClick={handleLogin}>
        login
      </button>
      <button type="button" onClick={handleRegister}>
        signup
      </button>
      <h1>{user}</h1>
      <form onSubmit={createPost}>
        <input type="text" name="content" />
        <input type="file" name="img" />
        <button>ok</button>
      </form>
    </>
  );
}

export default App;
