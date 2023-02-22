const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const {userRouter, authRouter, githubRouter}  = require("./app/router")
const expressJSDocSwagger = require('express-jsdoc-swagger');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fileURLTopath = require ('url');


// SERVER CONFIGURATION //

const app = express();

// server initialization

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// const filename = fileURLToPath(import.meta.url);
// const _DirectoryName = path.dirname(filename);

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

// save HTTP request logging information// of the application in the "common" logging format.

app.use(morgan("common"));

// allows the application to handle encoded JSON and URL data 

app.use(bodyParser.json({limit:"50mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"50mb", extended:true}));

//  allows serving static files within a particular route

// app.use("/assets", express.static(path.join(_DirectoryName, 'public/assets')));

// allow Multer to store uploaded files in the "public/assets" folder on the server keeping their original name.

// const storage = multer.diskStorage({
//     destination: function(req, file, cb ){
//         cb (null, "public/assets");
//     },
//     filename: function(req, file , cb ){
//         cb (null, file.originalname);
//     }
// });

// const upload = multer({storage});

// REDIRECTION ROUTER 

app.use(userRouter);
app.use(authRouter);
app.use(githubRouter);
//app.use(postRouter);
 //app.use(rssRouter);

const port = process.env.PORT || 3000;


// SWAGGER CONFIG //

const options = {
    info: {
        version: '1.0.0',
        title: 'Oblog',
        license: {
            name: 'MIT',
        },
    },
    // Chemin de la doc
    swaggerUIPath: '/devboard',
    security: {
        BasicAuth: {
            type: 'http',
            scheme: 'basic',
        },
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.js',
};

expressJSDocSwagger(app)(options);

app.listen(port, () => {
    console.log(`Server ready:  http://localhost:${port}`);

});