const assert = require("assert");

module.exports.test1 = () => assert(false, "The error message");

module.exports[`test 2`] = () => assert(true);
