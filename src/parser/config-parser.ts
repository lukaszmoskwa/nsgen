import FileUtils from '../core/file-utils';
import FolderUtils from '../core/folder-utils';
import { IDBConfig, IProjectConfig, TSConfigObject } from '../utils';

class ConfigParser {
  public static parse(config: IProjectConfig): void {
    // Create the 'config' folder
    FolderUtils.createFolder(outDir, 'config');
    // Create the index.ts
    this.createConfigIndex(config.db);
    // Create .env
    this.createDotEnv(config.db);
    // Create a tsconfig.json
    this.createTSConfig();
  }

  /**
   * Creates a 'index.ts' file in the 'config' folder
   * @param db DBconfig elements
   * @param outDir Root directory fo the new project
   */
  private static createConfigIndex(db: IDBConfig) {
    FileUtils.createFile('config/index.ts', function() {
      this.write('import dotenv from "dotenv";\n\n');
      this.write('dotenv.config();\n\n');
      this.write('export default {\n');
      for (const key of Object.keys(db)) {
        this.write(`\tdb_${key}: process.env.DB_${key.toUpperCase()},\n`);
      }
      this.write('}');
      this.end();
    });
  }

  /**
   * Creates a '.env' file in the root folder of the new project
   * @param db DBconfig elements
   * @param outDir Root directory for the new project
   */
  private static createDotEnv(db: IDBConfig) {
    FileUtils.createFile('.env', function() {
      for (const key of Object.keys(db)) {
        this.write(`# ${key}\n`);
        this.write(`DB_${key.toUpperCase()}=${db[key]}\n\n`);
      }
      this.end();
    });
  }

  /**
   * Cretaes a tsconfig.json in the root folder of the new project
   * @param outDir Root directory for the new project
   */
  private static createTSConfig() {
    FileUtils.createJSONFile('tsconfig.json', TSConfigObject);
  }
}

export default ConfigParser;
