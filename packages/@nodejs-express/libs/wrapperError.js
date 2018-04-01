exports = (err, req, res, next) => {
  const { message, code = 500 } = err;
  const stack = process.env.NODE_ENV === "production" ? () => {} : err.stack;
  const time = new Intl.DateTimeFormat(["en"], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timezone: "Asia/Jakarta",
    timeZoneName: "short"
  }).format(new Date());

  res.status(code).json({ message, time, stack });

  return next;
};
module.exports = exports;
