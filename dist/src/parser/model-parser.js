"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodejs_model_1 = __importDefault(require("../core/nodejs/nodejs-model"));
const parser_1 = __importDefault(require("./parser"));
class ModelParser extends parser_1.default {
    constructor() {
        super(...arguments);
        this.parserType = 'model';
    }
    parse(tables) {
        global.configuration.model = tables;
        nodejs_model_1.default.initializeFiles(tables);
    }
    typeMap(configObject) {
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
    validate(configObject) {
        return true;
    }
}
exports.default = ModelParser;
//# sourceMappingURL=model-parser.js.map