"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_VERSION = '0.0.1';
exports.packageDependencies = {
    dotenv: '^8.2.0',
    express: '^4.17.1',
    mysql2: '^2.0.1',
    sequelize: '^5.19.3',
};
exports.devDependecies = {};
exports.gitignoreList = ['node_modules/', 'package-lock.json', '.env'];
exports.TSConfigObject = {
    compilerOptions: {
        esModuleInterop: true,
        module: 'commonjs',
        moduleResolution: 'node',
        outDir: 'dist',
        sourceMap: true,
        target: 'es6',
    },
    lib: ['es2015'],
};
exports.DBSupportedDialects = [
    'mysql',
    'mariadb',
    'sqlite',
    'postgres',
    'mssql',
];
var ConfigParserErrors;
(function (ConfigParserErrors) {
    ConfigParserErrors["NO_CONFIG"] = "Missing project configuration";
    ConfigParserErrors["NO_NAME"] = "Missing project name";
    ConfigParserErrors["NO_DB_CONFIG"] = "Missing the Database configuration object";
    ConfigParserErrors["NO_DIALECT"] = "Missing the Database dialect";
    ConfigParserErrors["NOT_SUPPORTED_DIALECT"] = "The Database dialect selected is not supported";
})(ConfigParserErrors = exports.ConfigParserErrors || (exports.ConfigParserErrors = {}));
var ModelParserErrors;
(function (ModelParserErrors) {
    ModelParserErrors["NO_MODEL"] = "Missing model configuration";
    ModelParserErrors["NO_TABLES"] = "Missing tables configuration";
    ModelParserErrors["TABLE_AS_ARRAY"] = "Expecting table to be an object - found array";
    ModelParserErrors["WRONG_COLUMN_FORMAT"] = "Expecting column to be either a string or an object with type property";
    ModelParserErrors["ASSOC_AS_ARRAY"] = "model.associations must be an object - found array";
    ModelParserErrors["NO_SRC_IN_TABLES"] = "An association source is not declared in the model.tables object ";
    ModelParserErrors["NO_TRG_IN_TABLES"] = "An association target is not declared in the model.tables object ";
    ModelParserErrors["WRONG_RELATION"] = "A provided relation is not supported in model.associations";
    ModelParserErrors["TARGET_NOT_ARRAY"] = "A provided target is not an array";
})(ModelParserErrors = exports.ModelParserErrors || (exports.ModelParserErrors = {}));
//# sourceMappingURL=utils.js.map