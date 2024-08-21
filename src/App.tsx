import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SenderForm from "./components/SenderForm";
import ReceiverForm from "./components/ReceiverForm";
import Profile from "./components/Profile";
import MyWallet from "./components/MyWallet";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>Sender</h2>
      <MyWallet />
      <Profile />
      <SenderForm />
      <hr />
      <h2>Recipient</h2>
      <ReceiverForm />
    </>
  );
}

export default App;
