const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: Date,
    exercises: [
        {
            type: Schema.Types.ObjectId
        }
    ]
});

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;
