import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserProvider from "./context/UserContext";
import Dashboard from "./pages/Dashboard";
import EditResume from "./components/EditResume";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/resume/:resumeId" element={<EditResume />}></Route>
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { fontSize: "14px" } }}
      />
    </UserProvider>
  );
};

export default App;
