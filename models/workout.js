//Requiring mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Workout model with exercise sub model
const WorkoutSchema = new Schema({
    day: {
        default: new Date().setDate(new Date().getDate())
        ,
        type: Date
    },
    exercises: [
        {
            type: {
                type: String,
                required: true
            },

            name: {
                type: String,
                required: true
            },

            duration: {
                type: Number,
                required: true
            },

            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number
        }
    ]
});


const Workout = mongoose.model("workout", WorkoutSchema);

//Exporting workout
module.exports = Workout;
