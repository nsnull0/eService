module.exports = (app, { Router }) => {
  return new Router().get("/", (req, res) => {
    res.json({ path: "rest" });
  });
};
