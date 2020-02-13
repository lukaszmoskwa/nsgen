import NodeJSModel from '../core/nodejs/nodejs-model';
import {
  IModelAssociationConfig,
  IModelConfig,
  IModelTableConfig,
  IModelValueConfig,
  ModelParserErrors,
} from '../utils';
import Parser from './parser';

class ModelParser extends Parser {
  public parserType = 'model';

  public parse(model: IModelConfig): void {
    global.configuration.model = model;
    NodeJSModel.initializeFiles(model);
  }

  public typeMap(configObject: {
    tables: any;
    associations?: any;
  }): IModelConfig {
    const finalModel: {
      tables: IModelTableConfig[];
      associations: IModelAssociationConfig[];
    } = { tables: [], associations: [] };
    const associationsObject = configObject.associations;
    const tableNames: string[] = Object.keys(configObject.tables);
    // Tables configuration
    for (const name of tableNames) {
      const values: IModelValueConfig[] = [];
      for (const valueName of Object.keys(configObject.tables[name])) {
        values.push({
          class: configObject.tables[name][valueName] || 'string',
          name: valueName,
        });
      }
      const table: IModelTableConfig = {
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

  public validate(configObject: any): void {
    if (configObject.model) {
      configObject = configObject.model;
    } else {
      throw new Error(ModelParserErrors.NO_MODEL);
    }
    // Validate association
    if (configObject.associations) {
      if (Array.isArray(configObject.associations)) {
        throw new Error(ModelParserErrors.ASSOC_AS_ARRAY);
      }
      // Sources must be part of the model tables
      for (const source of Object.keys(configObject.associations)) {
        if (!configObject.tables[source]) {
          throw new Error(ModelParserErrors.NO_SRC_IN_TABLES);
        }
        // Associations can only be part of ['1->1', '1->n', 'n->m']
        for (const type of Object.keys(configObject.associations[source])) {
          if (!['1->1', '1->n', 'n->m'].includes(type)) {
            throw new Error(ModelParserErrors.WRONG_RELATION);
          }
          // Targets must be an array
          if (!Array.isArray(configObject.associations[source][type])) {
            throw new Error(ModelParserErrors.TARGET_NOT_ARRAY);
          }
          // For each type, targets must be part of the model table
          for (const target of configObject.associations[source][type]) {
            if (!configObject.tables[target]) {
              throw new Error(ModelParserErrors.NO_TRG_IN_TABLES);
            }
          }
        }
      }
    }
  }
}

export default ModelParser;
