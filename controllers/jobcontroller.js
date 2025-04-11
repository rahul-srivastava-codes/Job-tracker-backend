const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
  const { status, date } = req.query;
  const query = {};
  if (status) query.status = status;
  if (date) query.date = { $gte: new Date(date) };

  const jobs = await Job.find(query).sort({ createdAt: -1 });
  res.json(jobs);
};

exports.addJob = async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
};

exports.updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
