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