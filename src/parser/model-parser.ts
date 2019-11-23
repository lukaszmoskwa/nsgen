import FileUtils from '../core/file-utils';
import FolderUtils from '../core/folder-utils';
import { IModelTableConfig, IModelValueConfig } from '../utils';

class ModelParser {
  public static parse(tables: IModelTableConfig[]): void {
    global.configuration.model = tables;
    ModelParser.initializeFiles(tables);
  }

  public static typeMap(configObject: any): IModelTableConfig[] {
    const finalTables: IModelTableConfig[] = [];
    const tableNames: string[] = Object.keys(configObject);
    for (const name of tableNames) {
      const values: IModelValueConfig[] = [];
      for (const valueName of Object.keys(configObject[name])) {
        values.push({
          class: configObject[name][valueName] || 'string',
          name: valueName,
        });
      }
      const table: IModelTableConfig = {
        name,
        values,
      };
      finalTables.push(table);
    }
    return finalTables;
  }

  private static initializeFiles(tables: IModelTableConfig[]) {
    // Create the 'config' folder
    FolderUtils.createFolder('models');
    // Create the 'model' files for each table
    for (const table of tables) {
      FileUtils.createFile(`models/${table.name}.ts`, function() {
        this.write('export default (sequelize, type) => {\n');
        this.write('return sequelize.define(\n');
        this.write(`"${table.name}",\n`);
        this.write(ModelParser.objectFromValues(table.values), null, 4);
        this.write('}');
        this.end();
      });
    }
    // Create the sequelize file
    FileUtils.createFile('sequelize.ts', function() {
      this.write('import { Sequelize } from "sequelize";\n\n');
      for (const table of tables) {
        this.write(
          `import * as ${table.name[0].toUpperCase() +
            table.name.slice(1)}Model from "./models/${table.name}.ts";\n`,
        );
      }
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
  private static getValueType(className: any) {
    return 'type.STRING';
  }
}

export default ModelParser;
