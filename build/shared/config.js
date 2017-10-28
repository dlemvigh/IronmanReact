"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getEnv = getEnv;
exports.getConfig = getConfig;
var base = {
  db: "ironman"
};

var prod = exports.prod = _extends({}, base, {
  port: 4000,
  callbackUrl: "https://ironman.dlemvigh.dk/callback"
});

var test = exports.test = _extends({}, base, {
  db: "test",
  port: 4001,
  callbackUrl: "https://test.ironman.dlemvigh.dk/callback"
});

var dev = exports.dev = _extends({}, base, {
  port: 8080,
  callbackUrl: "http://localhost:8080/callback"
});

var config = exports.config = { prod: prod, test: test, dev: dev };

function getEnv() {
  switch (process.env.NODE_ENV) {
    case "development":
      return "dev";
    case "test":
      return "test";
    case "production":
    default:
      return "prod";
  }
}

function getConfig() {
  var env = getEnv();
  return config[env];
}