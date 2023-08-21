import mongoose from "mongoose";
import Jobs from "../models/jobsModel.js";
import Companies from "../models/companiesModel.js";

export const createJob = async (req, res, next) => {
  try {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
      url
    } = req.body;

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !requirements ||
      !desc
    ) {
      next("Please Provide All Required Fields");
      return;
    }

    const id = req.body.user.userId;
    const pic = url;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Company with id: ${id}`);

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      detail: { desc, requirements },
      company: id, 
      logo: pic
    };

    const job = new Jobs(jobPost);
    await job.save();

    //update the company information with job id
    const company = await Companies.findById(id);

    company.jobPosts.push(job._id);
    const updateCompany = await Companies.findByIdAndUpdate(id, company, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Job Posted SUccessfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    } = req.body;
    const { jobId } = req.params;

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !desc ||
      !requirements
    ) {
      next("Please Provide All Required Fields");
      return;
    }
    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Company with id: ${id}`);

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      detail: { desc, requirements },
      _id: jobId,
    };

    await Jobs.findByIdAndUpdate(jobId, jobPost, { new: true });

    res.status(200).json({
      success: true,
      message: "Job Post Updated SUccessfully",
      jobPost,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getJobPosts = async (req, res, next) => {
  try {
    const { search, sort, location, jtype, exp } = req.query;
    const types = jtype?.split(","); //full-time,part-time
    const experience = exp?.split("-"); //2-6

    let queryObject = {};

    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }

    if (jtype) {
      queryObject.jobType = { $in: types };
    }

    //    [2. 6]

    if (exp) {
      queryObject.experience = {
        $gte: Number(experience[0]) - 1,
        $lte: Number(experience[1]) + 1,
      };
    }

    if (search) {
      const searchQuery = {
        $or: [
          { jobTitle: { $regex: search, $options: "i" } },
          { jobType: { $regex: search, $options: "i" } },
        ],
      };
      queryObject = { ...queryObject, ...searchQuery };
    }

    let queryResult = Jobs.find(queryObject).populate({
      path: "company",
      select: "-password",
    });

    // SORTING
    if (sort === "Newest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "Oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("jobTitle");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("-jobTitle");
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    //records count
    const totalJobs = await Jobs.countDocuments(queryResult);
    const numOfPage = Math.ceil(totalJobs / limit);

    // move next page
    queryResult = queryResult.skip(skip).limit(limit);

    // show more instead of moving to next page
    // queryResult = queryResult.limit(limit * page);

    const jobs = await queryResult;

    res.status(200).json({
      success: true,
      totalJobs,
      data: jobs,
      page,
      numOfPage,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Jobs.findById({ _id: id }).populate({
      path: "company",
      select: "-password",
    });

    if (!job) {
      return res.status(200).send({
        message: "Job Post Not Found",
        success: false,
      });
    }

    //GET SIMILAR JOB POST
    const searchQuery = {
      $or: [
        { jobTitle: { $regex: job?.jobTitle, $options: "i" } },
        { jobType: { $regex: job?.jobType, $options: "i" } },
      ],
    };

    let queryResult = Jobs.find(searchQuery)
      .populate({
        path: "company",
        select: "-password",
      })
      .sort({ _id: -1 });

    queryResult = queryResult.limit(6);
    const similarJobs = await queryResult;

    res.status(200).json({
      success: true,
      data: job,
      similarJobs,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const findJobById = async (jobId) => {
  try {
    const job = await Jobs.findById(jobId);
    return job;
  } catch (error) {
    console.error("Error finding job by ID:", error);
    return null;
  }
};

const saveJob = async (job) => {
  try {
    await job.save();
  } catch (error) {
    console.error("Error saving job:", error);
  }
};

export const applyJob = async (req, res, next) => {
  const { jobId, userId } = req.body;

  try {
    // Find the job by ID and update the application array and applicant count
    const job = await findJobById(jobId); // Implement this function to find the job by ID

    if (job) {
      if (!job.application.includes(userId)) {
        console.log(userId);
        job.application.push(userId);
        
        // Save the updated job details
        await saveJob(job); // Implement this function to save the updated job
        res.json({ success: true, message: "Applied for the job successfully." });
      } else {
        res.status(400).json({ success: false, message: "Already applied." });
      }
    } else {
      res.status(404).json({ success: false, message: "Job not found." });
    }
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

export const revokeApplication = async (req, res, next) => {
  const { jobId, userId } = req.body;

  try {
    const job = await Jobs.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    // Convert the userId to a valid ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Check if the user has applied
    const applicantIndex = job.application.findIndex(applicantId =>
      applicantId.equals(userObjectId)
    );

    if (applicantIndex !== -1) {
      job.application.splice(applicantIndex, 1);
      await job.save();
      
      return res.json({ success: true, message: 'Application revoked successfully.' });
    } else {
      return res.status(400).json({ success: false, message: 'Application not found.' });
    }
  } catch (error) {
    console.error('Error revoking application:', error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
};

export const deleteJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the job post to determine the company it belongs to
    const job = await Jobs.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job Post not found." });
    }

    // Delete the job post from the general jobs list
    await Jobs.findByIdAndDelete(id);

    // Delete the job post from the company's jobPosts list
    const company = await Companies.findById(job.company);
    
    if (company) {
      company.jobPosts.pull(id); // Assuming jobPosts is an array of job IDs
      await company.save();
    }

    res.status(200).send({
      success: true,
      message: "Job Post Deleted Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};