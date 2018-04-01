const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const schema = buildSchema(require("./schemas"));
const rootValue = require("./resolvers");

module.exports = (app, { Router }) =>
  new Router().use(
    "/",
    graphqlHTTP(({ startTime, headers, params, body, query }) => ({
      schema,
      rootValue,
      graphiql: true,
      context: Object.assign({}, headers, params, body, query),
      extensions: () => ({
        time: Date.now() - startTime
      }),
      formatError: ({ message, locations, stack, path }) => ({
        message,
        locations,
        stack: stack ? stack.split("\n") : [],
        path
      })
    }))
  );

// const proxy = require("http-proxy-middleware");
// const {
//   AUTH_SERVICE,
//   ADSTRACKER_SERVICE,
//   S3_SERVICE,
//   VERIFICATION_SERVICE
// } = process.env;
// const changeOrigin = true;

// .get("/auth/facebook/start", proxy(`${AUTH_SERVICE}`))
// .get("/auth/facebook/redirect", proxy(`${AUTH_SERVICE}`))
// .get("/auth/google/start", proxy(`${AUTH_SERVICE}`))
// .get("/auth/google/redirect", proxy(`${AUTH_SERVICE}`))
// .post("/upload", proxy(`${VERIFICATION_SERVICE}`))
// .get(
//   "/track/**",
//   proxy({
//     changeOrigin,
//     target: `${ADSTRACKER_SERVICE}`,
//     pathRewrite: { "^/track": "/microsites/detail" }
//   })
// )
// .get(
//   "/sdk/**",
//   proxy({
//     changeOrigin,
//     target: `${S3_SERVICE}`,
//     pathRewrite: { "^/sdk": "/pomona2-stage-sdk" }
//   })
// );
