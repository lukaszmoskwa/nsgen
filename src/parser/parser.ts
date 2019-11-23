import { PathLike } from 'fs';
import { IConfigurationFile } from '../utils';
import ConfigParser from './config-parser';

class Parser {
  constructor(
    private configObject: IConfigurationFile,
    private outDir: PathLike,
  ) {
    // chiamare chi crea package.json
    // chiamare chi crea .eslintrc
    // chiamare chi crea .gitignore
    // chiamare chi crea README.md

    const parsersObject = this.getParsers();
    for (const param of Object.keys(parsersObject)) {
      parsersObject[param].parse(this.configObject[param], this.outDir);
    }
    console.log('chiamatooo');
  }

  public getParsers() {
    return {
      config: ConfigParser,
    };
  }
}

export default Parser;
