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

  if (!(req.body.company && req.body.link && req.body.notes)) {
    let err = new Error("Please give required job information");
    err.status = 400;
    return next(err);
  }

  let newJob = req.body;
  newJob.createTime = Date.now();
  newJob.id = JSON.stringify(Date.now());
  jobs.push(newJob);

  res.json({message: 'I sucessfully posted to the rosaCO site'});
}
jobsRouter.post("/", addAJob);

/**
  * Allows you to show a specific job based on individual id
  * @param {Object} req Identifies the specific job we would like to view based on id
  * @param {Object} res Displays the job we slect via id
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
  * @param {Object} req Identifies the job to be deletd
  * @param {Object} res Displays the job to be deleted
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
