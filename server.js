const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");

const app = express();
app.use(logger("dev"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workout";
const collections = ["exercises"];

const db = mongojs(databaseUrl, collections);


// html routes 

app.get("/stats", (req, res) => {
    res.send(stats.html);

})

app.get("/exercise", (req, res) => {
    res.send(exercise.html);
});


//Post function for posting workout 
// app.post("/api/workouts", (req, res) => {
//     db.notes.insert(req.body, function (err, data) {
//         if (err)
//             throw err;

//         res.send(data)
//     })

// })



//get function fo one workout 
// app.get("/api/workouts", (req, res) => {
//     db.exercises.findOne({}, function (err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(data)
//         }
//     })
// })







app.listen(3000, () => {
    console.log("App running on port 3000!");
});
