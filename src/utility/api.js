import axios from 'axios';
import _ from 'lodash';

var instance = axios.create({
  baseURL:process.env.NODE_ENV==="development"?window.location.origin:process.env.REACT_APP_DOMAIN_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization':'Token :51b56a6aec4496553e462416d27bcdc53bb59fdb'
  },
});

//mockdata end point will remove in future
export const commonApi = async(method = "get", context = "/", queryObject = {}, body = {}) => {
  var url = context;
  url += !_.isEmpty(queryObject) ? '?' : "";
  for (var variable in queryObject) {
    if (typeof queryObject[variable] !== 'undefined') {
      url += '&' + variable + '=' + queryObject[variable];
    }
  }
  switch (method) {
    case "get":
      try {
        return await instance.get(url);
      } catch (e) {
        console.error(e);
      }
    case "post":
      try {
        return await instance.post(url, body);
      } catch (e) {
        console.error(e);
      }
    default:
      return;
  }
}
