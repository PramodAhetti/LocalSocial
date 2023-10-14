import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login'
import Home from "./components/home";
import Nearpost from "./components/nearpost";
import Newpost from './components/newpost'
import Nav from "./components/Nav";
function App() {
  return (
    <div className="App">
      <BrowserRouter className="App">
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/near" element={<Nearpost />} />
          <Route path="/new" element={<Newpost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
