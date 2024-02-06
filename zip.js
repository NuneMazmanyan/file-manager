import path from "path";
import fs from 'fs';
import zlib from 'zlib';

export const compressFile = (sourcePath, destinationPath) => {
    const inputStream = fs.createReadStream(sourcePath);
    const outputStream = fs.createWriteStream(path.join(destinationPath, `${path.parse(sourcePath).name}.gz`));

    inputStream.pipe(zlib.createBrotliCompress()).pipe(outputStream);
};

export const decompressFile = (sourcePath, destinationPath) => {
    const inputStream = fs.createReadStream(sourcePath);
    const outputStream = fs.createWriteStream(path.join(destinationPath, `${path.parse(sourcePath).name}.txt`));

    inputStream.pipe(zlib.createBrotliDecompress()).pipe(outputStream);
};
