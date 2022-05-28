import React, { useContext } from "react";
import NavigationBar from "./Components/NavigationBar";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ChangePassword from "./Components/ChangePassword";
import ForgetPassword from "./Components/ForgetPassword";
import AuthContext from "./Auth/auth-context";
import { Navigate } from "react-router-dom";
import Home from "./Components/Home";
import AddBlog from "./Components/AddBlog";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {authCtx.isLoggedIn &&<Route path="/addblog" element={<AddBlog />} />}
        {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
        {!authCtx.isLoggedIn && <Route path="/signup" element={<Signup />} />}
        {authCtx.isLoggedIn && (
          <Route path="/changepassword" element={<ChangePassword />} />
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        )}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};

export default App;
