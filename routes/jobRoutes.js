const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobcontroller");

router.get("/", jobController.getJobs);
router.post("/", jobController.addJob);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

module.exports = router;
