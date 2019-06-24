import mongoose from "mongoose";

export default async callback => {
  const db = await mongoose.connect("mongodb://localhost:27017/gql-todo", {
    useNewUrlParser: true
  });
  callback(db);
};
