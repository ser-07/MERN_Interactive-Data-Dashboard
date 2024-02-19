import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
