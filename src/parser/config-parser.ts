import NodeJSConfig from '../core/nodejs/nodejs-config';
import { IProjectConfig } from '../utils';

class ConfigParser {
  public static parse(config: IProjectConfig): void {
    global.configuration.config = config;
    NodeJSConfig.initializeFiles(config.db);
  }

  public static typeMap(config: IProjectConfig): IProjectConfig {
    return config;
  }
}

export default ConfigParser;
