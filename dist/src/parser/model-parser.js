"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = __importDefault(require("../core/file-utils"));
const folder_utils_1 = __importDefault(require("../core/folder-utils"));
class ModelParser {
    static parse(tables) {
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
        // const tableNames: string[] = tables.map((el) => el.name);
        for (const table of tables) {
            file_utils_1.default.createFile(`models/${table.name}.ts`, function () {
                this.write('export default (sequelize, type) => {\n');
                this.write('return sequelize.define(\n');
                this.write(`"${table.name}",\n`);
                this.write(JSON.stringify(ModelParser.objectFromValues(table.values), ModelParser.replacer, 4));
                this.write('}');
                this.end();
            });
        }
    }
    static replacer(name, val) {
        console.log(name, val);
        return val;
    }
    static objectFromValues(values) {
        const type = {};
        const finalObject = {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: type.INTEGER,
            },
        };
        for (const value of values) {
            finalObject[value.name] = {
                type: ModelParser.getValueType(value),
            };
        }
        return finalObject;
    }
    static getValueType(className) {
        const type = {};
        return 'type.STRING';
    }
}
exports.default = ModelParser;
//# sourceMappingURL=model-parser.js.map