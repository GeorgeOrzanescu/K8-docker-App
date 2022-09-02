import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import OtherPage from "./OtherPage";
import MainComponent from "./MainComponent";

function App() {
  return (
    <Router>
      <Fragment>
        <header className="header">
          <div>This is a multicontainer application</div>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other page</Link>
        </header>
        <div className="main">
          <Routes>
            <Route exact path="/" element={<MainComponent />} />
            <Route path="/otherpage" element={<OtherPage />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
