/* 
✅✅Module Summary — সব একসাথে

📚 MongoDB অপারেটর চিটশিট

1.Comparison Operators:
$eq | $ne | $gt | $gte | $lt | $lte

2.Logical Operators:
$and | $or | $not | $nor

3.Element Operators:
$exists | $type

4.Array Operators:
$in | $nin | $all | $size | $elemMatch

5.Update Operators:
$set | $inc | $push | $pull | $addToSet

6.Aggregation Operators:
$match | $group | $project | $sort | $limit | $skip | $lookup | $unwind | $facet

7.Accumulator Operators:
$sum  $avg $max  $min $push 





🚀 Capstone Query — সব একসাথে
এখন একটা জটিল Real-World কুয়েরি করবো। Scenario: 'আমাদের HR Team-এর জন্য একটা report চাই — Dhaka বা Remote-এ active চাকরির মধ্যে, ৩+ বছর experience দরকার এমন, department অনুযায়ী গড় বেতন, মোট jobs, এবং সবচেয়ে বেশি applicant পাওয়া top job — সর্টেড।'
db.jobs.aggregate([
  // Step 1: ফিল্টার — Dhaka বা Remote, active, experience >= 3
  { $match: {
    $or: [{ location: "Dhaka" }, { isRemote: true }],
    status: "active",
    experience: { $gte: 3 }
  }},


  // Step 2: Department অনুযায়ী group করো
  { $group: {
    _id: "$department",
    avgSalary: { $avg: "$salary" },
    totalJobs: { $sum: 1 },
    maxApplicants: { $max: "$applicants" },
    topJob: { $first: "$title" }
  }},


  // Step 3: আউটপুট সাজাও
  { $project: {
    department: "$_id",
    avgSalary: { $round: ["$avgSalary", 0] },
    totalJobs: 1,
    maxApplicants: 1,
    topJob: 1,
    _id: 0
  }},


  // Step 4: গড় বেতন অনুযায়ী sort
  { $sort: { avgSalary: -1 } }
])



💡 পরবর্তী পদক্ষেপ
MongoDB শেখার পর আপনি এগুলো শিখতে পারেন:
  ✅ MongoDB Indexes — কুয়েরি দ্রুত করুন
  ✅ Mongoose ODM — Node.js-এর সাথে MongoDB ব্যবহার
  ✅ MongoDB Atlas — Cloud Database সেটআপ
  ✅ Transactions — একাধিক অপারেশন একসাথে
  ✅ Schema Validation — ডেটার নিয়ম নির্ধারণ


*/