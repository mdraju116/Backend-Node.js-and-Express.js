/* 
-See the documention 
-https://github.com/faisal-shohag/mongo-db-operators 
-then go to the Doc Link : MongoDB Query and Operators 
-or,directly go to : https://docs.google.com/document/d/1gJ1U0Koi1PzxXpa_HBQR5-iQ6w0bhXE2SIF8DJBE64A/edit?tab=t.0

-go to page:30

✅✅Update Operators — $set, $inc, $push, $pull


এতদিন আমরা শুধু ডেটা পড়েছি (find), এখন ডেটা পরিবর্তন করবো।
বাস্তব উদাহরণ: একটা Job Portal-এ বেতন পরিবর্তন হলো, নতুন স্কিল যোগ হলো, আবেদনকারী সংখ্যা বাড়লো — এই সব আপডেটের জন্য Update Operators লাগে।


📌 $set — ফিল্ডের ভ্যালু সেট করুন
মানে: 'এই ফিল্ডের ভ্যালু এটা করো'
উদাহরণ: TechCorp Bangladesh-এর Software Engineer-এর বেতন ৮০ হাজার করো
db.jobs.updateOne(
  { title: "Software Engineer", company: "TechCorp Bangladesh" },
  { $set: { salary: 80000 } }
)
একাধিক ফিল্ড একসাথে আপডেট:
db.jobs.updateOne(
  { title: "Software Engineer" },
  { $set: { salary: 80000, status: "hiring", updatedAt: new Date() } }
)
💡 $set দিয়ে নতুন ফিল্ড যোগ করা যায়, আবার বিদ্যমান ফিল্ড আপডেটও করা যায়।


📌 $inc — সংখ্যা বাড়ান বা কমান
মানে: 'এই সংখ্যার সাথে আরো এতটা যোগ করো (বা বিয়োগ করো)'
উদাহরণ: Data Analyst-এ নতুন ১০ জন আবেদন করেছে
db.jobs.updateOne(
  { title: "Data Analyst" },
  { $inc: { applicants: 10 } }
)
কমাতে হলে নেগেটিভ দিন:
db.jobs.updateOne(
  { title: "Data Analyst" },
  { $inc: { applicants: -5 } }
)
💡 $inc কাউন্টার, স্কোর, বা যেকোনো incrementing নম্বরের জন্য পারফেক্ট।


📌 $push — অ্যারেতে আইটেম যোগ করুন
মানে: 'অ্যারেতে এই নতুন ভ্যালু যোগ করো'
উদাহরণ: Frontend Developer-এর স্কিল লিস্টে TypeScript যোগ করো
db.jobs.updateOne(
  { title: "Frontend Developer" },
  { $push: { skills: "TypeScript" } }
)
একসাথে একাধিক আইটেম যোগ করতে $each ব্যবহার করুন:
db.jobs.updateOne(
  { title: "Frontend Developer" },
  { $push: { skills: { $each: ["TypeScript", "GraphQL"] } } }
)


📌 $pull — অ্যারে থেকে আইটেম সরান
মানে: 'অ্যারে থেকে এই ভ্যালু বাদ দাও'
উদাহরণ: UI/UX Designer-এর স্কিল থেকে Sketch বাদ দাও
db.jobs.updateOne(
  { title: "UI/UX Designer" },
  { $pull: { skills: "Sketch" } }
)
💡 $pull ম্যাচিং সব ভ্যালু সরিয়ে দেয়। শর্ত দিয়েও সরানো যায়।




*/