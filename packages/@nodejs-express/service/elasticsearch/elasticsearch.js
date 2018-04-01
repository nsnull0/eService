/* eslint valid-jsdoc: 0, require-jsdoc: 0 */
const elasticsearch = require("elasticsearch");
const { ELASTICSEARCH_URI } = process.env;
const { error } = console;

if (!ELASTICSEARCH_URI) {
  throw new Error("No Elasticsearch");
}

const elasticClient = new elasticsearch.Client({
  log: "info",
  host: ELASTICSEARCH_URI,
  requestTimeout: 1000 * 60 * 60,
  keepAlive: false
});

const indexName = "randomindex";

const deleteIndex = () => {
  return elasticClient.indices.delete({
    index: indexName
  });
};

const initIndex = () => {
  return elasticClient.indices.create({
    index: indexName
  });
};

const indexExists = () => {
  return elasticClient.indices.exists({
    index: indexName
  });
};

const initMapping = () => {
  return elasticClient.indices.putMapping({
    index: indexName,
    type: "document",
    body: {
      properties: {
        title: { type: "text" },
        content: { type: "text" },
        suggest: {
          type: "completion",
          analyzer: "simple",
          search_analyzer: "simple"
          // payloads: true
        }
      }
    }
  });
};

const addDocument = document => {
  return elasticClient.index({
    index: indexName,
    type: "document",
    body: {
      title: document.title,
      content: document.content,
      suggest: {
        input: document.title.split(" ")
        // output: document.title,
        // payload: document.metadata || {}
      }
    }
  });
};

const getSuggestions = query => {
  return elasticClient.msearch({
    index: indexName,
    type: "document",
    body: [
      {
        index: indexName,
        type: "document"
      },
      { query: { query_string: { query } } }
      // {
      //   docsuggest: {
      //     text: input,
      //     completion: {
      //       field: "suggest",
      //       fuzzy: true
      //     }
      //   }
      // }
    ]
  });
};

const init = () => {
  try {
    Promise.resolve(indexExists())
      .then(exists => {
        return exists ? deleteIndex() : null;
      })
      .then(() => {
        return Promise.resolve(initIndex())
          .then(initMapping)
          .then(() => {
            // Add a few titles for the autocomplete
            // elasticsearch offers a bulk functionality as well, but this is for a different time
            const promises = [
              "Thing Explainer",
              "The Internet Is a Playground",
              "The Pragmatic Programmer",
              "The Hitchhikers Guide to the Galaxy",
              "Trial of the Clone"
            ].map(bookTitle => {
              return addDocument({
                title: bookTitle,
                content: `${bookTitle} content`,
                metadata: {
                  titleLength: bookTitle.length
                }
              });
            });

            return Promise.all(promises);
          })
          .catch(e => {
            error(e);
          });
      });
  } catch (e) {
    setTimeout(init, 1000);
  }
};

module.exports = (app, { Router }) => {
  return new Router()
    .get("/", (req, res, next) => {
      init();
      next();
    })
    .get("/suggest/:input", (req, res, next) => {
      getSuggestions(req.params.input).then(result => {
        res.json(result);
        next();
      });
    })
    .post("/", (req, res, next) => {
      addDocument(req.body).then(result => {
        res.json(result);
        next();
      });
    });
};
