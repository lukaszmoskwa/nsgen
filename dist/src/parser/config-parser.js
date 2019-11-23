"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = __importDefault(require("../core/file-utils"));
const folder_utils_1 = __importDefault(require("../core/folder-utils"));
class ConfigParser {
    static parse(config, outDir) {
        // Create the 'config' folder
        folder_utils_1.default.createFolder(outDir, 'config');
        // Create the index.ts
        file_utils_1.default.createFile(outDir, 'config/index.ts', function () {
            this.write('import dotenv from "dotenv";\n\n');
            this.write('dotenv.config();\n\n');
            this.write('export default {\n');
            for (const key of Object.keys(config.db)) {
                this.write(`db_${key}: process.env.DB_${key.toUpperCase()},\n`);
            }
            this.write('}');
            this.end();
        });
        // Create .env
        file_utils_1.default.createFile(outDir, '.env', function () {
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
exports.default = ConfigParser;
//# sourceMappingURL=config-parser.js.map