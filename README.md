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

settings.json 
```
{
  "mongoConfig": {
    "serverUrl": "mongodb://localhost:27017/",
    "database": "Flyer_Creator_CS546"
  }
}
```
