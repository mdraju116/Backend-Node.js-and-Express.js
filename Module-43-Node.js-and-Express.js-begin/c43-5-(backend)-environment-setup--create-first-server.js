/* 
✅✅✅ Create Express.js Server using Node.js and Nodemon

✅✅Step-0: Install Node.js (no need because we have already did it during javascript run)
    https://nodejs.org/en
    Get Node.Js =>
    Download & Install 

✅✅Step-1 : Create a new server
    -go to project terminal
    -type : npm init (for manual setup)  (enter)
        -or,type : npm init -y (for auto setup)  
        (then only need to change this from package.json)
        "type": "module",

    -simply hit enter /you can define the author, type,... :
        package name: (my-first-server)
        version: (1.0.0)
        description: Express js Server
        entry point: (index.js)
        test command:
        git repository:
        keywords:
        author: Raju
        license: (ISC)
        type: (commonjs) module
        (yes)

    -server created
    -open project in vscode : you can see package.json only


✅✅Step-3 : Install Express js and create index file
    -go to : https://expressjs.com/
    -copy : npm install express
    -paste and run in the project terminal : node_modules will be created

    -now create a file named: index.js (where package.json has)
    -now type this manually (as we are using type=module,so it is little bit different from exress.com)
        
        import express from "express"
        const app = express();
        const port = process.env.port || 5000;

    -now copy this from express.com and paste under the above code:

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

    -now Run the server in the terminal 
    -type : node index.js
    -open in browser=> http://localhost:5000/

    -now you can create more route like this but before app.listen :
        app.get('/about', (req,res)=>{
            res.send("About Page");
        })
    -stop & run the server again
    -then go to : http://localhost:5000/about


✅✅Step-4 : install Nodemon for running auto-server
    -go to : https://www.npmjs.com/package/nodemon
    -copy : npm install -g nodemon 
    -paste in new terminal (no need to go project terminal , do it globally) like :
    -PS C:\Users\Raju4\Downloads\Programming Hero\Milestone-8-Backend-Node.js-and-Express.js> npm install -g nodemon 
    
    -now edit the code
    -run the server just once, no need to re-run
    -type : nodemon index.js
    -go to browser and see the output


✅✅Step-5 : Create a .gitignore file (before commit/push)
    -create a new file named : .gitignore (where the package.json has)
    -type : node_modules inside the file
    -now you can push


*/