import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";
import initializeDb from "./db";
import middleware from "./middleware";
import api from "./api";
import config from "./config.json";
import { seedDb } from "./models";
import gqlSchema from "./graphql/schema";

let app = express();

app.server = http.createServer(app);

// logger
app.use(morgan("dev"));

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

// connect to db
initializeDb(async db => {
  // internal middleware
  app.use(middleware({ config, db }));

  // api router
  app.use("/api", api({ config, db }));

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: gqlSchema,
      graphiql: true
    })
  );

  app.get("/favicon.ico", (req, res) => res.status(204)); // favicon error silencer
  seedDb();
  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`True Level, Morty on ${app.server.address().port}`);
  });
});

export default app;
