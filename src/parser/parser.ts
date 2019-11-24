import FileUtils from '../core/file-utils';
import {
  gitignoreList,
  IConfigurationFile,
  IProjectConfig,
  packageDepencencies,
} from '../utils';
import ApiParser from './api-parser';
import ConfigParser from './config-parser';
import ModelParser from './model-parser';

class Parser {
  constructor(private configObject: IConfigurationFile) {
    this.initializeFiles(configObject.config);
    const parsersObject = this.getParsers();
    for (const param of ['config', 'model', 'api']) {
      this.configObject[param] = parsersObject[param].typeMap(
        this.configObject[param],
      );
      parsersObject[param].parse(this.configObject[param]);
    }
  }

  public getParsers() {
    return {
      api: ApiParser,
      config: ConfigParser,
      model: ModelParser,
    };
  }

  private initializeFiles(config: IProjectConfig) {
    // Create the package.json
    this.createPackageJSON(config);
    // Create the .gitignore
    this.createGitIgnore();
    // Create the README.md
    this.createREADME();
    // Create the main index.ts
    this.createIndex();
  }

  /**
   * Creates the package.json file starting from the given configuration
   * @param config configuration elements to create the package.json content
   */
  private createPackageJSON(config: IProjectConfig): void {
    const packageObject = {
      dependencies: packageDepencencies,
      description: config.description || '',
      name: config.name || '',
      version: '1.0.0',
    };
    FileUtils.createJSONFile('package.json', packageObject);
  }

  private createIndex() {
    FileUtils.createFile('index.ts', function() {
      this.write(`import express from 'express';\n`);
      this.write(`import BaseRouter from './api';\n\n`);
      this.write(`import config from './config';\n\n`);
      this.write(`const app = express();\n\n`);
      this.write(`app.use(express.json());\n\n`);
      this.write(`app.use('/api', BaseRouter);\n\n`);
      this.write(`const port = 3000;
      app.listen(port, () => {
          console.log('Express server started on port: ' + port);
      });`);
      this.end();
    });
  }

  /**
   * Creates a basic .gitignore file for the new project
   */
  private createGitIgnore(): void {
    FileUtils.createFile('.gitignore', function() {
      for (const ignore of gitignoreList) {
        this.write(`${ignore}\n`);
      }
      this.end();
    });
  }

  /**
   * Creates the README of the new project
   */
  private createREADME(): void {
    FileUtils.createFile('README.md', function() {
      this.write('TODO');
      this.end();
    });
  }
}

export default Parser;
