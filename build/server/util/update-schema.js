'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _graphql = require('graphql');

var _utilities = require('graphql/utilities');

var _schema = require('../graphql/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yourSchemaPath = _path2.default.join(__dirname, '../../data/schema');

// Save JSON of full schema introspection for Babel Relay Plugin to use


// Assume your schema is in ../data/schema
(0, _graphql.graphql)(_schema2.default, _utilities.introspectionQuery).then(function (result) {
  _fs2.default.writeFileSync(yourSchemaPath + '.json', JSON.stringify(result, null, 2));
});

// Save user readable type system shorthand of schema
_fs2.default.writeFileSync(yourSchemaPath + '.graphql', (0, _utilities.printSchema)(_schema2.default));