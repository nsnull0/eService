/**
 * Error related
 * @namespace error
 */

/**
 * basic error builder
 * @memberof error
 * @method
 * @name builder
 * @param {String} data.message message
 * @param {Number} data.code code
 * @param {Error} data.error error
 * @returns {Error} error
 */
const builder = ({ message, code, error = Error(message) }) =>
  (error.code = code) && error;

exports = {
  builder,

  /**
   * @memberof error
   * @constant
   * @name 400 => BAD_REQUEST
   */
  BAD_REQUEST: builder({
    code: 400,
    message: "Bad Request"
  }),

  /**
   * @memberof error
   * @constant
   * @name 401 => UNAUTHORIZED
   */
  UNAUTHORIZED: builder({
    code: 401,
    message: "Unauthorized"
  }),

  /**
   * @memberof error
   * @constant
   * @name 402 => PAYMENT_REQUIRED
   */
  PAYMENT_REQUIRED: builder({
    code: 402,
    message: "Payment Required"
  }),

  /**
   * @memberof error
   * @constant
   * @name 403 => FORBIDDEN
   */
  FORBIDDEN: builder({
    code: 403,
    message: "Forbidden"
  }),

  /**
   * @memberof error
   * @constant
   * @name 404 => NOT_FOUND
   */
  NOT_FOUND: builder({
    code: 404,
    message: "Not Found"
  }),

  /**
   * @memberof error
   * @constant
   * @name 408 => REQUEST_TIMEOUT
   */
  REQUEST_TIMEOUT: builder({
    code: 408,
    message: "Request Timeout"
  }),

  /**
   * @memberof error
   * @constant
   * @name 413 => PAYLOAD_TOO_LARGE
   */
  PAYLOAD_TOO_LARGE: builder({
    code: 413,
    message: "Payload Too Large"
  }),

  /**
   * @memberof error
   * @constant
   * @name 429 => TOO_MANY_REQUESTS
   */
  TOO_MANY_REQUESTS: builder({
    code: 429,
    message: "Too Many Requests"
  }),

  /**
   * @memberof error
   * @constant
   * @name 500 => INTERNAL_SERVER_ERROR
   */
  INTERNAL_SERVER_ERROR: builder({
    code: 500,
    message: "Internal Server Error"
  })
};
module.exports = exports;
