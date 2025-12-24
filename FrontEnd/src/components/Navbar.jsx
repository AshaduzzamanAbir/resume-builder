import React from "react";
import { Link } from "react-router-dom";
import { LayoutTemplate } from "lucide-react";
import { ProfileInfoCard } from "./Cards";

const Navbar = () => {
  return (
    <div className=" bg-white/70 backdrop-blur-xl border-b border-violet-100/50 py-2.5 px-4 md:px-0 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto gap-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3 pb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
              <LayoutTemplate className="w-5 h-5 text-white" />
            </div>

            <span className="font-bold text-xl sm:text2xl ">BuildResume</span>
          </div>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
