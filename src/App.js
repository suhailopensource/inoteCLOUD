import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { redirect } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              {/* <Route
                exact path="/login"
                loader={async () => {
                  if (localStorage.getItem('token') === undefined) {
                    // if you know you can't render the route, you can
                    // throw a redirect to stop executing code here,
                    // sending the user to a new route
                    throw redirect("/");
                  }

                  // otherwise continue
                  // const stats = await fake.getDashboardStats();
                  // return { user, stats };

                }}
              /> */}
              <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/contact" element={<Contact />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
