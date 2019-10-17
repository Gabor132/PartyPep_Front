import axios from 'axios';


var requestHandler = {};

export {requestHandler};

requestHandler._paramsData = {
  'grant_type' : 'password',
  'client_id' : 'partypeps',
  'username' : 'admin',
  'password' : 'admin'
};

requestHandler._authorizationData = {
    'username': 'partypeps',
    'password': 'dglkjxcvsi423948'
}

requestHandler._headers = {
  'Content-Type' : 'application/x-www-form-urlencoded'
}

requestHandler._doPostRequest = function(url, onSuccess, onFailure){
  axios({
    method: 'post',
    url: url,
    data: {
      'grant_type' : 'password',
      'client_id' : 'partypeps',
      'username' : 'admin',
      'password' : 'admin'
    },
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    auth: {
      'username': 'partypeps',
      'password': 'dglkjxcvsi423948'
    }
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
