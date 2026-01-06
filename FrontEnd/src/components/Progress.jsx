import React from "react";

const Progress = ({ progress = 0, total = 5, color, bgColor }) => {
  return (
    <div>
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded transition-all ${
            index < progress ? "bg-cyan-800" : "bg-cyan-200"
          }`}
          style={{
            bgColor:
              index < progress
                ? color || "rgba(255, 99, 71, 0.9)"
                : "rgba(255, 99, 71, 0.7)",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Progress;
