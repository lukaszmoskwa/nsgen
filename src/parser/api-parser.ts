import NodeJSApi from '../core/nodejs/nodejs-api';
import { IApiConfig, IApiMethodsConfig, IModelTableConfig } from '../utils';

class ApiParser {
  public static parse(apis: IApiConfig[]): void {
    global.configuration.api = apis;
    NodeJSApi.initializeFiles(apis);
  }

  public static typeMap(configObject: any): IApiConfig[] {
    const finalApis: IApiConfig[] = [];
    const apiNames: string[] = Object.keys(configObject);
    for (const endpoint of apiNames) {
      const methods: IApiMethodsConfig[] = [];
      if (configObject[endpoint].crud) {
        methods.push(
          { type: 'get' },
          { type: 'post' },
          { type: 'put' },
          { type: 'delete' },
        );
      } else {
        for (const methodName of Object.keys(configObject[endpoint])) {
          if (['get', 'post', 'put', 'delete'].includes(methodName)) {
            methods.push({
              type: methodName,
            });
          }
        }
      }
      const model: IModelTableConfig =
        global.configuration.model.find(
          (el) => el.name === configObject[endpoint].model,
        ) || null;

      const api: IApiConfig = {
        endpoint,
        methods,
        model,
      };
      finalApis.push(api);
    }
    return finalApis;
  }
}

export default ApiParser;
