"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = __importDefault(require("../file-utils"));
const folder_utils_1 = __importDefault(require("../folder-utils"));
class NodeJSModel {
    static initializeFiles(tables) {
        // Create the 'config' folder
        folder_utils_1.default.createFolder('models');
        // Create the 'model' files for each table
        for (const table of tables) {
            file_utils_1.default.createFromTemplate('models/model.ts', `models/${table.name}.ts`, {
                getValueType: this.getValueType,
                table,
                tableName: table.name[0].toUpperCase() + table.name.slice(1),
                values: table.values,
            });
        }
        // Create the sequelize file
        NodeJSModel.createSequelizeFile(tables);
    }
    /**
     * Creates the sequelize file:
     * -  Imports all the table dependencies
     * -  Creates the Sequelize object with all the dependencies
     * -  Autheticates
     * -  Creates the Models
     * @param tables List of table to load
     */
    static createSequelizeFile(tables) {
        file_utils_1.default.createFromTemplate('sequelize', 'sequelize.ts', {
            tables,
        });
    }
    /**
     * Retrieve the string corresponding to the type chosen by the user
     * Datatype link: https://sequelize.org/master/manual/data-types.html
     * @param className Object or String containg information about the type
     */
    static getValueType(className) {
        let valueType;
        const { type, check } = className;
        if (type) {
            valueType = `type.${type.toUpperCase()}`;
            if (check) {
                valueType += `,\n\tvalidate: {\n`;
                for (const attribute of Object.keys(check)) {
                    valueType += `\t\t${attribute}: ${check[attribute]}, \n`;
                }
                valueType += '\t}\n';
            }
        }
        else {
            valueType = `type.${className.toUpperCase()}`;
        }
        return valueType;
    }
}
exports.default = NodeJSModel;
//# sourceMappingURL=nodejs-model.js.map