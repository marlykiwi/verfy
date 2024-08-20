import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MyForm from "./components/Form";
import Profile from "./components/Profile";
import MyWallet from "./components/MyWallet";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MyWallet />
      <Profile />
      <MyForm />
    </>
  );
}

export default App;
