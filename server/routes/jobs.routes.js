const jobsRouter = require('express').Router();

const Job = require("../models/Job.model");
let output = require("../helper/response.helper");

/**
 * Show all of the jobs
 * @param  {Object}     res  Shows all of the jobs
 * @param  {Function}   next
 * @return {void}
 */
function showAllJobs(req, res, next) {
  let mongoQuery = {};

  if (req.query.query) {
    mongoQuery = {
      $or: [
        { company: {$regex: req.query.query, $options: 'i'}},
        { notes: {$regex: req.query.query, $options: 'i'}}
      ]
    };
  }
  console.log(mongoQuery, "Mongo Query~~~");

  Job.find(mongoQuery)
    .then(function findJobInfo(jobInfo) {
      res.json(jobInfo.map(function infoWeNeed(job) {
        return ({id: job.id, company: job.company, link: job.link});
      }));
    })
    .catch(function errHandler(err) {
      console.error(err);
      let theErr = new Error("Unable to get the jobs from the database.");
      theErr.status = 500;
      return next(theErr);
    });
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

  if (!req.body.company || !req.body.link || !req.body.notes) {
    let err = new Error("Please give required job information");
    err.status = 400;
    return next(err);
  }
  //TODO check for empty string entry as company, link, notes

  let newJob = new Job({ company: req.body.company, link: req.body.link, notes: req.body.notes });
  newJob.createTime = Date.now();
  newJob.save()
    .then(function madeNewJob(newJob) {
      res.json(output(newJob));
    })
    .catch(function errHandler(err) {
      console.error(err);
      let theErr = new Error("Could not save to the database");
      theErr.status = 500;
      return next(theErr);
    });
}
jobsRouter.post("/", addAJob);

/**
  * Allows you to show a specific job based on individual id
  * @param  {Object} req Identifies the specific job we would like to view based on id
  * @param  {Object} res Displays the job we slect via id
  * @return {void}
**/
function showSpecificJob(req, res, next) {

  Job.findById(req.params.id)
    .then(function sendBackSpecificJob(data) {
      if (!data) {
        let err = new Error("No job with that ID");
        err.status = 404;
        return next(err);
      }
      res.json(output(data));
    })
    .catch(function errHandler(err) {
      console.error(err);
      let theErr = new Error("Failed to search for ID.");
      theErr.status = 500;
      return next(theErr);
    });
}
jobsRouter.get("/:id", showSpecificJob);

/**
  * Allows you to delete a specific job via its individual id
  * @param  {Object} req Identifies the job to be deletd
  * @param  {Object} res Displays the job to be deleted
  * @return {void}
**/
function deleteSpecificJob(req, res, next) {
  Job.findById(req.params.id)
    .then(function deleteTheSelectedJob(data) {
      if (!data) {
        let err = new Error("No job with that ID");
        err.status = 404;
        return next(err);
      }

      res.json(output(data));
      Job.remove({ _id: data.id}, function callbackFun() {
        console.log(data.id, 'has been deleted');
      });
    })
    .catch(function errHandler(err) {
      console.error(err);
      let theErr = new Error("Failed to delete by ID.");
      theErr.status = 500;
      return next(theErr);
    });
}
jobsRouter.delete("/:id", deleteSpecificJob);

module.exports = jobsRouter;
