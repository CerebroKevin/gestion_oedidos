"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _index = _interopRequireDefault(require("./routes/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

//Settings
app.set("port", process.env.PORT || 4000);

//Middelwares
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
//Routers
app.use(_index["default"]);
var _default = app;
exports["default"] = _default;