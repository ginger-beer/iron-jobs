const jobsRouter = require('express').Router();

let jobs = [{ id: '1', company: 'rosaCO', link: 'rosaCO@company.com', notes: 'Best Company Ever', createTime: Date.now()}];
console.log(jobs);

jobsRouter.get("/", function showAllJobs(req, res, next) {

  res.json(jobs);
});

module.exports = jobsRouter;
