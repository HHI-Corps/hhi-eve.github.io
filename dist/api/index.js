import __SNOWPACK_ENV__ from '/meta/env.js';
import.meta.env = __SNOWPACK_ENV__;

import axios2 from "/web_modules/axios.js";
const config = {
  baseURL: import.meta.env.SNOWPACK_PUBLIC_API_URL,
  method: "POST"
};
const request = axios2.create(config);
export function login(user, pass) {
  return request({
    url: "/user/login",
    data: {
      username: user,
      passhash: pass
    }
  });
}
export function logout() {
  return request({
    url: "/user/logout"
  });
}
export function registerUser(username, passhash, email, invitation) {
  return request({
    url: "/user/register",
    data: {
      username,
      passhash,
      email,
      invitation
    }
  });
}
export function charById(userid) {
  return request({
    method: "GET",
    url: "/char/by-id/" + userid
  });
}
export function charAdd(name) {
  return request({
    url: "/char/add",
    data: {
      name
    }
  });
}
export function charRemove(cid) {
  return request({
    url: "/char/remove",
    data: {
      cid
    }
  });
}
export function charDonate(cid, isk, comment) {
  return request({
    url: "/char/donate",
    data: {
      cid,
      isk,
      comment
    }
  });
}
export function getCreditSummary() {
  return request({
    method: "GET",
    url: "/credits/summary"
  });
}
export function getCreditByName(name) {
  return request({
    method: "GET",
    url: "/credits/by-name/" + name
  });
}
