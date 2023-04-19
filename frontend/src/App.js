import Navbar from "./components/navbar/navbar";
import Home from "./pages/Home/Home.js";

import { Route, Routes } from "react-router-dom";
import Student from "./pages/Student/Student";
import Mentor from "./pages/Mentor/Mentor";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/student" element={<Student />}></Route>
          <Route path="/mentor" element={<Mentor />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
