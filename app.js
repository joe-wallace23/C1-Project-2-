//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
// Cookies and sessions area
const session = require("express-session");
const passport= require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
//const { Passport, authenticate } = require("passport");

//End  Cookies and sessions area

//Start Level 6-  OAuth 2.0 & How to Implement Sign with Google
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");
//End Level 6-  OAuth 2.0 & How to Implement Sign with Google






const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// Cookies and sessions area

app.use(session({
    secret:"Our Litte BCC secret",
    resave:false,
    saveUninitialized:false  
  }));
//End  Cookies and sessions area
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://JoeyWallace:23199737AC@bcc.7x5uw.mongodb.net/gamesDB",{useNewUrlParser: true});

//Cookies and sessions area
mongoose.set("useCreateIndex",true);
//Cookies and sessions area





// Register user with Username and password
const userSchema= new mongoose.Schema({
    email:String,
    password: String,
    //Start Level 6-  OAuth 2.0 & How to Implement Sign with Google
    googleId:String,
    //End Level 6-  OAuth 2.0 & How to Implement Sign with Google
    facebookId:String,
  // Start Letting Users Submit Secrets

  // End Letting Users Submit Secrets
  
  });



  


 
    

//Cookies and sessions area
userSchema.plugin(passportLocalMongoose);
//End Cookies and sessions area

//

//



//Start Level 6-  OAuth 2.0 & How to Implement Sign with Google
userSchema.plugin(findOrCreate);
//End Level 6-  OAuth 2.0 & How to Implement Sign with Google




const User= new mongoose.model("User", userSchema);


passport.use(User.createStrategy());




//Start Level 6-  OAuth 2.0 & How to Implement Sign with Google

passport.serializeUser(function(user, done){
    done(null,user.id);
  });
  
  passport.deserializeUser(function(id, done){
   User.findById(id, function(err,user){
     done(err, user);
   });
  });

  passport.serializeUser(function(user, done){
    done(null,user.id);
  });
  
  //End Level 6-  OAuth 2.0 & How to Implement Sign with Google



  





  //Start Level 6-  OAuth 2.0 & How to Implement Sign with Google
passport.use(new GoogleStrategy({
    clientID: '73934209206-i3jn39891fq6l40fvocommr45vqm5mcr.apps.googleusercontent.com', 
    clientSecret: 'CJj58WNlrUvJMD0qAwcjOl5d' ,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
//End Level 6-  OAuth 2.0 & How to Implement Sign with Google



//Start Level 6-  OAuth 2.0 & How to Implement Sign with Google
app.get("/auth/google",
passport.authenticate("google", {scope: ["profile"]})
);
app.get("/auth/google/secrets",

passport.authenticate("google", {failureRedirect: "/register"}),
function(req, res){
  // Successful authentication, redirect to secrets
  res.redirect("/secrets");
}
);

//End Level 6-  OAuth 2.0 & How to Implement Sign with Google


// This is for only login with out google or facebook

// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(user, done) {
//     done(null, user);
//   });

// This is for only login with out google or facebook


///



///



///
app.get("/sign", function(req,res){
    res.render("sign");
  });

  app.get("/register", function(req,res){
    res.render("register");
  });

  app.get("/secrets", function(req,res){
    if(req.isAuthenticated()){
        res.render("secrets");
    }else{
        res.redirect("/sign")
    }
});



app.post("/register", function(req,res){
    User.register({username:req.body.username}, req.body.password,function(err){
        if(err){
            console.log(err);
            res.redirect("/register")
        }else{
          passport.authenticate("local")(req,res, function(){
            res.redirect("/secrets");
          });
        }
    });
    //End cookies  amd session?
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/home")
});


app.get("/submit",function (req,res){
    if (req.isAuthenticated()){
      res.render("submit");
    }else {
      res.redirect("/login");
    }
  });






     app.post("/sign", function(req, res, next){
        const user = new User ({
          username: req.body.username,
          password: req.body.password


        });

     passport.authenticate('local',  function(err, user, info){
        if (err){
          return next(err);
        } if (!user){
          
            res.redirect("/register")


        }
        req.login(user, function(err){
          if (err){
            return res.status(500).json({
              err: "Could not log in user"
            });
          }
          res.redirect("/secrets")
          // res.status(200).json({
          //   status: "login successful"
          // });
        });
      })(req, res, next);
    });

//    // req.login(game, function(err) {

//      //  if(err){
//       //   console.log(err)
//         }else {

//              passport.authenticate("local");
//              res.redirect("/secrets");
//          }
        
//      });
  // });


//end Register user with Username and password

app.get("/home", function(req,res){
    res.render("home")
});
app.get("/news", function(req,res){
    res.render("news")
});
app.get("/sport", function(req,res){
    res.render("sport")
});

app.get("/contact", function(req,res){
    res.render("contact")
});




app.listen(process.env.PORT || 5000,function(){
    console.log("Server has started Successfully");
 });




