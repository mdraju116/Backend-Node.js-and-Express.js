/* 
-See the documention 
-https://github.com/faisal-shohag/mongo-db-operators 
-then go to the Doc Link : MongoDB Query and Operators 
-or,directly go to : https://docs.google.com/document/d/1gJ1U0Koi1PzxXpa_HBQR5-iQ6w0bhXE2SIF8DJBE64A/edit?tab=t.0

-go to page:23

✅✅Element & Type Operators — $exists, $type

এই অপারেটর দুটো একটু আলাদা ধরনের — এগুলো ভ্যালু তুলনা করে না, বরং চেক করে যে একটা ফিল্ড আসলেই আছে কিনা বা ডেটার ধরন কী।
বাস্তব উদাহরণ: আমাদের Job Collection-এ সব চাকরিতে salary ফিল্ড আছে তো? নাকি কিছু চাকরিতে বেতন উল্লেখ করা হয়নি? এটা চেক করতেই $exists ব্যবহার হয়।


📌 $exists — ফিল্ড আছে কিনা চেক করুন
মানে: 'এই ফিল্ড ডকুমেন্টে আছে কিনা'

উদাহরণ: যেসব জব-এ salary ফিল্ড আছে
db.jobs.find({ salary: { $exists: true } })
যেসব জব-এ salary ফিল্ড নেই:
db.jobs.find({ salary: { $exists: false } })
💡 আমাদের ফেক ডেটায় সব ডকুমেন্টে salary আছে, তাই false দিলে কিছু দেখাবে না।

প্র্যাকটিসের জন্য একটা ডকুমেন্ট ইনসার্ট করুন salary ছাড়া:
db.jobs.insertOne({
  title: "Unpaid Intern",
  company: "StartupXYZ",
  location: "Dhaka",
  experience: 0
})

এখন আবার কুয়েরি করুন:
db.jobs.find({ salary: { $exists: false } })
এবার শুধু এই Unpaid Intern-টা দেখাবে।


📌 $type — ডেটার ধরন চেক করুন
মানে: 'এই ফিল্ডের ডেটা কোন ধরনের (string, number, boolean, array, etc.)'
উদাহরণ: salary ফিল্ড যেগুলোতে number আছে
db.jobs.find({ salary: { $type: "number" } })
Common BSON Types:
  • double (1) — দশমিক সংখ্যা
  • string (2) — টেক্সট
  • object (3) — embedded document
  • array (4) — অ্যারে
  • boolean (8) — true/false
  • date (9) — তারিখ
  • null (10) — null
  • int (16) — পূর্ণসংখ্যা
উদাহরণ: skills ফিল্ড যেগুলোতে array আছে
db.jobs.find({ skills: { $type: "array" } })
উদাহরণ: posted ফিল্ড যেগুলোতে date আছে
db.jobs.find({ posted: { $type: "date" } })
💡 এই অপারেটর দুটো বিশেষ কাজে লাগে — ডেটা ভ্যালিডেশন এবং মিশ্র ডেটা ক্লিনআপে।


এই দুটো অপারেটর ডেটা কোয়ালিটি চেক করার সময় অনেক কাজে আসে। 


*/