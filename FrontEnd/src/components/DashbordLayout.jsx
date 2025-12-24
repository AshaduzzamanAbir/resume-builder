import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const DashbordLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="container mx-auto px-4 md:px-0 pt-4">{children}</div>
      )}
    </div>
  );
};

export default DashbordLayout;
