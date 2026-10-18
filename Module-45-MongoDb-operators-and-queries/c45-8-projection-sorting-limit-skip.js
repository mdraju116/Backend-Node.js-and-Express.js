/* 
-See the documention 
-https://github.com/faisal-shohag/mongo-db-operators 
-then go to the Doc Link : MongoDB Query and Operators 
-or,directly go to : https://docs.google.com/document/d/1gJ1U0Koi1PzxXpa_HBQR5-iQ6w0bhXE2SIF8DJBE64A/edit?tab=t.0

-go to page:30

✅✅Projection & Sorting


এখন পর্যন্ত আমরা find() করলে সব ফিল্ড দেখতাম। কিন্তু বাস্তবে আমরা সব ফিল্ড চাই না — যেমন Job Card-এ শুধু title, company, salary দেখালেই যথেষ্ট। এটাই Projection।
আর Sorting হলো ফলাফলকে বেতন বেশি থেকে কম, বা নাম অনুযায়ী সাজানো।


📌 Projection — শুধু দরকারি ফিল্ড দেখান
Include করা (1 দিয়ে):
উদাহরণ: শুধু title, company, salary দেখাও
db.jobs.find(
  {},
  { title: 1, company: 1, salary: 1 }
)
এতে _id আসবে (default)। _id বাদ দিতে চাইলে:
db.jobs.find(
  {},
  { title: 1, company: 1, salary: 1, _id: 0 }
)
💡 Projection-এর দ্বিতীয় আর্গুমেন্ট: 1 মানে দেখাও, 0 মানে লুকাও।

Exclude করা (0 দিয়ে):
উদাহরণ: সব ফিল্ড দেখাও কিন্তু _id এবং applicants বাদ দাও
db.jobs.find(
  {},
  { _id: 0, applicants: 0 }
)
💡 CRITICAL: Include এবং Exclude একসাথে ব্যবহার করা যায় না (_id ছাড়া)।


📌 Sorting — ফলাফল সাজান
sort() মেথড ব্যবহার করুন: 1 মানে ascending (ছোট থেকে বড়), -1 মানে descending (বড় থেকে ছোট)
একটা ফিল্ড দিয়ে সর্ট:
বেতন বেশি থেকে কম অর্ডারে দেখাও:
db.jobs.find({}, { title: 1, salary: 1, _id: 0 }).sort({ salary: -1 })
একাধিক ফিল্ড দিয়ে সর্ট:
প্রথমে location A-Z, তারপর salary বেশি থেকে কম:
db.jobs.find().sort({ location: 1, salary: -1 })


✅✅📌 limit() এবং skip() — পেজিনেশন
প্রথম ৫টা চাকরি দেখাও:
db.jobs.find().limit(5)
পেজিনেশন — Page 2 দেখাও (প্রতি পেজে ৫টা):
db.jobs.find().skip(5).limit(5)

সবকিছু একসাথে — বেতন অনুযায়ী সর্ট করে Page 2:
db.jobs.find(
  { status: 'active' },
  { title: 1, salary: 1, company: 1, _id: 0 }
).sort({ salary: -1 }).skip(5).limit(5)
💡 Real World App-এ এভাবেই পেজিনেশন করা হয়!






*/