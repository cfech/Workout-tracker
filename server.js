//Requires
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const db = require("./models");

const app = express();

//Dynamic Port
const PORT = process.env.PORT || 3000;

//Using logger 
app.use(logger("dev"));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// mongoose connection
mongoose.Promise = global.Promise


mongoose.connect(process.env.MONGODB_URI || "mongodb://workoutTracker:workout1@ds135810.mlab.com:35810/heroku_kjf9z8b5", { useNewUrlParser: true });

// html routes 
//Routes for stats html
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
})

//Routes for exercise html
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});


//Post for creating workout
app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body, function (err, data) {
        if (err)
            throw err;

        res.send(data)
    })

})

//Put for updating workout with exercises
app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $set: { exercises: req.body } }, function (err, data) {
        if (err)
            throw err;

        res.send(data)
    })

})


// Get function for one workout on index.html
app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data)
        }
    })
})

// Get route for stats page 
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(exercise => {
            res.json(exercise);
        })
        .catch(err => {
            res.json(err);
        });
});

//starts server
app.listen(PORT, () => {
    console.log("App running on port " + PORT + "!");
});
