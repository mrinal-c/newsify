import { Router } from "express";
import { requestAuth, getAccessToken, getUserData, getTopItems, refreshAccessToken } from "./spotify.js";
import { reaction } from "./recommendation.js";
import { getUserNews } from "./news.js";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
export const routes = Router();



// This section will help you get a list of all the records.
routes.route("/requestAuth").get(requestAuth);
routes.route("/token").post(getAccessToken);
routes.route("/refreshToken").post(refreshAccessToken);
routes.route("/userData").get(getUserData);
routes.route("/reaction").post(reaction);
routes.route("/news").get(getUserNews);
routes.route("/topItems").get(getTopItems);
