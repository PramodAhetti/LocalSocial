import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login'
import Home from "./components/home";
import Nearpost from "./components/nearpost";

function App() {
  return (
    <div className="App">
      <BrowserRouter className="App">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nearposts" element={<Nearpost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
