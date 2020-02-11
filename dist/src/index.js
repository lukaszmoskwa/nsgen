"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
const yargs_1 = __importDefault(require("yargs"));
const main_parser_1 = __importDefault(require("./parser/main-parser"));
const utils_1 = require("./utils");
// Get args from command line
const argv = 
// .epilog('Check the full documentation at https://<link>.com')
yargs_1.default
    .usage('Usage: $0 <command> [options]')
    // .command('config', 'Count the lines in a file')
    // .example('$0 count -f foo.js', 'count the lines in the given file')
    // .alias('c', 'config')
    .nargs('config', 1)
    .describe('config', 'Load a configuration file')
    .nargs('path', 1)
    .describe('path', 'Choose an output folder for your project different than the current one')
    // .demandOption(['config'])
    .help('h')
    .alias('h', 'help').argv;
if (argv.v) {
    console.log(chalk_1.default.bold('nsgen') + ' version ' + utils_1.APP_VERSION);
    process.exit(1);
}
global.configuration = {};
global.outDir = argv.path ? argv.path : process.cwd();
global.appDir = path_1.default.dirname(require.main.filename);
if (argv.config) {
    try {
        const filename = argv.config;
        if (fs_1.default.existsSync(filename)) {
            const configFile = yamljs_1.default.load(filename);
            const parser = new main_parser_1.default(configFile);
        }
    }
    catch (err) {
        // console.error(err);
        console.log(chalk_1.default.bold.red(err));
    }
}
else {
    console.log(chalk_1.default.bold.red('Missing configuration file!'));
}
//# sourceMappingURL=index.js.map