/* 
-See the documention 
-https://github.com/faisal-shohag/mongo-db-operators 
-then go to the Doc Link : MongoDB Query and Operators 
-or,directly go to : https://docs.google.com/document/d/1gJ1U0Koi1PzxXpa_HBQR5-iQ6w0bhXE2SIF8DJBE64A/edit?tab=t.0

-go to page:26


✅✅Array Query Operators — $in, $nin, $all, $size, $elemMatch

আমাদের Job Data-তে skills একটা array ফিল্ড। একজন ক্যান্ডিডেট যখন বলে 'আমি Python জানি,
 আমার জন্য কোন কোন চাকরি আছে?' — এই ধরনের অ্যারে-ভিত্তিক সার্চের জন্যই এই অপারেটরগুলো।


📌 $in — অ্যারের যেকোনো একটা ভ্যালু ম্যাচ হলে
মানে: 'এই লিস্টের যেকোনো একটা ভ্যালু ফিল্ডে থাকলেই দেখাও'

উদাহরণ: Python অথবা JavaScript জানা দরকার এমন চাকরি
db.jobs.find({
  skills: { $in: ["Python", "JavaScript"] }
})
আরেকটা উদাহরণ: Dhaka, Chittagong, বা Sylhet-এর চাকরি
db.jobs.find({
  location: { $in: ["Dhaka", "Chittagong", "Sylhet"] }
})
💡 $in একটা অ্যারে নেয় এবং ওই লিস্টের যেকোনো ভ্যালু ম্যাচ হলে ডকুমেন্ট রিটার্ন করে।


📌 $nin — Not In (লিস্টের কোনোটাই না)
মানে: 'এই লিস্টের কোনো ভ্যালুই থাকবে না'
উদাহরণ: Python বা JavaScript ছাড়া অন্য স্কিলের চাকরি
db.jobs.find({
  skills: { $nin: ["Python", "JavaScript"] }
})


📌 $all — অ্যারের সব ভ্যালু থাকতে হবে
মানে: 'এই লিস্টের সবগুলো ভ্যালু ফিল্ডে থাকতে হবে'
উদাহরণ: Python এবং SQL দুটোই জানা দরকার এমন চাকরি
db.jobs.find({
  skills: { $all: ["Python", "SQL"] }
})
💡 $in মানে 'যেকোনো একটা', $all মানে 'সবগুলোই' — পার্থক্যটা মনে রাখুন!


📌 $size — অ্যারের সাইজ চেক করুন
মানে: 'অ্যারেতে ঠিক কতটা আইটেম আছে সেটা চেক করো'
উদাহরণ: যেসব চাকরিতে ঠিক ৩টা স্কিল লাগবে
db.jobs.find({ skills: { $size: 3 } })
💡 $size সব ডকুমেন্ট ম্যাচ করবে যেখানে skills অ্যারেতে exactly ৩টা এলিমেন্ট আছে। 
Greater/Less than সাপোর্ট করে না, তবে $where বা aggregation দিয়ে করা যায়।


📌 $elemMatch — অ্যারের এলিমেন্টে জটিল শর্ত
মানে: 'অ্যারের কোনো একটা এলিমেন্ট এই সব শর্ত মেটালে দেখাও'

এটা বোঝার জন্য আগে একটা embedded array সহ ডেটা ইনসার্ট করি:
db.jobs.insertOne({
  title: "Senior Developer",
  company: "BigTech",
  interviews: [
    { round: 1, score: 85, passed: true },
    { round: 2, score: 70, passed: false }
  ]
})
এখন: যেসব চাকরিতে কোনো ইন্টারভিউ রাউন্ড আছে যেখানে score > 80 AND passed: true
db.jobs.find({
  interviews: {
    $elemMatch: {
      score: { $gt: 80 },
      passed: true
    }
  }
})
💡 $elemMatch ছাড়া করলে MongoDB আলাদা আলাদাভাবে চেক করতো — score > 80 হয়তো round 1-এ, 
আর passed: true হয়তো round 2-এ। $elemMatch নিশ্চিত করে যে একই এলিমেন্টে দুটো শর্তই পূরণ হতে হবে।



*/