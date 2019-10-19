/*import axios from 'axios';


var requestHandler = {};

export {requestHandler};

requestHandler._baseUrl = process.env.VUE_APP_ROOT_API;

requestHandler.createAuthenticationData = function(grantType, clientId, username, password){
  return {
    "grant_type": grantType,
    "client_id": clientId,
    "username": username,
    "password": password
  };
}

requestHandler.createAuthorizationHeader = function(username, apiKey){
  return {
    username: username,
    password: apiKey
  };
}

requestHandler._headers = {
  'Content-Type' : 'application/x-www-form-urlencoded'
}

requestHandler._doOAuthPost = function(url, data, auth, onSuccess, onFailure){
  axios({
    method: 'post',
    url: url + '/oauth/token',
    data: data,
    auth: auth
  })
  .then(response => {
    onSuccess(response);
  })
  .catch(error => {
    onFailure(error);
  });
}

requestHandler._doGetRequest = function(url, onSuccess, onFailure){
  axios.get(url)
    .then(response => {
      onSuccess(response);
    })
    .catch(error => {
      onFailure(error);
    });
}

requestHandler.checkToken = function(){
  var token = "";
  axios.get(requestHandler._baseUrl + "/oauth/check_token", {
    token: token
  })
    .then(response => {
      onSuccess(response);
    })
    .catch(error => {
      onFailure(error);
    });


}*/
