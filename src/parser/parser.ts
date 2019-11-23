import FileUtils from '../core/file-utils';
import {
  gitignoreList,
  IConfigurationFile,
  IProjectConfig,
  packageDepencencies,
} from '../utils';
import ConfigParser from './config-parser';

class Parser {
  constructor(private configObject: IConfigurationFile) {
    // Create the package.json
    this.createPackageJSON(configObject.config);
    // Create the .gitignore
    this.createGitIgnore();
    // Create the README.md
    this.createREADME();

    const parsersObject = this.getParsers();
    for (const param of Object.keys(parsersObject)) {
      parsersObject[param].parse(this.configObject[param]);
    }
  }

  public getParsers() {
    return {
      config: ConfigParser,
    };
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
