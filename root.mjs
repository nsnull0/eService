/* eslint no-process-env: 0 */

/**
 * Wrapping process to get useful info
 * @module root
 * @prop {String} env           - app environment
 * @prop {String} port          - app exposed port
 * @prop {String} appVersion    - app package version
 * @prop {String} nodeVersion   - node version
 */
export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    appVersion: process.env.npm_package_version || '0.0.0',
    nodeVersion: process.version,
};
