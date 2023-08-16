import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  applyJob,
  createJob,
  deleteJobPost,
  getJobById,
  getJobPosts,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

// POST JOB
router.post("/upload-job", userAuth, createJob);

// Handle Job applications
router.post("/apply-job", applyJob);

// IPDATE JOB
router.put("/update-job/:jobId", userAuth, updateJob);

// GET JOB POST
router.get("/find-jobs", getJobPosts);
router.get("/get-job-detail/:id", getJobById);

// DELETE JOB POST
router.delete("/delete-job/:id", userAuth, deleteJobPost);

export default router;