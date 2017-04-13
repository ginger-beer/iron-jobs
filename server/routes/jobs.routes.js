const jobsRouter = require('express').Router();

const Job = require("../models/Job.model");

/**
 * Show all of the jobs
 * @param  {Object}     res  Shows all of the jobs
 * @param  {Function}   next
 * @return {void}
 */
function showAllJobs(req, res, next) {
  let jobsCollection = [];

  if (!Array.isArray(jobs)) {
      let err = new Error("Jobs is no longer an array");
      err.status = 500;
      return next(err);
  }

  res.json(jobs.map(function infoWeNeed(job) {
    return ({id: job.id, company: job.company, link: job.link});
  }));
}
jobsRouter.get("/", showAllJobs);

/**
  * This function adds a new job to the current array of jobs
  * @param  {Object}    req Must have a body like: {company: String, link: String, notes: String}
  * @param  {Object}    res The response will contain the message: {message: 'I sucessfully posted to the rosaCO site'}
  * @param  {Function}  next
  * @return {void}
**/
function addAJob(req, res, next) {
  console.log("This shows req.body", req.body);

  if (!req.body.company || !req.body.link || !req.body.notes) {
    let err = new Error("Please give required job information");
    err.status = 400;
    return next(err);
  }
  //TODO check for empty string entry as company, link, notes

  let newJob = { company: req.body.company, link: req.body.link, notes: req.body.notes };
  newJob.createTime = Date.now();
  newJob.id = JSON.stringify(Date.now());
  jobs.push(newJob);

  res.json({message: 'I sucessfully posted to the rosaCO site'});
}
jobsRouter.post("/", addAJob);

/**
  * Allows you to show a specific job based on individual id
  * @param  {Object} req Identifies the specific job we would like to view based on id
  * @param  {Object} res Displays the job we slect via id
  * @return {void}
**/
function showSpecificJob(req, res, next) {
  let correctJob = jobs.filter(function specificJobId(job) {
    return job.id === req.params.id;
  });
  res.json(correctJob);
}
jobsRouter.get("/:id", showSpecificJob);

/**
  * Allows you to delete a specific job via its individual id
  * @param  {Object} req Identifies the job to be deletd
  * @param  {Object} res Displays the job to be deleted
  * @return {void}
**/
function deleteSpecificJob(req, res, next) {
  jobs.find(function jobToDelete(job, index) {
     if (job.id === req.params.id) {
       res.json(job);
       jobs.splice(index, 1);
     }
  });
}
jobsRouter.delete("/:id", deleteSpecificJob);

module.exports = jobsRouter;
