const jobsRouter = require('express').Router();

let jobs = [{ id: '1', company: 'rosaCO', link: 'rosaCO@company.com', notes: 'Best Company Ever', createTime: Date.now()}];

jobsRouter.get("/", function showAllJobs(req, res, next) {
  let jobsCollection = [];
  jobs.forEach(function infoWeNeed(job) {
    jobsCollection.push({id: job.id, company: job.company, link: job.link});
  });

  res.json(jobsCollection);
});

/**
  * This function adds a new job to the current array of jobs
  * @param {Object} req Must have a body like: {company: String, link: String, notes: String}
  * @param {Object} res The response will contain the message: {message: 'I sucessfully posted to the rosaCO site'}
**/
function addAJob(req, res, next) {
  console.log("This shows req.body", req.body);

  jobs.push(req.body);

  res.json({message: 'I sucessfully posted to the rosaCO site'});
}
jobsRouter.post("/", addAJob);

module.exports = jobsRouter;
