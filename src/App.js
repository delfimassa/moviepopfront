import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import MovieDetail from "./Components/MovieDetail/MovieDetail";
import Landing from './Components/Landing';
import Login from "./auth/Login";
import Register from "./auth/Register";
import Navbar from "./Components/Common/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <div className="appMargin">
       <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path='/movies/:id' element={<MovieDetail/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
