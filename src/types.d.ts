import { IConfigurationFile } from './utils';

export {};

declare global {
  namespace NodeJS {
    interface Global {
      outDir: string;
      appDir: string;
      configuration: IConfigurationFile;
    }
  }
}
