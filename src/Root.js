import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import NotFound from "./components/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Reservation from "./pages/Reservation/Reservation";
import Trajets from "./pages/Route/Trajets";
import Detail from "./pages/Route/Detail";
import axios from "axios";
import ProtectRoute from "./components/ProtectedRoute";
import Profil from "./pages/Profil/Profil";
import Create from "./pages/Route/Create";

axios.defaults.withCredentials = true;

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/reservation/:id"
          element={
            <ProtectRoute>
              <Reservation />
            </ProtectRoute>
          }
        />
        <Route exact path="/trajets" element={<Trajets />} />
        <Route
          exact
          path="/trajets/create"
          element={
            <ProtectRoute>
              <Create />
            </ProtectRoute>
          }
        />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/profil/:id" element={<Profil />} />
        {/* Pour les routes par défault on mettra un path global ("*") */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default Root;
