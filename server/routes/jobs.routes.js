const jobsRouter = require('express').Router();

let jobs = [{ id: '1', company: 'rosaCO', link: 'rosaCO@company.com', notes: 'Best Company Ever', createTime: Date.now()}];
console.log(jobs);

jobsRouter.get("/", function showAllJobs(req, res, next) {
  res.json(jobs);
});

function addAJob(req, res, next) {
  console.log("This shows req.body", req.body);

  jobs.push(req.body);

  res.json({message: 'I sucessfully posted to the rosaCO site'});
}
jobsRouter.post("/", addAJob);

module.exports = jobsRouter;
