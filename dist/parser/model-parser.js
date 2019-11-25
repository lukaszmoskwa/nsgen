"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodejs_model_1 = __importDefault(require("../core/nodejs/nodejs-model"));
class ModelParser {
    static parse(tables) {
        global.configuration.model = tables;
        nodejs_model_1.default.initializeFiles(tables);
    }
    static typeMap(configObject) {
        const finalTables = [];
        const tableNames = Object.keys(configObject);
        for (const name of tableNames) {
            const values = [];
            for (const valueName of Object.keys(configObject[name])) {
                values.push({
                    class: configObject[name][valueName] || 'string',
                    name: valueName,
                });
            }
            const table = {
                name,
                values,
            };
            finalTables.push(table);
        }
        return finalTables;
    }
}
exports.default = ModelParser;
//# sourceMappingURL=model-parser.js.map