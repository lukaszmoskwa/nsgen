"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodejs_config_1 = __importDefault(require("../core/nodejs/nodejs-config"));
const utils_1 = require("../utils");
const parser_1 = __importDefault(require("./parser"));
class ConfigParser extends parser_1.default {
    constructor() {
        super(...arguments);
        this.parserType = 'config';
    }
    parse(config) {
        global.configuration.config = config;
        nodejs_config_1.default.initializeFiles(config.db);
    }
    typeMap(config) {
        return config;
    }
    validate(configObject) {
        if (!configObject.config) {
            throw new Error(utils_1.ConfigParserErrors.NO_CONFIG);
        }
        configObject = configObject.config;
        if (!configObject.name) {
            throw new Error(utils_1.ConfigParserErrors.NO_NAME);
        }
        if (!configObject.db) {
            throw new Error(utils_1.ConfigParserErrors.NO_DB_CONFIG);
        }
        if (!configObject.db.type) {
            throw new Error(utils_1.ConfigParserErrors.NO_DIALECT);
        }
        if (!utils_1.DBSupportedDialects.includes(configObject.db.type)) {
            throw new Error(utils_1.ConfigParserErrors.NOT_SUPPORTED_DIALECT);
        }
    }
}
exports.default = ConfigParser;
//# sourceMappingURL=config-parser.js.map