const mongoose = require("mongoose");
const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    favoriteFoods: {
      type: [String],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Person", personSchema);
