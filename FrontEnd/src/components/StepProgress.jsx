import React from "react";
import { shimmerStyle } from "../assets/dummystyle";
import { Check } from "feather-icons-react";
// import progress from "./Progress";

const StepProgress = ({ progress }) => {
  return (
    <>
      <style>{shimmerStyle}</style>
      <div className="relative w-full h-4 bg-white/5 backdrop-blur-2xl rounded-full overflow-hidden border border-white/100">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-300 to-fuchsia-300 rounded-full animate-shimmer-slow opacity-100 z-8">
          {/* main Progress Bar  */}
          <div
            className="absolute h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full animate-flow opacity-100 bg-[length:200%_100%] transition-all duration-700 overflow-hidden ease-out  animate-pulse-glow z-9"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent  via-red-500 to-transparent  animate-shimmer " />
            {/* Animated Bubbles  */}
            <div className="absolute inset-0 opacity-80 ">
              {[
                ...Array(8).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 w-2 h-10 bg-white rounded-full animate-bubble shadow-lg"
                    style={{
                      left: `${(i + 1) * 12}%`,
                      animationDelay: `${i * 0.25}s`,
                      transform: "TranslateY(-50%)",
                    }}
                  ></div>
                )),
              ]}
            </div>

            {/* Partile Effect  */}
            <div>
              {[
                ...Array(12).map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  ></div>
                )),
              ]}
            </div>
          </div>
        </div>

        {progress > 0 && (
          <div
            className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/60 to-white/30 blur-sm"
            style={{
              left: `${Math.max(0 - progress - 4)}%`,
            }}
          ></div>
        )}
      </div>

      <div className="flex justify-between items-center mt-3 ml-3 ">
        <div className="text-xs font-bold text-black ">
          {progress < 25
            ? "Getting Started"
            : progress < 50
            ? "Makeing Progress"
            : progress < 75
            ? "Almost There"
            : "Nearly Completed"}
        </div>

        <div className="flex items-center gap-2 ">
          {progress === 100 && (
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center ">
              <Check size={12} className="text-white" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StepProgress;
