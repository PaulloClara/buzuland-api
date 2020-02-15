require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");

const resolvers = require("./resolvers");
const typeDefs = require("./schemas/graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: context => ({ request: context.req, response: context.res })
});

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
  const { url } = await server.listen();

  console.log(`\n\tRunning on ${url}\n`);
}

if (checkEnvVars()) run();
