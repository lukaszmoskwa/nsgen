import NodeJSModel from '../core/nodejs/nodejs-model';
import { IModelTableConfig, IModelValueConfig } from '../utils';

class ModelParser {
  public static parse(tables: IModelTableConfig[]): void {
    global.configuration.model = tables;
    NodeJSModel.initializeFiles(tables);
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
}

export default ModelParser;
