import { IApiConfig, IModelTableConfig } from '../../utils';
import FileUtils from '../file-utils';
import FolderUtils from '../folder-utils';

class NodeJSApi {
  public static initializeFiles(apis: IApiConfig[]) {
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
            this.write(`\ttry {
                    const body = req.body;
                    ${NodeJSApi.getMethodString(method.type, api.model)}
                    return res.status(200).json(result);
                } catch (err) {
                    console.log(err);
                    return res.status(400).json({
                        error: err,
                    });
                }\n`);
          } else {
            this.write('\t// Write here your code\n');
            this.write(
              '\treturn res.status(200).json({message: "http-Method not yet implemented"});\n',
            );
          }
          this.write('});\n\n');
        }
        this.write('export default router;');
        this.end();
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
}

export default NodeJSApi;
