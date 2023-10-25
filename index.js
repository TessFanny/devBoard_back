const cors = require("cors");
const express = require("express");
const {
  userRouter,
  authRouter,
  postRouter,
  feedRouter,
  skillRouter,
  githubRouter,
} = require("./app/router");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");


// server initialization

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// app.use(cors({
//   origin: ['http://localhost:8080'],
//   credentials: true
// }));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   //res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use(cors({
  origin: ['https://devboardtess.netlify.app'],
  credentials: true
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://devboardtess.netlify.app');
 // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



// SWAGGER
const expressJSDocSwagger = require("express-jsdoc-swagger");
const { arrayParser } = require("pg-types");

const options = {
  info: {
    version: "1.0.0",
    title: "Devboard",
    description: "My API with Swagger documentation",
    license: {
      name: "MIT",
    },
  },
 
  security: {
    TokenAuth : {
      type: 'http',
      scheme: 'bearer'
    }
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.js",
};

expressJSDocSwagger(app)(options);

// REDIRECTION ROUTER

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", postRouter);
app.use("/api", feedRouter);
app.use("/api", skillRouter);
app.use("/api", githubRouter);

module.exports = app
app.listen(port, () => {
  console.log(`Server ready:  http://localhost:${port}`);
});
