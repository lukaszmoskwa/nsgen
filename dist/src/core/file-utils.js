"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileUtils {
    static createJSONFile(filename, JSONobject) {
        fs_1.default.writeFileSync(path_1.default.join(global.outDir, filename), JSON.stringify(JSONobject, null, 4));
    }
    static createFromTemplate(template, filename, params) {
        const templatePath = path_1.default.join(global.appDir, 'core/nodejs/templates', template + '.ejs');
        ejs_1.default.renderFile(templatePath, params, null, (err, data) => {
            // console.log(err, data);
            this.createFile(filename, function () {
                this.write(data);
                this.end();
            });
        });
    }
    static createFile(filename, fn) {
        const stream = fs_1.default.createWriteStream(path_1.default.join(global.outDir, filename));
        fn = fn.bind(stream);
        stream.once('open', fn);
    }
}
exports.default = FileUtils;
//# sourceMappingURL=file-utils.js.map