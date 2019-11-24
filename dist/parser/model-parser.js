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
                this.write(`export default function ${table.name[0].toUpperCase() +
                    table.name.slice(1)}Model(sequelize, type) {\n`);
                this.write('return sequelize.define(\n');
                this.write(`"${table.name}",\n`);
                this.write(ModelParser.objectFromValues(table.values), null, 4);
                this.write(')}');
                this.end();
            });
        }
        // Create the sequelize file
        ModelParser.createSequelizeFile(tables);
    }
    static createSequelizeFile(tables) {
        file_utils_1.default.createFile('sequelize.ts', function () {
            this.write('import { Sequelize, Dialect } from "sequelize";\n');
            for (const table of tables) {
                this.write(`import ${table.name[0].toUpperCase() +
                    table.name.slice(1)}Model from "./models/${table.name}";\n`);
            }
            this.write(`import config from "./config/index";\n\n`);
            // Database settings
            this.write(`const sequelize = new Sequelize(config.db_name,
          config.db_username, config.db_password, {
          host: "localhost",
          dialect: config.db_type as Dialect,
          logging: false
        });\n\n`);
            /**
             * sequelize.query("CREATE DATABASE '${global.configuration.config.db.name}';");\n
             */
            // Authentication to database
            this.write(`
        sequelize
        .authenticate()
        .then(() => {
          console.log("Connection has been established successfully.");
        })
        .catch(err => {
          console.error("Unable to connect to the database:", err);
        });\n\n`);
            // Variable creation
            for (const table of tables) {
                this.write(`const ${table.name[0].toUpperCase() + table.name.slice(1)}` +
                    ` = ${table.name[0].toUpperCase() +
                        table.name.slice(1)}Model(sequelize, Sequelize);\n`);
            }
            this.write(`\n\nsequelize
        .sync({
          force: true
        });\n\n`);
            this.write(`export default {\n`);
            for (const table of tables) {
                this.write(`${table.name[0].toUpperCase() + table.name.slice(1)},\n`);
            }
            this.write(`}`);
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
        type: ${ModelParser.getValueType(value.class)},
      }, \n`;
        }
        finalObject += '}';
        return finalObject;
    }
    /**
     * Retrieve the string corresponding to the type chosen by the user
     * Datatype link: https://sequelize.org/master/manual/data-types.html
     * @param className Object or String containg information about the type
     */
    static getValueType(className) {
        if (className === 'string') {
            return 'type.STRING';
        }
        switch (className.type) {
            case 'number':
            case 'int':
            case 'integer':
                return 'type.INTEGER';
            case 'date':
                return 'type.DATE';
            case 'bool':
            case 'boolean':
                return 'type.BOOLEAN';
            case 'uuid':
                return 'type.UUID';
            case 'text':
                return 'type.TEXT';
            case 'json':
                return 'type.JSON';
            case 'string':
            default:
                return 'type.STRING';
        }
    }
}
exports.default = ModelParser;
//# sourceMappingURL=model-parser.js.map