import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }
});

export const Todo = mongoose.model("todos", todoSchema);

var todosArr = [
  {
    title: "Title 1",
    body: "Body 1",
    complete: false
  },
  {
    title: "Title 2",
    body: "Body 2",
    complete: false
  },
  {
    title: "Title 3",
    body: "Body 3",
    complete: false
  }
];

export const seedDb = async () => {
  await mongoose.connection.db
    .collection("todos")
    .countDocuments((err, count) => {
      if (count === 0) {
        Todo.insertMany(todosArr);
      }
    });

  console.log("already documents in collection");
  // mongoose.connection.db.collection("todos").remove({}, err => {
  //   if (err) console.log(err);
  //   else {
  //     Todo.collection.dropIndexes(function(err, results) {
  //       // Handle errors
  //       if (err) console.log(err);
  //       else {
  //         console.log("deleted indexes", results);
  //       }
  //     });
  //   }
  // });
  return;
};
