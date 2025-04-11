const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobcontroller");
const Job = require("../models/Job");

router.get("/", jobController.getJobs);
router.post("/", jobController.addJob);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);
router.patch("/api/jobs/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (err) {
    console.error("Error updating job status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
