import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/HomePage";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";
import Room from "./pages/Room/Room";

function App() {
  const GuestRoute = ({ element, ...props }) => {
    const { isAuth } = useSelector((state) => state.auth);

    return isAuth ? <Navigate to="/rooms" /> : element;
  };

  const SemiProtected = ({ element, ...props }) => {
    const { user, isAuth } = useSelector((state) => state.auth);

    return !isAuth ? (
      <Navigate to="/" />
    ) : isAuth && !user.activated ? (
      element
    ) : (
      <Navigate to="/rooms" />
    );
  };

  const ProtectedRoute = ({ element, ...props }) => {
    const { user, isAuth } = useSelector((state) => state.auth);

    return !isAuth ? (
      <Navigate to="/" />
    ) : isAuth && !user.activated ? (
      <Navigate to="/activate" />
    ) : (
      element
    );
  };

  const { loading } = useLoadingWithRefresh();

  return loading ? (
    <Loader message="Loading ..." />
  ) : (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<GuestRoute element={<Home />} />} />

        <Route
          path="/authenticate"
          element={<GuestRoute element={<Authenticate />} />}
        />

        <Route
          path="/activate"
          element={<SemiProtected element={<Activate />} />}
        />

        <Route path="/rooms" element={<ProtectedRoute element={<Rooms />} />} />
        <Route path="/room/:id" element={<ProtectedRoute element={<Room />} />} />
      </Routes>
    </Router>
  );
}

export default App;
