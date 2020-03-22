import axios from "axios";
import { RequestUIHandler } from "./request_ui_handler";

const RequestHandler = {};

export { RequestHandler };

// This is here to allow logging warnings and errors via the console
/*eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

// Set BaseURL
RequestHandler.getBaseUrl = function() {
  let baseUrl = process.env.VUE_APP_ROOT_API;
  return baseUrl;
};

RequestHandler.doGetRequest = async function(
  subUrl,
  params,
  storeState,
  onSuccess,
  onFailure
) {
  if (typeof subUrl === undefined) {
    subUrl = "";
  }
  return await axios
    .get(RequestHandler.getBaseUrl() + subUrl, {
      params: params
    })
    .then(response => {
      RequestUIHandler._getSuccessFunction(onSuccess, storeState);
      return response.data;
    })
    .catch(error => {
      RequestUIHandler._getFailureFunction(onFailure, error, storeState);
    });
};

//
// Generic function to do POST Requests (TODO)

RequestHandler.doPostRequest = async function(
  subUrl,
  data,
  storeState,
  onSuccess,
  onFailure
) {
  if (typeof subUrl === undefined) {
    subUrl = "";
  }
  return await axios
    .post(RequestHandler.getBaseUrl() + subUrl, data)
    .then(response => {
      RequestUIHandler._getSuccessFunction(onSuccess, storeState);
      return response.data;
    })
    .catch(error => {
      RequestUIHandler._getFailureFunction(onFailure, error, storeState);
    });
};
