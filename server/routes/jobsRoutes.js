import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  applyJob,
  createJob,
  deleteJobPost,
  getJobById,
  getJobPosts,
  revokeApplication,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

// POST JOB
router.post("/upload-job", userAuth, createJob);

// Handle Job applications
router.post("/apply-job", applyJob);

// Handle revoking application
router.post("/revoke-application", revokeApplication);

// UPDATE JOB
router.put("/update-job/:jobId", userAuth, updateJob);

// GET JOB POST
router.get("/find-jobs", getJobPosts);
router.get("/get-job-detail/:id", getJobById);

// DELETE JOB POST
router.delete("/delete-job/:id", userAuth, deleteJobPost);

export default router;