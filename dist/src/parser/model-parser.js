"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodejs_model_1 = __importDefault(require("../core/nodejs/nodejs-model"));
const utils_1 = require("../utils");
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
        if (configObject.model) {
            configObject = configObject.model;
        }
        else {
            throw new Error(utils_1.ModelParserErrors.NO_MODEL);
        }
        // Validate tables
        if (!configObject.tables) {
            throw new Error(utils_1.ModelParserErrors.NO_TABLES);
        }
        // Table as array
        for (const table of Object.keys(configObject.tables)) {
            if (Array.isArray(configObject.tables[table])) {
                throw new Error(utils_1.ModelParserErrors.TABLE_AS_ARRAY);
            }
            if (!Object.keys(configObject.tables[table]).length) {
                throw new Error(utils_1.ModelParserErrors.EMPTY_COLUMN);
            }
            // A column can be either a string or an object with the type and check properties
            for (const column of Object.keys(configObject.tables[table])) {
                if (!(configObject.tables[table][column].hasOwnProperty('type') ||
                    typeof configObject.tables[table][column] === 'string' ||
                    configObject.tables[table][column] instanceof String)) {
                    throw new Error(utils_1.ModelParserErrors.WRONG_COLUMN_FORMAT);
                }
            }
        }
        // Validate association
        if (configObject.associations) {
            if (Array.isArray(configObject.associations)) {
                throw new Error(utils_1.ModelParserErrors.ASSOC_AS_ARRAY);
            }
            // Sources must be part of the model tables
            for (const source of Object.keys(configObject.associations)) {
                if (!configObject.tables[source]) {
                    throw new Error(utils_1.ModelParserErrors.NO_SRC_IN_TABLES);
                }
                // Associations can only be part of ['1->1', '1->n', 'n->m']
                for (const type of Object.keys(configObject.associations[source])) {
                    if (!['1->1', '1->n', 'n->m'].includes(type)) {
                        throw new Error(utils_1.ModelParserErrors.WRONG_RELATION);
                    }
                    // Targets must be an array
                    if (!Array.isArray(configObject.associations[source][type])) {
                        throw new Error(utils_1.ModelParserErrors.TARGET_NOT_ARRAY);
                    }
                    // For each type, targets must be part of the model table
                    for (const target of configObject.associations[source][type]) {
                        if (!configObject.tables[target]) {
                            throw new Error(utils_1.ModelParserErrors.NO_TRG_IN_TABLES);
                        }
                    }
                }
            }
        }
    }
}
exports.default = ModelParser;
//# sourceMappingURL=model-parser.js.map