import NodeJSConfig from '../core/nodejs/nodejs-config';
import { IProjectConfig } from '../utils';
import Parser from './parser';

class ConfigParser extends Parser {
  public parserType = 'config';

  public parse(config: IProjectConfig): void {
    global.configuration.config = config;
    NodeJSConfig.initializeFiles(config.db);
  }

  public typeMap(config: IProjectConfig): IProjectConfig {
    return config;
  }

  public validate(config: IProjectConfig): boolean {
    return true;
  }
}

export default ConfigParser;
