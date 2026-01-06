import React, { useEffect, useRef, useState } from "react";
import { DUMMY_RESUME_DATA, resumeTemplates } from "../utils/data";
import Tabs from "./Tabs";
import { Check } from "lucide-react";
import { TemplateCard } from "./Cards";
import RenderResume from "./RenderResume";

const TAB_DATA = [{ label: "Template" }];
const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  onClose,
}) => {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(400);

  // Select theme Template using ID
  const initialIndex = resumeTemplates.findIndex((t) => t.id === selectedTheme);
  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme || resumeTemplates[0]?.id || "",
    index: initialIndex >= 0 ? initialIndex : 0,
  });

  const [tabValue, setTabValue] = useState("Template");

  const handleThemeSelection = () => {
    setSelectedTheme(selectedTemplate.theme);
    onClose();
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto border bg-red-500 overflow-hidden">
      {/* // header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center  justify-between gap-4 p-4 sm:p-6 bg-gradient-to-r from-ref-600 to-violet-50 rounded-2xl border border-violet-200">
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />
        <button
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black rounded-2xl hover:scale-105 border border-red-500"
          onClick={handleThemeSelection}
        >
          <Check size={16} /> Apply Changes
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 border bg-green-500">
        <div className="lg:col-span-2 bg-green-800 rounded-2xl border border-gray-100 p-4 sm:p-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[55vh] lg:max-h-[70vh] border border-green-500 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-auto ">
            {resumeTemplates.map((template, index) => (
              <TemplateCard
                key={index}
                thumbnailImg={template.thumbnailImg}
                isSelected={selectedTemplate.index === index}
                onSelect={() =>
                  setSelectedTemplate({ theme: template.id, index })
                }
              />
            ))}
          </div>
        </div>

        {/* Right Preview Section */}
        <div
          ref={resumeRef}
          className="lg:col-span-3 col-span-2 bg-white rounded-2xl border border-gray-700 p-4 sm:p-6 "
        >
          <RenderResume
            templateId={selectedTemplate?.theme || ""}
            resumeData={resumeData || DUMMY_RESUME_DATA}
            containerWidth={baseWidth}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
