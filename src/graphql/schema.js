import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from "graphql";
import { Todo } from "../models";

const TodoGQLModel = new GraphQLObjectType({
  name: "Todo",
  description: "list of things todo",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    complete: { type: GraphQLBoolean },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLInt } // comes in as an epoch string look into /graphql-iso-date
  })
});
const RootQuery = new GraphQLObjectType({
  name: "todosQueries",
  fields: {
    todos: {
      type: new GraphQLList(TodoGQLModel),
      args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString }
      },
      resolve: (_, { id, title }) => {
        let where;
        if (id) {
          where = { id };
        } else if (title) {
          where = { title };
        } else {
          where = {};
        }
        return Todo.find(where);
      }
    }
  }
});
const RootMutation = new GraphQLObjectType({
  name: "todosMutations",
  fields: {
    create: {
      type: TodoGQLModel,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
        complete: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve: (_, { title, body, complete }) => {
        let todo = new Todo({ title, body, complete });
        return todo.save();
      }
    },
    deleteTodoById: {
      type: TodoGQLModel,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (_, { id }) => {
        return Todo.findOneAndRemove(id);
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
