import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getAppliedJobs, getUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

// GET user
router.post("/get-user", userAuth, getUser);

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUser);

// Getting applied jobs
router.get("/applied-jobs", userAuth, getAppliedJobs);

export default router;