"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodejs_config_1 = __importDefault(require("../core/nodejs/nodejs-config"));
class ConfigParser {
    static parse(config) {
        global.configuration.config = config;
        nodejs_config_1.default.initializeFiles(config.db);
    }
    static typeMap(config) {
        return config;
    }
}
exports.default = ConfigParser;
//# sourceMappingURL=config-parser.js.map