import mongoose from "mongoose";
import todoSchema from "./models/index";

import { Todo } from "./models/index";

var todosample = new Todo({
  id: mongoose.Types.ObjectId(),
  title: "Title 1",
  body: "Body 1",
  complete: false
});

export const SEED_TODOS = [
  new Todo({
    title: "Title 1",
    body: "Body 1",
    complete: false
  }),
  new Todo({
    title: "Title 2",
    body: "Body 2",
    complete: false
  }),
  new Todo({
    title: "Title 3",
    body: "Body 3",
    complete: false
  }),
  new Todo({
    title: "Title 4",
    body: "Body 4",
    complete: false
  }),
  new Todo({
    title: "Title 5",
    body: "Body 5",
    complete: false
  })
];
