
// import cors from "cors";
// import dotenv from "dotenv";
// import multer from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";

// SERVER CONFIGURATION

// server initialization
const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');

require('dotenv').config();
const app = express();



// get file name
//const filename = fileURLToPath(import.meta.url);
// get directory
// const _DirectoryName = path.dirname(filename);

// // 
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

// app.use(express.json());

// // save HTTP request logging information// of the application in the "common" logging format.

// app.use(morgan("common"));

// // allows the application to handle encoded JSON and URL data 
// app.use(bodyParser.json({limit:"50mb", extended:true}));
// app.use(bodyParser.urlencoded({limit:"50mb", extended:true}));

// // allows cross-origin HTTP requests, i.e. requests coming from a domain different from that of the application.
// app.use(cors());

// // allows serving static files within a particular route

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

//const upload = multer({storage});

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

// REDIRECTION ROUTER 
const {userRouter, authRouter, postRouter, rssRouter}  = require("./app/router")
app.use(userRouter);
//app.use(postRouter);
 //app.use(rssRouter);
//app.use(authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server ready:  http://localhost:${port}`);

});