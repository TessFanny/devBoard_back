const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
require('dotenv').config()
const pool = require('./dbClient')
// Set up the standard authentication strategy (using email and password)
// ...

// Set up the GitHub authentication strategy
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Save the user's data to the database
      const client = await pool.connect();
      const user = {
        username: profile.username,
        email: profile.emails[0].value,
        image_path: profile.photos[0].value,
      };
      const result = await client.query({
        text: `
          INSERT INTO "user" (username, name, email, image_path)
          VALUES ($1, $2, $3)
          ON CONFLICT (username) DO UPDATE
          SET email = EXCLUDED.email, image_path = EXCLUDED.avatar_url
          RETURNING *
        `,
        values: [user.username, user.email, user.avatar_url],
      });
      client.release();
      done(null, result.rows[0]);
    } catch (error) {
      done(error);
    }
  }));

 
  
  // Set up the Express app
  const app = express();
  
  // Set up the Passport middleware for both standard and GitHub authentication
  app.use(passport.initialize());
  app.use(passport.session());