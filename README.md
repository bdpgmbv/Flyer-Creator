#### Step 1: Basic Requirements for the Application

app.js 
* Used for initial import of express, body-parser, express-session, express-handlebars
```
const express = require("express");
const bodyParser = require("body-parser");
const app = express(); // Creates an Express application. 
const session = require("express-session");
const exphbs = require("express-handlebars");
```
* Including the "public" directory in the project that includes CSS,JS,IMAGES files
```
app.use("/public", express.static(__dirname + "/public"));
```
* Including the "routes" directory
```
const configRoutes = require("./routes"); // imports "/Users/vyshaliprabananthlal/Documents/CS 546/Flyer Creator/routes/index"
```
* Including the main handlebar - Front-End 
```
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
```
* Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
```
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
```
* Creates a super simple Express app which shows the basic way to register a Handlebars view engine using this package.
```
app.set("view engine", "handlebars");
```
* Configuring session
```
app.use(session({
    name: 'AuthCookie',
    secret: 'This is a random string to create session',
    resave: false,
    saveUninitialized: true
}));
```
* Application run
```
configRoutes(app);
app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000");
});
```

#### Step 2: Add the below script in package.json in "scripts" Object
```
"start": "node app.js"
```

#### Step 3: MONGO DB Connection & Collections
* Created a folder "data" - holds all the operations/files that interact with Mongo
* settings.json : define the Database Name and the URL to the Mongo 
```
{
  "mongoConfig": {
    "serverUrl": "mongodb://localhost:27017/",
    "database": "Flyer_Creator_CS546"
  }
}
```
* mongoConnection.js: helper file to connect to Mongo DB
* mongoCollections.js: file to setup the collections we need in DB. We specify the collection names we are going to use like 
```
module.exports = {
    users: getCollectionFn("users"),
    userFlyers: getCollectionFn("userFlyers"),
    templateFlyers: getCollectionFn("templateFlyers")
};
```
* Below files in the "data" implements operations we can perform on DB on each collection 
    * users.js - getAll, get, getByEmailAndPass, getByEmail, remove, addFlyer, removeFlyer, create
    * userFlyers.js -  getAll, get, updateElement, create, remove
    * templateFlyers.js - getAll, get, create, remove
* index.js - Everytime the compiler looks at the index.js of every folder, so we bring up all the Operational files in index.js in a way to nominate its existence
```
const usersData = require("./users");
const userFlyersData = require("./userFlyers");
const templateFlyersData = require("./templateFlyers");

module.export = {
    users: usersData,
    userFlyers: userFlyersData,
    templateFlyers: templateFlyersData
};
```
#### Step 4: API 
index.js
* The app opens with the Login Handlebar, allowing the user to enter the login details.
* If it is a **valid login** (existing user exist in DB), We set up a **Session Cookie** with all details of the User. 
* If it is **not a valid login**, user navigates back to login page with errors
* If any **field data is missing for login**, user navigates back to login page with errors
* Handling all the Navigations of the App in index.js. Navigations Handled are:
    1. If Session authorization is true - let the user navigate to flyers page
    2. If Session authorization is true - let the user navigate to private page 
* Render the Error handlebar for any other url requests, expect the ones defined 


Steps to start the project:

* Create a folder, Open the folder in Visual studio code, Open the terminal at the folder and do "git init"
* Now install the required packages you need 
    * npm install bcrypt
    * npm install bcryptjs
    * npm install body-parser
    * npm install express --save
    * npm install express-handlebars
    * npm install express-session
    * npm install jquery
    * npm install mongodb --save
    * npm install node-uuid 
