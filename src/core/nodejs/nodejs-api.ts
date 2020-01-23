import { IApiConfig, IModelTableConfig } from '../../utils';
import FileUtils from '../file-utils';
import FolderUtils from '../folder-utils';

class NodeJSApi {
  public static initializeFiles(apis: IApiConfig[]) {
    // Create the 'config' folder
    FolderUtils.createFolder('api');

    // Create a route file for every api
    for (const api of apis) {
      FileUtils.createFromTemplate('api/api.ts', `api/${api.endpoint}.ts`, {
        api,
        getMethodString: this.getMethodString,
      });
    }

    // Create the index.ts in api
    NodeJSApi.createRoutingIndex(apis);
  }

  private static getMethodString(
    method: string,
    model: IModelTableConfig,
  ): string {
    const modelName = model.name[0].toUpperCase() + model.name.slice(1);
    switch (method) {
      case 'get':
        return `const result = await ${modelName}.findAll();`;
      case 'post':
        return `const result = await ${modelName}.create(req.body);`;
      case 'put':
        return `const result = await ${modelName}.update(req.body,{where: {id: body.id}});`;
      case 'delete':
        return `const result = await ${modelName}.destroy({where: {id: body.id}});`;
    }
  }

  private static createRoutingIndex(apis: IApiConfig[]) {
    FileUtils.createFromTemplate('api/index.ts', 'api/index.ts', {
      apis,
    });
  }
}

export default NodeJSApi;
