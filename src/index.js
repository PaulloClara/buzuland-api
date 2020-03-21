require("dotenv").config();

const { ApolloServer, makeExecutableSchema } = require("apollo-server");

const resolvers = require("./resolvers");
const typeDefs = require("./schemas/graphql");

const schema = require("./middleware").config(
  makeExecutableSchema({ typeDefs, resolvers })
);

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  cors: { origin: "*" },
  context: context => ({ request: context.req, response: context.res })
});

const serverOpts = {
  port: process.env.PORT || 4000
};

function checkEnvVars() {
  if (
    process.env.INTHEGRA_URL &&
    process.env.API_KEY &&
    process.env.EMAIL &&
    process.env.PASSWORD
  )
    return true;

  console.log("\n\tConfigure the .env file!\n\tExample in .env_example\n");

  return false;
}

async function run() {
  const { url } = await server.listen(serverOpts);

  console.log(`\n\tRunning on ${url}\n`);
}

if (checkEnvVars()) run();
