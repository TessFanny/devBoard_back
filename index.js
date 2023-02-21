const passport = require('passport');
const util = require('util');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const {userRouter, authRouter}  = require("./app/router")
const GitHubStrategy = require('passport-github2').Strategy;
const expressJSDocSwagger = require('express-jsdoc-swagger');

// SERVER CONFIGURATION //

const app = express();

// server initialization

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ 
    secret: process.env.SECRET_SESSION, 
    resave: false, 
    saveUninitialized: false, 
    cookie:{
    httpOnly:true,
    secure:false,
    maxAge:24 * 60 * 60 *1000 
} }));

app.use(express.json());
app.use(cors());


// REDIRECTION ROUTER 

app.use(userRouter);
app.use(authRouter);
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

// Oauth with PasseportJS CONFIG //

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
    });

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        done(null,profile)
        // User.findOneByGithubId({
        //     'github.id': profile.id
        // }, (err, user) => {
        //     if (err) {
        //     return done(err);
        //     }
        //     if (!user) {
        //     user = new User({
        //         name: profile.displayName,
        //         username: profile.username,
        //         provider: 'github',
        //         github: profile._json
        //     });
        //     console.log(user)
        //     //   user.save(() => done(err, user));
        //     } else {
        //     return done(err, user);
        //     }
        //     });
    }
));
const isAuth = (req, res , next)=> {
    if (req.user){
        next();
    }else {
        res.redirect('/login')
    }
}
app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
    });
app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

app.listen(port, () => {
    console.log(`Server ready:  http://localhost:${port}`);

});