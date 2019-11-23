import FileUtils from '../core/file-utils';
import { IConfigurationFile, packageDepencencies } from '../utils';
import ConfigParser from './config-parser';

class Parser {
  constructor(
    private configObject: IConfigurationFile,
    private outDir: string,
  ) {
    // chiamare chi crea package.json
    const packageObject = {
      dependencies: packageDepencencies,
      description: configObject.config.description || '',
      name: configObject.config.name || '',
      version: '1.0.0',
    };
    FileUtils.createJSONFile(outDir, 'package.json', packageObject);
    // chiamare chi crea .eslintrc
    // chiamare chi crea .gitignore
    // chiamare chi crea README.md

    const parsersObject = this.getParsers();
    for (const param of Object.keys(parsersObject)) {
      parsersObject[param].parse(this.configObject[param], this.outDir);
    }
  }

  public getParsers() {
    return {
      config: ConfigParser,
    };
  }
}

export default Parser;
