// import cors from "cors";
// import dotenv from "dotenv";
// import multer from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
const cors = require("cors");
const {
  userRouter,
  authRouter,
  postRouter,
  rssRouter,
} = require("./app/router");

// SERVER CONFIGURATION

// server initialization
const express = require("express");
const expressJSDocSwagger = require("express-jsdoc-swagger");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

// get file name
//const filename = fileURLToPath(import.meta.url);
// get directory
// const _DirectoryName = path.dirname(filename);

// //
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

// // save HTTP request logging information// of the application in the "common" logging format.

// app.use(morgan("common"));

// // allows the application to handle encoded JSON and URL data
// app.use(bodyParser.json({limit:"50mb", extended:true}));
// app.use(bodyParser.urlencoded({limit:"50mb", extended:true}));

// // allows cross-origin HTTP requests, i.e. requests coming from a domain different from that of the application.

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

// REDIRECTION ROUTER

app.use(userRouter);
app.use(authRouter);
app.use(postRouter);
app.use(rssRouter);

const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
require("dotenv").config();
const pool = require("./app/services/dbClient");
// Set up the standard authentication strategy (using email and password)
// ...

// Set up the GitHub authentication strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      pool.query(
        'SELECT * FROM "user" WHERE username = $1',
        [profile.username],
        (error, results) => {
          if (error) {
            console.error("Error querying the database", error);
            return done(error);
          }

          if (results.rowCount > 0) {
            // user already exists in the database
            const user = results.rows[0];
            user.password = accessToken;

            pool.query(
              'UPDATE "user" SET password = $1 WHERE id = $2',
              [accessToken, user.id],
              (error, results) => {
                if (error) {
                  console.error("Error updating user in the database", error);
                  return done(error);
                }

                done(null, user);
              }
            );
          } else {
            // user doesn't exist in the database
            const user = {
              username: profile.username,
              password: accessToken,
              email: "tess@oclock.fr",
              image_path: profile.photos[0].value,
            };

            pool.query(
              `INSERT INTO "user" (username, password ,email, image_path)
      VALUES ($1, $2, $3, $4)           
      RETURNING *`,
              [user.username, user.password, user.email, user.image_path],
              (error, results) => {
                if (error) {
                  console.error(
                    "Error inserting user into the database",
                    error
                  );
                  return done(error);
                }

                user.id = results.rows[0].id;
                done(null, user);
              }
            );
          }
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

// Set up the Passport middleware for both standard and GitHub authentication
const session = require("express-session");
const verifyToken = require("./app/middleware/auth");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});
app.get("/github/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/logout", (req, res) => {
  req.logOut(() => {
    res.redirect("/github/login");
  });
});

app.get("/auth/github", passport.authenticate("github"), (req, res) => {});

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/page/login" }),
  function (req, res) {
    res.redirect("/");
    //res.json({ message:'user successfully authenticated'})
  }
);
// SWAGGER

const options = {
  info: {
    version: "1.0.0",
    title: "Oblog",
    license: {
      name: "MIT",
    },
  },
  // Chemin de la doc
  swaggerUIPath: "/devboard",
  security: {
    BasicAuth: {
      type: "http",
      scheme: "basic",
    },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.js",
};

expressJSDocSwagger(app)(options);

app.listen(port, () => {
  console.log(`Server ready:  http://localhost:${port}`);
});
