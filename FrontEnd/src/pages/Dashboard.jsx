import React, { useEffect, useState } from "react";
import DashbordLayout from "../components/DashbordLayout";
import { dashboardStyles as styles } from "../assets/dummystyle";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { LucideFilePlus, LucideTrash2 } from "lucide-react";
import { ResumeSummaryCard } from "../components/Cards";

import toast from "react-hot-toast";
import moment from "moment";
import Model from "../components/Model";
import CreateResumeForm from "../components/CreateResumeForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false); // []
  const [allResumes, setAllResumes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Calculate completion percentage for a resume
  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience
    resume.workExperience?.forEach((exp) => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resume.education?.forEach((edu) => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills
    resume.skills?.forEach((skill) => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects
    resume.projects?.forEach((project) => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resume.certifications?.forEach((cert) => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages
    resume.languages?.forEach((lang) => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests
    totalFields += resume.interests?.length || 0;
    completedFields +=
      resume.interests?.filter((i) => i?.trim() !== "")?.length || 0;

    return Math.round((completedFields / totalFields) * 100);
  };

  // Completed or filled IT will ++
  const fetchAllResumes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      // Add one by one to Each resume
      const resumesWithCompletion = response.data.map((resume) => ({
        ...resume,
        completion: calculateCompletion(resume),
      }));
      // console.log(resumesWithCompletion);
      setAllResumes(resumesWithCompletion);
      return resumesWithCompletion;
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const hendleResumeDelete = async () => {
    if (!resumeToDelete) return;
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete));
      toast.success("Resume deleted successfully");
      fetchAllResumes();
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume");
    } finally {
      setResumeToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  const handleDeleteClick = (resumeId) => {
    setResumeToDelete(resumeId);
    setShowDeleteConfirmation(true);
  };

  return (
    <DashbordLayout>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>My Resume</h1>
            <p className={styles.headerSubtitle}>
              {allResumes.length > 0
                ? `You have ${allResumes.length} Resumes ${
                    allResumes.length !== 1 ? "s" : ""
                  }`
                : "Start Building Your Resumes Now!"}
            </p>
          </div>

          <div className="flex gap-4 ">
            <button
              className={styles.createButton}
              onClick={() => setOpenCreateModal(true)}
            >
              + Create New Resume
            </button>
          </div>
        </div>

        {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}
        {/* Empty state */}
        {!loading && allResumes.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <div>
              <LucideFilePlus size={32} className="text-violet-500" />
            </div>

            <h3 className={styles.emptyTitle}>No Resumes Found</h3>
            <p className={styles.emptyText}>
              You haven't created any resumes yet.
            </p>
            <button
              className={styles.createButton}
              onClick={() => setOpenCreateModal(true)}
            >
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                <LucideFilePlus
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />{" "}
                Create Your First Resume
              </span>
            </button>
          </div>
        )}

        {/* grid view of resumes */}
        {!loading && allResumes.length > 0 && (
          <div className={styles.grid}>
            <div
              className={styles.newResumeCard}
              onClick={() => setOpenCreateModal(true)}
            >
              <div className={styles.newResumeIcon}>
                <LucideFilePlus size={32} className="text-white" />
              </div>
              <h3 className={styles.newResumeTitle}>Create New Resume</h3>
              <p className={styles.newResumeText}>
                start Building your resume from your Career.
              </p>
            </div>
            {allResumes.map((resume) => (
              <ResumeSummaryCard
                key={resume._id}
                title={resume.title}
                imgUrl={resume.thumbnailLink}
                createdAt={resume.createdAt}
                updatedAt={resume.updatedAt}
                completion={resume.completion || 0}
                onSelect={() => navigate(`/resume/${resume._id}`)}
                onDelete={() => {
                  handleDeleteClick(resume._id);
                }}
                isPremium={resume.isPremium}
                isNew={moment().diff(moment(resume.createdAt), "days") < 7}
              />
            ))}
          </div>
        )}
      </div>
      {/* create model  */}
      <Model
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
        maxWidth="max-w-2xl"
      >
        <div className={`${styles.modalHeader} p-4`}>
          <h3 className={styles.modalTitle}>Create New Resume</h3>
          {/* <button
            onClick={() => setOpenCreateModal(false)}
            className={styles.modalCloseButton}
          >
            X
          </button> */}
        </div>
        <CreateResumeForm
          onSuccess={() => {
            setOpenCreateModal(false);
            fetchAllResumes();
          }}
        />
      </Model>

      {/* Delete Confirmation Model */}
      <Model
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        title="Confirm Delete"
        showActionBtn
        actionBtnText="Delete"
        className="bg-red-600 hover:bg-red-700"
        onActionClick={hendleResumeDelete}
      >
        <div className="p-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className={styles.deleteIconWrapper}>
              <LucideTrash2 size={24} className="text-violet-500" />
            </div>
            <h3 className={styles.deleteTitle}>
              Are you sure you want to delete this resume?
            </h3>
            <p className={styles.deleteText}>Make sure this resume?</p>
          </div>
        </div>
      </Model>
    </DashbordLayout>
  );
};

export default Dashboard;
