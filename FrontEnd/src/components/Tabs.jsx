import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="w-full my-2">
      <div className="flex flex-wrap bg-violet-50 rounded-2xl border border-violet-100">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative flex-1 sm:flex-none p-1 rounded-2xl border border-violet-100 font-bold rounded-xl transition-all 
            ${
              activeTab === tab.label
                ? "bg-white text-violet-700 shadow-lg"
                : "text-slate-500 hover:text-violet-600 hover:bg-white/50"
            } `}
            onClick={() => setActiveTab(tab.label)}
          >
            <span className="relative z-10">
              {tab.label}

              {activeTab === tab.label && (
                <div className="absolute inset-0 h-1 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-b-xl"></div>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
