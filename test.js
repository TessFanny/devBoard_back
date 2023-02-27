const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://user:password@localhost/database'
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  pool.query('SELECT * FROM "user" WHERE username = $1', [profile.username], (error, results) => {
    if (error) {
      console.error('Error querying the database', error);
      return done(error);
    }

    if (results.rowCount > 0) {
      // user already exists in the database
      const user = results.rows[0];
      user.password = accessToken;

      pool.query('UPDATE "user "SET password = $1 WHERE id = $2', [accessToken, user.id], (error, results) => {
        if (error) {
          console.error('Error updating user in the database', error);
          return done(error);
        }

        done(null, user);
      });
    } else {
      // user doesn't exist in the database
      const user = {
        username: profile.username,
        password: accessToken,
        email: "tess@oclock.fr",
        image_path: profile.photos[0].value
      
      };

      pool.query(`INSERT INTO "user" (username, password ,email, image_path)
      VALUES ($1, $2, $3, $4)           
      RETURNING *`, [user.username, user.password,  user.email, user.image_path], (error, results) => {
        if (error) {
          console.error('Error inserting user into the database', error);
          return done(error);
        }

        user.id = results.rows[0].id;
        done(null, user);
      });
    }
  });
}));
// In the example above, we're using the pg package to connect to the PostgreSQL database. You'll need to replace 
// the connection string with the appropriate values for your database.

// The GitHubStrategy constructor's callback function is passed an accessToken, refreshToken, and profile object. The profile object contains the user's GitHub profile information. We're using the pool.query method to run a SQL query against the users table to see if the user already exists in the database. If the user already exists, we're updating the github_access_token column with the new access token. If the user doesn't exist, we're inserting a new row into the users table with the user's GitHub information. The done function is called with the user object, which is then serialized and stored in the session.

// Note that this is just a basic example, and you may want to customize the SQL queries to better fit your needs. Additionally, you should take appropriate security measures to prevent SQL injection attacks.



passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
  
  
          // Save the user's data to the database
          const client = await pool.connect();
  
          console.log(profile);
          console.log(accessToken );
  
  
          
          const user = {
            username: profile.username,
            password: accessToken,
            email: "tess@oclock.fr",
            image_path: profile.photos[0].value
          
          };
          const result = await client.query({
            text: `
             INSERT INTO "user" (username, password ,email, image_path)
             VALUES ($1, $2, $3, $4)           
             RETURNING *
           `,
            values: [user.username, user.password,  user.email, user.image_path],
          });
          client.release();
          done(null, result.rows[0]);
        } catch (error) {
          done(error);
        }
      }
    )
  );
