const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Person = require("./models/person.js");
const port = 3000;
const dbURI =
  "mongodb+srv://Amir2022:Eniso2022*@cluster0.tqr0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/addOnePerson", (req, res) => {
  const person = new Person({
    name: "mohamed",
    age: 22,
    favoriteFoods: ["pasta", "soupe"],
  });
  person
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
const array = [
  {
    name: "amir",
    age: 23,
    favoriteFoods: ["riz", "pasta", "viande"],
  },
  {
    name: "oussama",
    age: 24,
    favoriteFoods: ["salade", "poulet", "baguette farcie"],
  },
  { name: "yahya", age: 22, favoriteFoods: ["koskssi", "poulet"] },
  { name: "akram", age: 18, favoriteFoods: ["koskssi", "Pizza", "poulet"] },
];
app.get("/addManyPeople", (req, res) => {
  Person.create(array)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/displayAll", (req, res) => {
  Person.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/displayPerson/:name", (req, res) => {
  Person.find({ name: req.params.name })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/foods/:food", (req, res) => {
  Person.findOne({ favoriteFoods: req.params.food })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/person/:id", (req, res) => {
  Person.findById({ _id: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/addfoods/:id", (req, res) => {
  Person.findById({ _id: req.params.id })
    .then((data) => {
      data.favoriteFoods.push("makloub");
      data.save();
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/updates", (req, res) => {
  Person.findOneAndUpdate({ name: "oussama" }, { age: "22" }, { new: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/removePerson", (req, res) => {
  Person.findOneAndRemove({ name: "oussama" })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/removePerson/:name", (req, res) => {
  Person.findOne({ name: req.params.name })
    .remove()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/foods-poulet", function (req, res) {
  Person.find({ favoriteFoods: "poulet" }) // Find people who like burritos
    .limit(2)
    .sort({ name: 1 })
    .select({ name: true, favoriteFoods: true })
    .exec()
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

app.listen(port, (err, data) => {
  if (err) throw err;
  else console.log("the server is runnig at port" + port);
});
