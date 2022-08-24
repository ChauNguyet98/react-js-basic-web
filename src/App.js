import logo from "./assets/images/logo.svg";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/nav/navbar";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import ListUser from "./pages/users/list-user";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/home" element={<Home />}>
              {/* <Route index element={<Home />} />
              <Route path="teams" element={<Teams />}>
                <Route path=":teamId" element={<Team />} />
                <Route path="new" element={<NewTeamForm />} />
                <Route index element={<LeagueStandings />} />
              </Route> */}
            </Route>
            <Route path="/list-user" element={<ListUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </header>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
