import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import yamljs from 'yamljs';
import yargs from 'yargs';
import MainParser from './parser/main-parser';
import { APP_VERSION, IConfigurationFile } from './utils';

// Get args from command line
const argv =
  // .epilog('Check the full documentation at https://<link>.com')
  yargs
    .usage('Usage: $0 <command> [options]')
    // .command('config', 'Count the lines in a file')
    // .example('$0 count -f foo.js', 'count the lines in the given file')
    // .alias('c', 'config')
    .nargs('config', 1)
    .describe('config', 'Load a configuration file')
    .nargs('path', 1)
    .describe(
      'path',
      'Choose an output folder for your project different than the current one',
    )
    // .demandOption(['config'])
    .help('h')
    .alias('h', 'help').argv;

if (argv.v) {
  console.log(chalk.bold('nsgen') + ' version ' + APP_VERSION);
  process.exit(1);
}
global.configuration = {};
global.outDir = argv.path ? (argv.path as string) : process.cwd();
global.appDir = path.dirname(require.main.filename);

if (argv.config) {
  try {
    const filename: string = argv.config as string;
    if (fs.existsSync(filename)) {
      const configFile: IConfigurationFile = yamljs.load(filename);
      const parser = new MainParser(configFile);
      parser.validateConfiguration();
      parser.startParsing();
    }
  } catch (err) {
    // console.error(err);
    console.log(chalk.bold.red(err));
  }
} else {
  console.log(chalk.bold.red('Missing configuration file!'));
}
