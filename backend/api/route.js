const express = require("express");
const { requestAuth, getAccessToken } = require("./spotify");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const routes = express.Router();



// This section will help you get a list of all the records.
routes.route("/requestAuth").get(requestAuth);
routes.route("/token").post(getAccessToken);


module.exports = routes;
