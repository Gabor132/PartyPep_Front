import axios from "axios";
import { RequestUIHandler } from "./request_ui_handler";

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

// Set BaseURL
RequestHandler.getBaseUrl = function() {
    let baseUrl = process.env.VUE_APP_ROOT_API;
    return baseUrl;
};
//
// Auxiliary properties
//
// Headers
RequestHandler._oauthHeaders = {
    "Content-Type": "application/x-www-form-urlencoded"
};

RequestHandler._saveClientCredentials = function(clientCredentials){
    sessionStorage.setItem("clientCredentials", JSON.stringify(clientCredentials));
};

RequestHandler._loadClientCredentials = async function(storeState){
    let clientCredentials = JSON.parse(sessionStorage.getItem("clientCredentials"));
    if (clientCredentials === null){
        clientCredentials = await RequestHandler._getClientCredentials(storeState);
        RequestHandler._saveClientCredentials(clientCredentials);
    }
    return clientCredentials
};

RequestHandler._getClientCredentials = async function(storeState) {
    return await axios({
        method: "get",
        url: RequestHandler.getBaseUrl() + "/app-security/clientId",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            let clientCredentials = ClientCredentials(response.data.client_id, response.data.client_secret);
            RequestUIHandler._getSuccessFunction(undefined, storeState);
            return clientCredentials;
        })
        .catch(error => {
            RequestUIHandler._getFailureFunction(undefined, error, storeState);
        });
};


RequestHandler._getToken = async function(username, password, storeState) {
    let headers = RequestHandler._oauthHeaders;
    let clientCredentials = await RequestHandler._loadClientCredentials(storeState);
    return await axios({
        method: "post",
        url: RequestHandler.getBaseUrl() + "/oauth/token",
        data: queryString.stringify(
            AuthenticationData(username, password, clientCredentials)
        ),
        headers: headers
    })
        .then(response => {
            RequestUIHandler._getSuccessFunction(undefined, storeState);
            return response.data
        })
        .catch(error => {
            RequestUIHandler._getFailureFunction(undefined, error, storeState);
        });
};

RequestHandler._saveToken = function(accessToken){
    sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
};

RequestHandler._getUsernameAndPassword = function(){
    let username = sessionStorage.getItem("username");
    // TODO : HASH THIS MOTHERFUCKER
    let password = sessionStorage.getItem("password");
    if (username === null || password === null){
        username = prompt("Please enter your username", "");
        password = prompt("Please enter your password", "");
        sessionStorage.setItem("username", username)
        sessionStorage.setItem("password", password)
    }
    return {
        "username" : username,
        "password": password
    };
};

RequestHandler._loadToken = async function(storeState){
    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    if (token === null) {
        let userAndPass = RequestHandler._getUsernameAndPassword();
        token = await RequestHandler._getToken(userAndPass.username, userAndPass.password, storeState);
        RequestHandler._saveToken(token)
    }
    return token;
};

RequestHandler._getGeneralHeaders = async function(storeState) {
    let token = await RequestHandler._loadToken(storeState);
    let accessToken = token.access_token;
    return {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken
    };
};


RequestHandler.doGetRequest = async function(
    subUrl,
    params,
    storeState,
    onSuccess,
    onFailure
) {
    let headers = await RequestHandler._getGeneralHeaders(storeState);
    if (typeof subUrl === undefined) {
        subUrl = "";
    }
    return await axios
        .get(RequestHandler.getBaseUrl() + subUrl, {
            params: params,
            headers: headers
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
        })
        .catch(error => {
            RequestUIHandler._getFailureFunction(onFailure, error, storeState);
        });
};

RequestHandler.doTokenCheck = async function(storeState) {
    let headers = await RequestHandler._getGeneralHeaders();
    let token = await RequestHandler._loadToken();
    let accessToken = token.access_token;
    axios
        .get(RequestHandler.getBaseUrl() + "/oauth/check_token", {
            params: {
                token: accessToken
            },
            headers: headers
        })
        .then(response => {
            RequestUIHandler._getSuccessFunction(undefined, storeState);
        })
        .catch(error => {
            RequestUIHandler._getFailureFunction(undefined, error, storeState);
        });
};