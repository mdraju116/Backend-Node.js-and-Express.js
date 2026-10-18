/* 
-See the documention 
-https://github.com/faisal-shohag/mongo-db-operators 
-then go to the Doc Link : MongoDB Query and Operators 
-or,directly go to : https://docs.google.com/document/d/1gJ1U0Koi1PzxXpa_HBQR5-iQ6w0bhXE2SIF8DJBE64A/edit?tab=t.0

-go to page:15

✅✅Comparison Operators — ($eq, $ne, $gt, $gte, $lt, $lte)

ধরুন আপনি একটা Job Portal-এ Search করছেন — 'আমাকে ৫০ হাজারের বেশি বেতনের চাকরি দেখাও' বা 'ঢাকার বাইরের চাকরি দেখাতে চাই না'। 
এই ধরনের শর্ত দিয়ে ডেটা ফিল্টার করতেই Comparison Operators ব্যবহার হয়।

৬টি Comparison অপারেটর রয়েছে :
  • $eq — সমান
  • $ne — সমান না
  • $gt — বড়
  • $gte — বড় বা সমান
  • $lt — ছোট
  • $lte — ছোট বা সমান


📌1. $eq — Equal (সমান)
মানে: 'এই ফিল্ডের ভ্যালু ঠিক এটাই হতে হবে'
উদাহরণ: শুধু Dhaka-র চাকরি দেখাও
db.jobs.find({ location: { $eq: "Dhaka" } })
বা সহজে লিখতে পারেন:
db.jobs.find({ location: "Dhaka" })
💡 $eq আসলে MongoDB-এর default behavior, তাই { field: value } লিখলেও একই কাজ হয়।


📌2. $ne — Not Equal (সমান না)
মানে: 'এই ফিল্ডের ভ্যালু এটা হবে না'
উদাহরণ: Dhaka ছাড়া অন্য সব জায়গার চাকরি দেখাও
db.jobs.find({ location: { $ne: "Dhaka" } })
এই কুয়েরি Chittagong, Sylhet, Rajshahi, Khulna-র চাকরি দেখাবে।
💡 Real World: 'ঢাকার বাইরে যেতে রাজি আছি, তাহলে আমাকে অন্য শহরের চাকরি দেখাও।'


📌3. $gt — Greater Than (বড়)
মানে: 'এই ফিল্ডের ভ্যালু নির্দিষ্ট সংখ্যার চেয়ে বড় হতে হবে'
উদাহরণ: ৭০ হাজারের বেশি বেতনের চাকরি দেখাও
db.jobs.find({ salary: { $gt: 70000 } })
এতে Software Engineer (75k), DevOps (90k), PM (95k) ইত্যাদি দেখাবে।


📌4. $gte — Greater Than or Equal (বড় বা সমান)
মানে: 'এই ফিল্ডের ভ্যালু নির্দিষ্ট সংখ্যার সমান বা বেশি'
উদাহরণ: ঠিক ৭০ হাজার বা তার বেশি বেতনের চাকরি
db.jobs.find({ salary: { $gte: 70000 } })
💡 $gt এবং $gte-এর পার্থক্য: $gt মানে শুধু 'বেশি', $gte মানে 'বেশি বা সমান'।


📌5. $lt — Less Than (ছোট)
মানে: 'এই ফিল্ডের ভ্যালু নির্দিষ্ট সংখ্যার চেয়ে কম'
উদাহরণ: ৫০ হাজারের কম বেতনের এন্ট্রি-লেভেল চাকরি
db.jobs.find({ salary: { $lt: 50000 } })
এতে QA Engineer (45k), Technical Writer (40k), Intern (15k) দেখাবে।


📌6. $lte — Less Than or Equal (ছোট বা সমান)
মানে: 'এই ফিল্ডের ভ্যালু নির্দিষ্ট সংখ্যার সমান বা কম'
db.jobs.find({ salary: { $lte: 50000 } })


🔗 একাধিক Comparison Operator একসাথে ব্যবহার
উদাহরণ: ৫০ হাজার থেকে ৯০ হাজারের মধ্যে বেতনের চাকরি
db.jobs.find({
  salary: { $gte: 50000, $lte: 90000 }
})
💡 একই ফিল্ডে দুটো শর্ত দেওয়া যায়! এটা AND হিসেবে কাজ করে।
উদাহরণ: ৩ বছরের বেশি অভিজ্ঞতা এবং বেতন ৬০ হাজারের বেশি
db.jobs.find({
  experience: { $gt: 3 },
  salary: { $gt: 60000 }
})



*/