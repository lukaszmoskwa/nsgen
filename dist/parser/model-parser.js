"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = __importDefault(require("../core/file-utils"));
const folder_utils_1 = __importDefault(require("../core/folder-utils"));
class ModelParser {
    static parse(tables) {
        global.configuration.model = tables;
        ModelParser.initializeFiles(tables);
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
    static initializeFiles(tables) {
        // Create the 'config' folder
        folder_utils_1.default.createFolder('models');
        // Create the 'model' files for each table
        for (const table of tables) {
            file_utils_1.default.createFile(`models/${table.name}.ts`, function () {
                this.write('export default (sequelize, type) => {\n');
                this.write('return sequelize.define(\n');
                this.write(`"${table.name}",\n`);
                this.write(ModelParser.objectFromValues(table.values), null, 4);
                this.write('}');
                this.end();
            });
        }
        // Create the sequelize file
        file_utils_1.default.createFile('sequelize.ts', function () {
            this.write('import { Sequelize } from "sequelize";\n\n');
            for (const table of tables) {
                this.write(`import * as ${table.name[0].toUpperCase() +
                    table.name.slice(1)}Model from "./models/${table.name}.ts";\n`);
            }
            this.end();
        });
    }
    static objectFromValues(values) {
        const type = {};
        let finalObject = `{
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER,
      },\n`;
        for (const value of values) {
            finalObject += `${value.name}: {
        type: ${ModelParser.getValueType(value)},
      }, \n`;
        }
        finalObject += '}';
        return finalObject;
    }
    /**
     * Retrieve the string corresponding to the type chosen by the user
     * @param className Object or String containg information about the type
     * TODO: Fixme
     */
    static getValueType(className) {
        return 'type.STRING';
    }
}
exports.default = ModelParser;
//# sourceMappingURL=model-parser.js.map