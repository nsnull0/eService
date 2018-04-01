/**
 * JWT related
 * @namespace jwt
 */

const jwt = require("jsonwebtoken");
const error = require("libs/error");
const { valueOf } = require("libs/utils");
const JWT_SECRET = process.env.JWT_SECRET || "5up3r_53cr37";

/**
 * Create a JSON Web Token from User & Auxiliary Data
 * @memberof jwt
 * @method
 * @name jwtSign
 * @param {String} user User Data
 * @param {String} aux Auxiliary Data
 * @returns {String} JSON Web Token
 */
const jwtSign = ({ _id, email, profile }, { platform }) => {
  try {
    const token = jwt.sign(
      {
        _id,
        email: valueOf(email),
        profile: valueOf({
          fb_id: profile.fb_id,
          google_id: profile.google_id
        }),
        platform
      },
      JWT_SECRET,
      {
        expiresIn: "7d"
        // algorithm (default: HS256)
        // expiresIn: expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
        // notBefore: expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
        // audience
        // issuer
        // jwtid
        // subject
        // noTimestamp
        // header
        // keyid
      }
    );

    return token;
  } catch (message) {
    throw error.builder({ code: 401, message });
  }
};

/**
 * Decode JSON Web Token to a JWT payload
 * @memberof jwt
 * @method
 * @name jwtVerify
 * @param {String} token JSON Web Token
 * @returns {Object} JSON Web Token Payload
 */
const jwtVerify = token => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      // algorithms: List of strings with the names of the allowed algorithms. For instance, ["HS256", "HS384"].
      //
      // audience: if you want to check audience (aud), provide a value here. The audience can be checked against
      //      a string, a regular expression or a list of strings and/or regular expressions.
      //      Eg: "urn:foo", /urn:f[o]{2}/, [/urn:f[o]{2}/, "urn:bar"]
      //
      // issuer (optional): string or array of strings of valid values for the iss field.
      //
      // ignoreExpiration: if true do not validate the expiration of the token.
      //
      // ignoreNotBefore...
      //
      // subject: if you want to check subject (sub), provide a value here
      //
      // clockTolerance: number of seconds to tolerate when checking the nbf and exp claims, to deal with small
      //      clock differences among different servers
      //
      // maxAge: the maximum allowed age for tokens to still be valid.
      //      It is expressed in seconds or a string describing a time span zeit/ms.
      //      Eg: 1000, "2 days", "10h", "7d".
      //
      // clockTimestamp: time in seconds that should be used as the current time for all necessary comparisons.
    });
  } catch (message) {
    throw error.builder({ code: 401, message });
  }
};

/**
 * Middleware to inject req.user from token
 * @memberof jwt
 * @method
 * @name reqUserFromToken
 * @param {*} req req
 * @param {*} res res
 * @param {*} next next
 * @returns {Function} express middleware
 */
const reqUserFromToken = (req, res, next) => {
  try {
    const token = req.headers.authorization || req.headers.Authorization;

    const userDetail = jwtVerify(token);

    req.user = userDetail.data;

    return next();
  } catch (message) {
    return next(error.builder({ code: 401, message }));
  }
};

module.exports = {
  jwtSign,
  jwtVerify,
  reqUserFromToken
};
