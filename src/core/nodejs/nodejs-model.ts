import { IModelTableConfig, IModelValueConfig } from '../../utils';
import FileUtils from '../file-utils';
import FolderUtils from '../folder-utils';

class NodeJSModel {
  public static initializeFiles(tables: IModelTableConfig[]) {
    // Create the 'config' folder
    FolderUtils.createFolder('models');
    // Create the 'model' files for each table
    for (const table of tables) {
      FileUtils.createFile(`models/${table.name}.ts`, function() {
        this.write(
          `export default function ${table.name[0].toUpperCase() +
            table.name.slice(1)}Model(sequelize, type) {\n`,
        );
        this.write('return sequelize.define(\n');
        this.write(`"${table.name}",\n`);
        this.write(NodeJSModel.objectFromValues(table.values), null, 4);
        this.write(')}');
        this.end();
      });
    }
    // Create the sequelize file
    NodeJSModel.createSequelizeFile(tables);
  }

  private static createSequelizeFile(tables: IModelTableConfig[]) {
    FileUtils.createFile('sequelize.ts', function() {
      this.write('import { Sequelize, Dialect } from "sequelize";\n');
      for (const table of tables) {
        this.write(
          `import ${table.name[0].toUpperCase() +
            table.name.slice(1)}Model from "./models/${table.name}";\n`,
        );
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
        this.write(
          `const ${table.name[0].toUpperCase() + table.name.slice(1)}` +
            ` = ${table.name[0].toUpperCase() +
              table.name.slice(1)}Model(sequelize, Sequelize);\n`,
        );
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

  private static objectFromValues(values: IModelValueConfig[]): string {
    const type: any = {};
    let finalObject = `{
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER,
          },\n`;
    for (const value of values) {
      finalObject += `${value.name}: {
            type: ${NodeJSModel.getValueType(value.class)},
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
  private static getValueType(className: any) {
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

export default NodeJSModel;
