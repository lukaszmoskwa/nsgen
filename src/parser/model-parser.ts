import NodeJSModel from '../core/nodejs/nodejs-model';
import { IModelTableConfig, IModelValueConfig } from '../utils';
import Parser from './parser';

class ModelParser extends Parser {
  public parserType = 'model';

  public parse(tables: IModelTableConfig[]): void {
    global.configuration.model = tables;
    NodeJSModel.initializeFiles(tables);
  }

  public typeMap(configObject: any): IModelTableConfig[] {
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

  public validate(configObject: any): boolean {
    return true;
  }
}

export default ModelParser;
