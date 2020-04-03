/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "development") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  }).then(function(reg) {
    console.log("Service Worker Registered!", reg);
    reg.pushManager
      .getSubscription()
      .then(function(sub) {
        if (sub === null) {
          // Update UI to ask user to register for Push
          console.log("Not subscribed to push service!");
        } else {
          // We have a subscription, update the database
          console.log("Subscription object: ", sub);
        }
      })
      .catch(function(err) {
        console.log("Service Worker registration failed: ", err);
      });
  });
}

// eslint-disable-next-line no-unused-vars
function displayNotification() {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: "Here is a notification body!",
        icon: "images/example.png",
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {
            action: "explore",
            title: "Explore this new world",
            icon: "images/checkmark.png"
          },
          {
            action: "close",
            title: "Close notification",
            icon: "images/xmark.png"
          }
        ]
      };
      reg.showNotification("Hello world!", options);
    });
  }
}

self.addEventListener("push", function(e) {
  var options = {
    body: "This notification was generated from a push!",
    icon: "images/example.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2"
    },
    actions: [
      {
        action: "explore",
        title: "Explore this new world",
        icon: "images/checkmark.png"
      },
      { action: "close", title: "Close", icon: "images/xmark.png" }
    ]
  };
  e.waitUntil(self.registration.showNotification("Hello world!", options));
});

if (process.env.NODE_ENV === "development") {
  if ("Notification" in window && navigator.serviceWorker) {
    // Display the UI to let the user toggle notifications
    if (Notification.permission === "granted") {
      /* do our magic */
      self.addEventListener("notificationclose", function(e) {
        var notification = e.notification;
        var primaryKey = notification.data.primaryKey;

        console.log("Closed notification: " + primaryKey);
      });

      self.addEventListener("notificationclick", function(e) {
        var notification = e.notification;
        // eslint-disable-next-line no-unused-vars
        var primaryKey = notification.data.primaryKey;
        var action = e.action;

        if (action === "close") {
          notification.close();
        } else {
          // eslint-disable-next-line no-undef
          clients.openWindow("http://www.google.com");
          notification.close();
        }
      });
    } else if (Notification.permission === "blocked") {
      /* the user has previously denied push. Can't reprompt. */
    } else {
      /* show a prompt to the user */
    }
  }
}

displayNotification();
