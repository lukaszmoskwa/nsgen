import fs from 'fs';
import path from 'path';

class FileUtils {
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
