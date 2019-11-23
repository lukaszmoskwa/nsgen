import FileUtils from '../core/file-utils';
import FolderUtils from '../core/folder-utils';
import { IProjectConfig } from '../utils';

class ConfigParser {
  public static parse(config: IProjectConfig, outDir: string): void {
    // Create the 'config' folder
    FolderUtils.createFolder(outDir, 'config');
    // Create the index.ts

    // Create .env
    FileUtils.createFile(outDir, '.env', function() {
      const db = config.db;
      for (const key of Object.keys(db)) {
        this.write(`# ${key}\n`);
        this.write(`DB_${key.toUpperCase()}=${db[key]}\n\n`);
      }
      this.end();
    });
    console.log('envvv');
  }
}

export default ConfigParser;
