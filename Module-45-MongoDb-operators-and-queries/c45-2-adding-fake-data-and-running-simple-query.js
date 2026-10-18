/* 
✅✅Step-1 : Create Database and collection
-go to : https://github.com/faisal-shohag/mongo-db-operators
-click on jobs.json =>copy the full data

-go to mongodb clusters => Browse collections => 
-create a database named (jobsdb) under the cluster(mongo-query)
-and create a collection (jobs) under the database (jobsdb)

-again create another db named (companies) at the same way.


✅✅Step-2 : Run query 
-go to NoSQLBooster
-press (ctrl + r) to refresh , created databases will be shown here
-double click on the collection to see them
-you can select JSON and JSON Format-Plain Json Text at the below screen settings


-now write query : (at the top screen)
-//1.to find all jobs
db.jobs.find();

-➡️to run : select the query line/or,just keep the mouse pointer at the end of that line
- then press,(ctrl + Enter) or Click Run at the topbar 

-//2.to find only one/first job
db.jobs.findOne();

-//3.to count all documents
db.jobs.countDocuments();




*/