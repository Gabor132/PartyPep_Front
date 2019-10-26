import axios from "axios";
const queryString = require("querystring");

var RequestHandler = {};

export { RequestHandler };
export { AuthenticationData, ClientCredentials };

// This is here to allow logging warnings and errors via the console
/*eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

//
// Auxiliar objects
//
//
// Object used to identify the specific user for the OAuth Authentication
function AuthenticationData(username, password, clientCredentials) {
  return {
    grant_type: "password",
    client_id: clientCredentials.username,
    client_secret: clientCredentials.password,
    username: username,
    password: password
  };
}

//
// Object used for the Basic authorization for all the requests
function ClientCredentials(username, password) {
  return {
    username: username,
    password: password
  };
}

//
// Auxiliar properties
//
// Headers
RequestHandler._oauthHeaders = {
  "Content-Type": "application/x-www-form-urlencoded"
};
RequestHandler._getGeneralHeaders = function() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + RequestHandler._getToken()
  };
};
// Token
RequestHandler._token = undefined;
RequestHandler._getToken = function() {
  if (RequestHandler._token === undefined || RequestHandler._token === null) {
    throw "No token on handler!";
  }
  return RequestHandler._token.access_token;
};
//
// Configuration function
//
RequestHandler._isConfigured = false;
RequestHandler.checkConfigured = function() {
  if (!RequestHandler._isConfigured) {
    throw "RequestHandler must be configured using the .config() function";
  }
};
RequestHandler.config = function(baseUrl) {
  RequestHandler._baseUrl = process.env.VUE_APP_ROOT_API;
  RequestHandler.getClientID();
  RequestHandler._isConfigured = true;
};

RequestHandler.generateAuthenticationData = function(username, password){
  try{
    RequestHandler.checkConfigured();
  }catch(err){
    RequestHandler.getClientID();
  }
  return AuthenticationData(username, password, RequestHandler._clientCredentials);;
}
//
// Auxiliar to handle Responses and Errors from Axios
//
RequestHandler._genericRequestResponseHandler = function(response, vue) {
  if (vue !== undefined) {
    vue.snackBarProp.showSnackbar = true;
    vue.snackBarProp.isError = false;
    vue.snackBarProp.error.status = "";
    vue.snackBarProp.error.description = "Success";
  }
};
RequestHandler._getTokenRequestResponseHandler = function(response, vue) {
  RequestHandler._token = response.data;
  if (vue !== undefined) {
    vue.snackBarProp.showSnackbar = true;
    vue.snackBarProp.isError = false;
    vue.snackBarProp.error.status = "";
    vue.snackBarProp.error.description = "Success";
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
RequestHandler.getOAuthToken = function(username, password, vue, onSuccess, onFailure) {
  RequestHandler.checkConfigured();
  var headers = RequestHandler._oauthHeaders;
  axios({
    method: "post",
    url: RequestHandler._baseUrl + "/oauth/token",
    data: queryString.stringify(RequestHandler.generateAuthenticationData(username, password, RequestHandler._clientCredentials)),
    headers: headers
  })
    .then(response => {
      RequestHandler._token = response.data;
      return RequestHandler._getSuccessFunction(onSuccess, response, vue);
    })
    .catch(error => {
      RequestHandler._getFailureFunction(onFailure, error, vue);
    });
};

RequestHandler.getClientID = function(onSuccess, onFailure) {
  axios({
    method: "get",
    url: RequestHandler._baseUrl + "/app-security/clientId",
    headers: {
      "Content-Type" : "application/json"
    }
  })
    .then(response => {
      RequestHandler._clientCredentials = {
        username: response.data.client_id,
        password: response.data.client_secret
      }
      return RequestHandler._getSuccessFunction(onSuccess, response);
    })
    .catch(error => {
      RequestHandler._getFailureFunction(onFailure, error);
    });
}

//
// Generic function to do GET Requests (TODO)
RequestHandler.doGetRequest = function(subUrl, params, vue, onSuccess, onFailure) {
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
      return RequestHandler._getSuccessFunction(onSuccess, response, vue);
    })
    .catch(error => {
      RequestHandler._getFailureFunction(onFailure, error, vue);
    });
};

//
// Generic function to do POST Requests (TODO)
RequestHandler.doPostRequest = function(subUrl,data,vue,onSuccess,onFailure) {
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

RequestHandler.config();
