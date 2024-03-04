
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Main from "./pages";
import Details from "./pages/details";

import './App.css';

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/:page" element={<Main />} />
            <Route exact path="/" element={<Main />} />
            <Route path="/details/:currPage/:id" element={<Details />} />
        </Routes>
    </Router>
  );
}

export default App;
