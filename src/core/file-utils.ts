import ejs from 'ejs';
import fs from 'fs';
import path from 'path';

class FileUtils {
  public static createJSONFile(filename: string, JSONobject: {}) {
    fs.writeFileSync(
      path.join(global.outDir, filename),
      JSON.stringify(JSONobject, null, 4),
    );
  }

  public static createFromTemplate(
    template: string,
    filename: string,
    params: object,
  ) {
    const templatePath = path.join(
      global.appDir,
      'core/nodejs/templates',
      template + '.ejs',
    );
    ejs.renderFile(templatePath, params, null, (err, data) => {
      console.log(err, data);
      this.createFile(filename, function() {
        this.write(data);
        this.end();
      });
    });
  }

  public static createFile(
    filename: string,
    fn: (stream?: fs.WriteStream) => void,
  ): void {
    const stream = fs.createWriteStream(path.join(global.outDir, filename));
    fn = fn.bind(stream);
    stream.once('open', fn);
  }
}

export default FileUtils;
