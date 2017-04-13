# iron jobs

An application for sharing job postings with other Iron Yard students and graduates.

## How to run
The root route of the website is http://localhost:3000 but in order to get to the jobs
you have to type /jobs to the end of the url. You can get more information about a job
by going to http://localhost:3000/jobs and then adding the id of the job to the end of
that url. For example, to get to the job with the id of 11 you would type http://localhost:3000/jobs/11.

We are using postman to add and delete jobs to the website. In order to create a new job you have
to set postman to post and send in the required information of company, link and notes as strings.
All of the required information has been written in as a dock block in the code as well.
In order to delete a job posting, turn postman to delete and type in a url in the same fashion
as we wrote to show one specific job. That will delete that one job with that specific ID.

Finally, if not all of the correct information was put in to create a new job posting,  
you will get a message asking for all of the required information.  

## Created by
Robby Dore & Sarah Smith

## GitHub url
https://github.com/ginger-beer/iron-jobs 
