import axios from "axios";
const queryString = require("querystring");

var RequestHandler = {};

export { RequestHandler };
export { AuthenticationData, BasicAuthorization };

// This is here to allow logging warnings and errors via the console
/*eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

//
// Auxiliar objects
//
//
// Object used to identify the specific user for the OAuth Authentication
function AuthenticationData(username, password, grantType, clientId) {
  if (typeof grantType === undefined) {
    // tslint:disable-next-line:no-console
    console.warn("Defaulting request grant_type");
    grantType = process.env.VUE_APP_API_DEFAULT_GRANT_TYPE;
  }
  if (typeof clientId === undefined) {
    // tslint:disable-next-line:no-console
    console.warn("Defaulting request client_id");
    clientId = process.env.VUE_APP_API_CLIENT_ID;
  }
  return {
    grant_type: grantType,
    client_id: clientId,
    username: username,
    password: password
  };
}

//
// Object used for the Basic authorization for all the requests
function BasicAuthorization(username, password) {
  return {
    username: username,
    password: password
  };
}

//
// Auxiliar properties
//
RequestHandler._oauthHeaders = {
  "Content-Type": "application/x-www-form-urlencoded"
};

RequestHandler._token = undefined;

RequestHandler._getToken = function() {
  if (RequestHandler._token === undefined || RequestHandler._token === null) {
    throw "No token on handler!";
  }
  return RequestHandler._token.access_token;
};

RequestHandler._getGeneralHeaders = function() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + RequestHandler._getToken()
  };
};

RequestHandler._isConfigured = false;

//
// Configuration function
//
RequestHandler.config = function(
  baseUrl,
  basicAuthorization,
  userAuthentication
) {
  if (typeof baseUrl === undefined) {
    console.warn("Defaulting baseUrl");
    RequestHandler._baseUrl = process.env.VUE_APP_ROOT_API;
  } else {
    RequestHandler._baseUrl = baseUrl;
  }
  if (typeof userAuthentication !== undefined) {
    RequestHandler._authenticationData = userAuthentication;
  } else {
    throw "Authentication data is not provieded";
  }
  if (typeof basicAuthorization !== undefined) {
    RequestHandler._basicAuthorization = basicAuthorization;
  } else {
    throw "Authorization header information is not provided";
  }
  RequestHandler._isConfigured = true;
};

RequestHandler.checkConfigured = function() {
  if (!RequestHandler._isConfigured) {
    throw "RequestHandler must be configured using the .config() function";
  }
};

//
// Auxiliar to handle Responses and Errors from Axios
//

RequestHandler._genericRequestResponseHandler = function(response, vue) {
  console.info(response.data);
  if (vue !== undefined) {
    vue.snackBarProp.showSnackbar = true;
    vue.snackBarProp.isError = false;
    vue.snackBarProp.error.status = "";
    vue.snackBarProp.error.description = "Success";
    vue.response = response.data;
  }
};

RequestHandler._getTokenRequestResponseHandler = function(response, vue) {
  RequestHandler._token = response.data;
  if (vue !== undefined) {
    vue.snackBarProp.showSnackbar = true;
    vue.snackBarProp.isError = false;
    vue.snackBarProp.error.status = "";
    vue.snackBarProp.error.description = "Success";
    vue.response = response.data;
  }
};

RequestHandler._genericRequestErrorHandler = function(error, vue) {
  // TODO: Replace with error component
  console.warn(error.response);
  if (vue !== undefined) {
    vue.snackBarProp.showSnackbar = true;
    vue.snackBarProp.isError = true;
    if (typeof error.response !== undefined) {
      vue.snackBarProp.error.status = error.response.status;
      if (
        error.response.statusText !== undefined &&
        error.response.statusText !== ""
      ) {
        vue.snackBarProp.error.description = error.response.statusText;
      } else {
        vue.snackBarProp.error.description = "Failed to retrieve data";
      }
    } else {
      vue.snackBarProp.error.status = "";
      vue.snackBarProp.error.description = "Failed to retrieve data";
    }
  }
};

RequestHandler._getSuccessFunction = function(onSuccess, response, vue) {
  if (typeof onSuccess !== undefined) {
    return RequestHandler._genericRequestResponseHandler(response, vue);
  }
  return onSuccess(response, vue);
};
RequestHandler._getFailureFunction = function(onFailure, error, vue) {
  if (typeof onFailure !== undefined) {
    return RequestHandler._genericRequestErrorHandler(error, vue);
  }
  return onFailure(error, vue);
};

//
// Request functions
//
RequestHandler.getOAuthToken = function(vue, onSuccess, onFailure) {
  RequestHandler.checkConfigured();
  var headers = RequestHandler._oauthHeaders;
  axios({
    method: "post",
    url: RequestHandler._baseUrl + "/oauth/token",
    data: queryString.stringify(RequestHandler._authenticationData),
    auth: RequestHandler._basicAuthorization,
    headers: headers
  })
    .then(response => {
      RequestHandler._token = response.data;
      RequestHandler._getSuccessFunction(onSuccess, response, vue);
    })
    .catch(error => {
      RequestHandler._getFailureFunction(onFailure, error, vue);
    });
};

//
// Generic function to do GET Requests (TODO)
RequestHandler.doGetRequest = function(
  subUrl,
  params,
  vue,
  onSuccess,
  onFailure
) {
  RequestHandler.checkConfigured();
  let headers = RequestHandler._getGeneralHeaders();
  if (typeof subUrl === undefined) {
    subUrl = "";
  }
  axios
    .get(RequestHandler._baseUrl + subUrl, {
      params: params,
      headers: headers
    })
    .then(response => {
      RequestHandler._getSuccessFunction(onSuccess, response, vue);
    })
    .catch(error => {
      RequestHandler._getFailureFunction(onFailure, error, vue);
    });
};

//
// Generic function to do POST Requests (TODO)
RequestHandler.doPostRequest = function(
  subUrl,
  data,
  vue,
  onSuccess,
  onFailure
) {
  RequestHandler.checkConfigured();
  if (typeof subUrl === undefined) {
    subUrl = "";
  }
  axios
    .post(RequestHandler._baseUrl + subUrl, data)
    .then(response => {
      RequestHandler._getSuccessFunction(onSuccess)(response);
    })
    .catch(error => {
      RequestHandler._getFailureFunction(onFailure)(error);
    });
};

//
// Function to check the currently available access_token
RequestHandler.checkToken = function(vue, onSuccess, onFailure) {
  RequestHandler.checkConfigured();
  let headers = RequestHandler._getGeneralHeaders();
  let token = RequestHandler._getToken();
  axios
    .get(RequestHandler._baseUrl + "/oauth/check_token", {
      params: {
        token: token
      },
      headers: headers
    })
    .then(response => {
      RequestHandler._getSuccessFunction(onSuccess, response, vue);
    })
    .catch(error => {
      RequestHandler._getFailureFunction(onFailure, error, vue);
    });
};
