import fs from "fs";
import path from "path";
import upload from "../middleware/uploadMiddleware.js";
import Resume from "../models/resumeModel.js";

export const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(
      req,
      res,
      async (error) => {
        if (error) {
          return res
            .status(400)
            .json({ message: "file uploads failed", error: error.message });
        }

        const resumeId = req.params.id;
        const resume = await Resume.findOne({
          _id: resumeId,
          userId: req.user._id,
        });

        if (!resume) {
          return res
            .status(404)
            .json({ message: " Resume not Found or unauthorized " });
        }

        // Use Process CWD to Locate Upload Folder

        const uploadsFolder = path.join(process.cwd(), "uploads");
        const baseUrl = `${req.protocol}://${req.get("host")} `;

        const newThumbnail = req.files.thumbnail?.[0];
        const newProfileImage = req.files.porfileImages?.[0];

        // Same for Porfile Preview image
        if (newThumbnail) {
          if (resume.thumbnailLink) {
            const oldThumbail = path.join(
              uploadsFolder,
              path.basename(resume.thumbnailLink)
            );

            if (fs.existsSync(oldThumbail)) fs.unlinkSync(oldThumbail);
          }
          resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }
        // Same for Porfile Preview image
        if (newProfileImage) {
          if (resume.profileInfo?.ProfilePreviewUrl) {
            const oldProfile = path.join(
              uploadsFolder,
              path.basename(resume.profileInfo.ProfilePreviewUrl)
            );

            if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
          }
          resume.profileInfo.ProfilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }

        await resume.save();
        res.status(200).json({
          message: "Image Uploads Successfully",
          thumbnailLink: resume.thumbnailLink,
          profilePreviewUrl: resume.profileInfo.ProfilePreviewUrl,
        });

        //
      }
    );
  } catch (error) {
    console.error(`Error Upolad image:`, error);
    res
      .status(400)
      .json({ message: "file uploads failed", error: error.message });
  }
};

export default uploadResumeImages;
