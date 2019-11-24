import FileUtils from '../core/file-utils';
import FolderUtils from '../core/folder-utils';
import { IApiConfig, IApiMethodsConfig, IModelTableConfig } from '../utils';

class ApiParser {
  public static parse(apis: IApiConfig[]): void {
    global.configuration.api = apis;
    ApiParser.initializeFiles(apis);
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

  private static getMethodString(
    method: string,
    model: IModelTableConfig,
  ): string {
    const modelName = model.name[0].toUpperCase() + model.name.slice(1);
    switch (method) {
      case 'get':
        return `const result = await ${modelName}.findAll();\n`;
      case 'post':
        return `const result = await ${modelName}.create(req.body);\n`;
      case 'put':
        return `const result = await ${modelName}.update(req.body,{where: {id: body.id}});\n`;
      case 'delete':
        return `const result = await ${modelName}.destroy({where: {id: body.id}});\n`;
    }
  }

  private static createRoutingIndex(apis: IApiConfig[]) {
    FileUtils.createFile('api/index.ts', function() {
      this.write(`import { Router } from 'express';\n`);
      for (const api of apis) {
        const apiName = api.endpoint[0].toUpperCase() + api.endpoint.slice(1);
        this.write(
          `import ${apiName}Router from './${apiName.toLowerCase()}';\n`,
        );
      }
      this.write('\nconst router = Router();\n');
      for (const api of apis) {
        const apiName = api.endpoint[0].toUpperCase() + api.endpoint.slice(1);
        this.write(
          `router.use('/${apiName.toLowerCase()}', ${apiName}Router);\n`,
        );
      }
      this.write(`\nexport default router;`);
      this.end();
    });
  }

  private static initializeFiles(apis: IApiConfig[]) {
    // Create the 'config' folder
    FolderUtils.createFolder('api');

    // Create a route file for every api
    for (const api of apis) {
      FileUtils.createFile(`api/${api.endpoint}.ts`, function() {
        this.write(
          `import { Request, Response, Router, Express } from 'express';\n`,
        );
        this.write(`const seq = require('../sequelize');\n`);
        if (api.model) {
          const modelName =
            api.model.name[0].toUpperCase() + api.model.name.slice(1);
          this.write(`const ${modelName} = seq.default.${modelName};\n`);
        }
        this.write('const router = Router();\n\n');
        for (const method of api.methods) {
          this.write(
            `router.${method.type}('/', async (req: Request, res: Response) => {\n`,
          );
          if (api.model) {
            this.write(`
        try {
            const body = req.body;
            ${ApiParser.getMethodString(method.type, api.model)}
            return res.status(200).json(result);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: err,
            });
        }\n`);
          } else {
            this.write('\n\t// Write here your code\n\n');
            this.write(
              '\n\treturn res.status(200).json({message: "http-Method not yet implemented"});\n\n',
            );
          }
          this.write('});\n\n');
        }
        this.write('export default router;');
        this.end();
      });
    }

    // Create the index.ts in api
    ApiParser.createRoutingIndex(apis);
  }
}

export default ApiParser;
