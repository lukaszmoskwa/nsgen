"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodejs_config_1 = __importDefault(require("../core/nodejs/nodejs-config"));
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
    validate(config) {
        return true;
    }
}
exports.default = ConfigParser;
//# sourceMappingURL=config-parser.js.map