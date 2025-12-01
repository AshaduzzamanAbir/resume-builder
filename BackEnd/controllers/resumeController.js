import Resume from "../models/resumeModel.js";
import fs from "fs";
import path from "path";

export const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    // Default Template
    const defaultResumeData = {
      profileInfo: {
        // profileImg: null,
        // previewUrl: "",
        ProfilePreviewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          description: "",
          progress: 0,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: 0,
        },
      ],
      interests: [""],
    };

    const newResume = await Resume.create({
      ...defaultResumeData,
      ...req.body,
      userId: req.user._id,
      title,
    });
    res.status(201).json({
      newResume,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Create Resume",
      error: error.message,
    });
  }
};

// get function
export const getUserResumes = async (req, res) => {
  try {
    const resume = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get Resume",
      error: error.message,
    });
  }
};

// get resume by id

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get Resume",
      error: error.message,
    });
  }
};

// Update Resume
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res.status(404).json({
        message: " Faild to get Resume or not authorized ",
      });
    }
    // MERGE RESUME UPDATE
    Object.assign(resume, req.body);
    // SAVE UPDATE RESUME
    const savedResume = await resume.save();
    res.json(savedResume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update Resume",
      error: error.message,
    });
  }
};

// DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res.status(404).json({
        message: "resume not Found or authorized",
      });
    }

    // CREATE A UPLODED FOLDER AND STORE THE RESUME THERE
    const uploadsFolder = path.join(process.cwd(), "uploads");

    if (resume.thumbnailLink) {
      const oldThumbail = path.join(
        uploadsFolder,
        path.basename(resume.thumbnailLink)
      );
      if (fs.existsSync(oldThumbail)) {
        fs.unlinkSync(oldThumbail);
      }
    }

    if (resume.profileInfo?.ProfilePreviewUrl) {
      const oldProfile = path.join(
        uploadsFolder,
        path.basename(resume.profileInfo.ProfilePreviewUrl)
      );

      if (fs.existsSync(oldProfile)) {
        fs.unlinkSync(oldProfile);
      }
    }

    // DELETE RESUME DOC

    const deleted = await Resume.deleteOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(204).json({
        message: " Faild to delete  ",
      });
    }
    res.status(200).json({
      message: "Thambnail DELETED Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to Delete user Resume" });
  }
};

//
