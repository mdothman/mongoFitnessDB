const mongoose = require("mongoose");
const _ = require("lodash");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: Date,
    exercises: [
      {
        type: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        distance: {
          type: Number,
          required: function () {
            return this.type === "cardio";
          },
        },
        duration: Number,
        weight: Number,
        sets: Number,
        reps: Number,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, duration) => {
    return total + duration;
  });
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
