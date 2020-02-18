import FileUtils from '../core/file-utils';
import {
  gitignoreList,
  IConfigurationFile,
  IProjectConfig,
  packageDependencies,
} from '../utils';
import ApiParser from './api-parser';
import ConfigParser from './config-parser';
import ModelParser from './model-parser';
import Parser from './parser';

class MainParser {
  private parsers: Parser[] = [];
  constructor(private configObject: IConfigurationFile) {
    this.parsers = [new ConfigParser(), new ModelParser(), new ApiParser()];
  }

  public startParsing() {
    for (const p of this.parsers) {
      this.configObject[p.parserType] = p.typeMap(
        this.configObject[p.parserType],
      );
      p.parse(this.configObject[p.parserType]);
    }
    this.initializeFiles(this.configObject.config);
  }

  public validateConfiguration(): void {
    for (const parser of this.parsers) {
      parser.validate(this.configObject);
    }
  }

  /**
   * Function used to check if the provided configuration file is valid
   * or not
   */
  /* private isValidConfiguration(): boolean {
    return this.parsers
      .map((el) => {
        const isValid = el.validate();
        if (!isValid) {
          console.log('Error in configuration ' + el.parserType);
        } else {
          console.log(el.parserType + ' configuration - correct');
        }
        return isValid;
      })
      .reduce((a, b) => a && b);
  } */

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
      dependencies: packageDependencies,
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

export default MainParser;
