const helper = require('think-helper');
const path = require('path');
const {COMPARISON_LIST} = require('think-model-abstract');
const Model = require('./lib/model.js');
const sqlite = require('think-model-sqlite');

let defaultConfig = {
  prefix: '',
  path: true,
  connectionLimit : 1
};
function model(config) {
  config = helper.extend(defaultConfig,config);
  const Cls = Model;
  config.handle = sqlite;
  const modelName = 'sqlite';
  const instance = new Cls(modelName, config);
  
  return instance;
};
module.exports = model;