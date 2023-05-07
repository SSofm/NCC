const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

// load schema and resolver
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

// load db method
const mongoDataMethods = require("./data/db");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/graphql_tutorial");
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
};
connectDB();
const app = express();

let server = null;
async function startServer() {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({mongoDataMethods})
  });
  await server.start();
  server.applyMiddleware({ app });
}
startServer();

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
