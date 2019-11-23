import chalk from 'chalk';
import fs, { PathLike } from 'fs';
import yamljs from 'yamljs';
import yargs from 'yargs';
import Parser from './parser/parser';
import { APP_VERSION, IConfigurationFile } from './utils';

// Get args from command line
const argv = yargs
  .usage('Usage: $0 <command> [options]')
  // .command('config', 'Count the lines in a file')
  // .example('$0 count -f foo.js', 'count the lines in the given file')
  // .alias('c', 'config')
  .nargs('config', 1)
  .describe('config', 'Load a configuration file')
  // .demandOption(['config'])
  .help('h')
  .alias('h', 'help')
  .epilog('Check the full documentation at https://adasd.com').argv;

if (argv.v) {
  console.log(chalk.bold('nsgen') + ' version ' + APP_VERSION);
  process.exit(1);
}

const outDir: PathLike = argv.path ? (argv.path as PathLike) : process.cwd();

if (argv.config) {
  try {
    const filename: PathLike = argv.config as PathLike;
    if (fs.existsSync(filename)) {
      const configFile: IConfigurationFile = yamljs.load(filename);
      console.log(configFile);
      const parser = new Parser(configFile, outDir);
    }
  } catch (err) {
    console.error(err);
  }
} else {
  console.log(chalk.bold.red('Missing configuration file!'));
}

// const m_file = new Parser('documentation/nsgen/mkdocs.yml');
