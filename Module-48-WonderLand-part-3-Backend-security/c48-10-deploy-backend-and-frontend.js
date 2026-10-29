/* 
✅✅2.Backend-deployment (c48-10)
⚠️NB: you can deploy the project using terminal too, just write :vercel, then follow the instruction
  (but I will use the Vercel Site)

1.➡️➡️Finish Check up at Backend
-check that at the end of the index.js file there is this exists or not:(if not then add)
  export default app;

-now, search for any local api at the entire backend
-if found, then create a variable at .env like this :
  FRONTEND_URL =http://localhost:3000/

-now, replace all the local api like this : 
  `${process.env.FRONTEND_URL}/....`

-create a vercel.json file and write this code :(same for all project)

        {
        "version": 2,
        "builds": [
            {
            "src": "index.js",
            "use": "@vercel/node"
            }
        ],
        "routes": [
            {
            "src": "/(.*)",
            "dest": "index.js"
            }
        ]
        }

-push to github
-no need to build like frontend



2.➡️➡️Deploy at vercel.app
-go to vercel
-create new Project
-import github repo same as frontend (but backend repo separate, frontend repo separate)
-give the project name
-import .env file as Environment variables
-Create Project
-Don't add Optional Integration now
-Deploy
-go to live link

-copy the live link  and use it for Frontend deploy

⚠️⚠️if any error found at the live link like : This page is unavailable / others error
-then go to vercel and check the Logs. Copy the error message and solve using gpt.

-For an error msg like this (from log) : MongoServerSelectionError
-check the ip list at Mongodb atlas (Database & Network Access)
-then add this temp ip : 0.0.0.0/0

-now refresh the live link again.
-check the endpoints :
    https://wonderland-backend-five.vercel.app/packages

-After deploying the frontend and copy the live link of frontend and
-change the Environment variable FRONTEND_URL with the actual one

-no need to change at the vscode .env file








*/