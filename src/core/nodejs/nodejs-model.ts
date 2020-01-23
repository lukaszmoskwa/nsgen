import { IModelTableConfig, IModelValueConfig } from '../../utils';
import FileUtils from '../file-utils';
import FolderUtils from '../folder-utils';

class NodeJSModel {
  public static initializeFiles(tables: IModelTableConfig[]) {
    // Create the 'config' folder
    FolderUtils.createFolder('models');
    // Create the 'model' files for each table
    for (const table of tables) {
      FileUtils.createFromTemplate(
        'models/model.ts',
        `models/${table.name}.ts`,
        {
          getValueType: this.getValueType,
          table,
          tableName: table.name[0].toUpperCase() + table.name.slice(1),
          values: table.values,
        },
      );
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
  private static createSequelizeFile(tables: IModelTableConfig[]) {
    FileUtils.createFromTemplate('sequelize', 'sequelize.ts', {
      tables,
    });
  }

  /**
   * Retrieve the string corresponding to the type chosen by the user
   * Datatype link: https://sequelize.org/master/manual/data-types.html
   * @param className Object or String containg information about the type
   */
  private static getValueType(
    className: string | { type: string; check?: {} },
  ): string {
    let valueType: string;
    const { type, check } = className as { type: string; check?: string };
    if (type) {
      valueType = `type.${type.toUpperCase()}`;
      if (check) {
        valueType += `,\n\tvalidate: {\n`;
        for (const attribute of Object.keys(check)) {
          valueType += `\t\t${attribute}: ${check[attribute]}, \n`;
        }
        valueType += '\t}\n';
      }
    } else {
      valueType = `type.${(className as string).toUpperCase()}`;
    }
    return valueType;
  }
}

export default NodeJSModel;
