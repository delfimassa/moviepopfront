import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Common/Footer";
import MovieDetail from "./Components/MovieDetail/MovieDetail";
import Landing from './Components/Landing';

function App() {
  return (
    <div className="App">
       <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/moviedetail" element={<MovieDetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
