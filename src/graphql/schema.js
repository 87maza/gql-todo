import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList
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
  name: "TodosQuery",
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

export default new GraphQLSchema({
  query: RootQuery
});
