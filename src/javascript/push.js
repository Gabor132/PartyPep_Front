var push = require("web-push");

let vapidKeys = {
  publicKey:
    "BKOmoiK3bf1gr0S3va3DJ5W2_jHU3NhFgcGHtRle4j4Fe6wcrPZYzMmz7X3ff9U9TISMRB4IelQWTnp_pxhWo3M",
  privateKey: "YTBJEZnOE1jyTbbGBTdAFwzmPjuvwC6Mjg8BWajaSYw"
};

push.setVapidDetails(
  "mailto:gabordragos@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
let sub = {};

push.sendNotification(sub, "text message");
