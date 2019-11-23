import fs from 'fs';
import path from 'path';

class FileUtils {
  public static createJSONFile(
    outDir: string,
    filename: string,
    JSONobject: {},
  ) {
    fs.writeFileSync(
      path.join(outDir, filename),
      JSON.stringify(JSONobject, null, 4),
    );
  }

  public static createFile(
    outDir: string,
    filename: string,
    fn: (stream?: fs.WriteStream) => void,
  ): void {
    const stream = fs.createWriteStream(path.join(outDir, filename));
    fn = fn.bind(stream);
    stream.once('open', fn);
  }
}

export default FileUtils;
