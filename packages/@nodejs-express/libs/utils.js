/**
 * Utils related
 * @namespace utils
 */

/**
 * @memberof utils
 * @method
 * @name val
 * @param {*} val value
 * @param {*} def default
 * @returns {*} val
 */
const valueOf = (val, def = null) => {
  try {
    return val;
  } catch (e) {
    return def;
  }
};

module.exports = {
  valueOf
};
