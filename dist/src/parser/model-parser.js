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
    parse(model) {
        global.configuration.model = model;
        nodejs_model_1.default.initializeFiles(model);
    }
    typeMap(configObject) {
        const finalModel = { tables: [], associations: [] };
        const associationsObject = configObject.associations;
        const tableNames = Object.keys(configObject.tables);
        // Tables configuration
        for (const name of tableNames) {
            const values = [];
            for (const valueName of Object.keys(configObject.tables[name])) {
                values.push({
                    class: configObject.tables[name][valueName] || 'string',
                    name: valueName,
                });
            }
            const table = {
                name,
                values,
            };
            finalModel.tables.push(table);
        }
        // Associations configuration
        if (configObject.associations) {
            finalModel.associations = configObject.associations;
        }
        return finalModel;
    }
    validate(configObject) {
        configObject = configObject.model;
        // Validate association
        if (configObject.associations) {
            if (Array.isArray(configObject.associations)) {
                throw Error('model.associations must be an object - found array');
            }
            // Sources must be part of the model tables
            for (const source of Object.keys(configObject.associations)) {
                if (!configObject.tables[source]) {
                    throw Error(`${source} is not a model declared in model.tables`);
                }
                // Associations can only be part of ['1->1', '1->n', 'n->m']
                for (const type of Object.keys(configObject.associations[source])) {
                    if (!['1->1', '1->n', 'n->m'].includes(type)) {
                        throw Error(`${type} is not a supported relation for model.association`);
                    }
                    // For each type, targets must be part of the model table
                    for (const target of configObject.associations[source][type]) {
                        if (!configObject.tables[target]) {
                            throw Error(`${target} is not a model declared in model.tables`);
                        }
                    }
                }
            }
        }
    }
}
exports.default = ModelParser;
//# sourceMappingURL=model-parser.js.map