/* 

-See the documention 
-https://github.com/faisal-shohag/mongo-db-operators 
-then go to the Doc Link : MongoDB Query and Operators 
-or,directly go to : https://docs.google.com/document/d/1gJ1U0Koi1PzxXpa_HBQR5-iQ6w0bhXE2SIF8DJBE64A/edit?tab=t.0

-go to page:20

✅✅Logical Operators — $and, $or, $not, $nor

বাস্তব উদাহরণ: JobPortal-এ আপনি বলছেন — 'Dhaka-তে চাকরি চাই এবং বেতন ৬০ হাজারের বেশি হতে হবে' — এটা $and। 
আবার বলছেন — 'React জানি অথবা Vue জানি, যেকোনোটা হলেই চলবে' — এটা $or।


📌 $and — সব শর্তই সত্য হতে হবে
উদাহরণ: Dhaka-তে এবং বেতন ৭০ হাজারের বেশি
db.jobs.find({
  $and: [
    { location: "Dhaka" },
    { salary: { $gt: 70000 } }
  ]
})
সংক্ষেপে লেখার উপায় (implicit $and):
db.jobs.find({ location: "Dhaka", salary: { $gt: 70000 } })
💡 একই ফিল্ডে(location) দুটো শর্ত দিতে হলে $and লিখতেই হবে। কিন্তু আলাদা ফিল্ডে(location,salary) হলে না লিখলেও চলে।


📌 $or — যেকোনো একটা শর্ত সত্য হলেই যথেষ্ট
উদাহরণ: Dhaka অথবা Chittagong-এর চাকরি দেখাও
db.jobs.find({
  $or: [
    { location: "Dhaka" },
    { location: "Chittagong" }
  ]
})
আরেকটা উদাহরণ: বেতন ১ লাখের বেশি অথবা Remote চাকরি
db.jobs.find({
  $or: [
    { salary: { $gt: 100000 } },
    { isRemote: true }
  ]
})


📌 $not — শর্তটা সত্য না হলে দেখাও
উদাহরণ: ৫০ হাজারের বেশি বেতনের চাকরি নয় — মানে ৫০ হাজার বা কম
db.jobs.find({
  salary: { $not: { $gt: 50000 } }
})
💡 $not সবসময় একটা অপারেটর এক্সপ্রেশনের ভেতরে ব্যবহার হয়, সরাসরি ভ্যালুর সাথে না।


📌 $nor — সব শর্তগুলো মিথ্যা হলে দেখাও
উদাহরণ: Dhaka-তেও না, Remote-ও না — মানে অন্য শহরে অফিসে যেতে হবে
db.jobs.find({
  $nor: [
    { location: "Dhaka" },
    { isRemote: true }
  ]
})
এই কুয়েরিতে শুধু Chittagong, Sylhet, Rajshahi, Khulna-র non-remote চাকরি দেখাবে।





*/