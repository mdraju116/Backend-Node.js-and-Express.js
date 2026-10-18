/* 
-See the documention 
-https://github.com/faisal-shohag/mongo-db-operators 
-then go to the Doc Link : MongoDB Query and Operators 
-or,directly go to : https://docs.google.com/document/d/1gJ1U0Koi1PzxXpa_HBQR5-iQ6w0bhXE2SIF8DJBE64A/edit?tab=t.0

-go to page:36

✅✅Aggregation Pipeline — $match, $group, $project


Aggregation Pipeline!
সাধারণ find() দিয়ে ডেটা পড়া যায়, কিন্তু বিশ্লেষণ করা যায় না। যেমন 'প্রতিটা শহরে গড় বেতন কত?' বা 'কোন ডিপার্টমেন্টে সবচেয়ে বেশি চাকরি আছে?' — এই ধরনের analytics-এর জন্য Aggregation লাগে।
Pipeline মানে হলো এক ধাপের আউটপুট পরের ধাপের ইনপুট হয়। ঠিক কারখানার assembly line-এর মতো!


📌 $match — ডেটা ফিল্টার করুন (find-এর মতো)
উদাহরণ: শুধু active চাকরিগুলো নিন
db.jobs.aggregate([
  { $match: { status: "active" } }
])
💡 $match সাধারণত pipeline-এর শুরুতে দেওয়া হয় — এটা ডেটা কমিয়ে দেয় তাই পরের ধাপগুলো দ্রুত হয়।


📌 $group — ডেটা গ্রুপ করুন
মানে: 'একটা ফিল্ডের ভ্যালু অনুযায়ী ডেটা ভাগ করো এবং calculation করো'
উদাহরণ: প্রতিটা শহরে কতটা চাকরি আছে?
db.jobs.aggregate([
  { $group: {
    _id: "$location",
    totalJobs: { $sum: 1 }
  }}
])
প্রতিটা শহরে গড় বেতন কত?
db.jobs.aggregate([
  { $group: {
    _id: "$location",
    avgSalary: { $avg: "$salary" },
    maxSalary: { $max: "$salary" },
    minSalary: { $min: "$salary" },
    totalJobs: { $sum: 1 }
  }}
])
Accumulator Operators:
  • $sum — যোগফল (বা কাউন্টের জন্য $sum: 1)
  • $avg — গড়
  • $max — সর্বোচ্চ
  • $min — সর্বনিম্ন
  • $push — গ্রুপের সব ভ্যালু অ্যারেতে রাখো


📌 $project — আউটপুট ফিল্ড কাস্টমাইজ করুন
মানে: 'pipeline-এর এই স্টেজে কোন ফিল্ড রাখবো আর কোনটা বাদ দেবো এবং নতুন ফিল্ড তৈরি করবো'
উদাহরণ: শুধু title এবং company দেখাও, _id বাদ দাও
db.jobs.aggregate([
  { $project: {
    title: 1,
    company: 1,
    _id: 0
  }}
])
নতুন calculated ফিল্ড তৈরি করুন:
db.jobs.aggregate([
  { $project: {
    title: 1,
    salary: 1,
    monthlySalary: "$salary",
    annualSalary: { $multiply: ["$salary", 12] }
  }}
])


🔗 Pipeline একসাথে — Match, Group, Project
উদাহরণ: শুধু active চাকরি নিয়ে, department অনুযায়ী গড় বেতন হিসাব করো, এবং সর্টেড আউটপুট দাও
db.jobs.aggregate([
  { $match: { status: "active" } },
  { $group: {
    _id: "$department",
    avgSalary: { $avg: "$salary" },
    jobCount: { $sum: 1 }
  }},
  { $project: {
    department: "$_id",
    avgSalary: { $round: ["$avgSalary", 0] },
    jobCount: 1,
    _id: 0
  }},
  { $sort: { avgSalary: -1 } }
])
💡 এই একটা কুয়েরিতেই Analytics Dashboard-এর জন্য সম্পূর্ণ ডেটা পাওয়া যাচ্ছে!


এটা MongoDB-এর সবচেয়ে শক্তিশালী ফিচার।



*/