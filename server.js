const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const db = require("./models");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose connection
mongoose.Promise = global.Promise

mongoose.connect
mongoose.connect(process.env.MONGODB_URI || "mongodb://workoutTracker:workout1@ds135810.mlab.com:35810/heroku_kjf9z8b5", { useNewUrlParser: true });

// html routes 
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../Workout-tracker/public/stats.html"));

})

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../Workout-tracker/public/exercise.html"));
});


//Post function for posting workout 
app.post("/api/workouts", (req, res) => {
    console.log(req.body)
    // db.Workout.insert(req.body, function (err, data) {
    //     if (err)
    //         throw err;

    //     res.send(data)
    // })

})



// get function fo one workout 
app.get("/api/workouts", (req, res) => {
    db.Exercise.findOne({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data)
        }
    })
})

app.get("/api/workouts/range", (req, res) => {
    db.Exercise.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data)
        }
    })
})


//starts server
app.listen(PORT, () => {
    console.log("App running on port" + PORT+" !");
});
