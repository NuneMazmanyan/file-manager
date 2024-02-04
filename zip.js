import path from "path";
import fs from 'fs';
import zlib from 'zlib';

export const compressFile = (sourcePath, destinationPath) => {
    const inputStream = fs.createReadStream(sourcePath);
    const brotliStream = zlib.createBrotliCompress();
    const outputStream = fs.createWriteStream((path.join(destinationPath, `${path.parse(sourcePath).name}.gz`)));

    inputStream.pipe(brotliStream).pipe(outputStream);
};

export const decompressFile = (sourcePath, destinationPath) => {
    const inputStream = fs.createReadStream(sourcePath);
    const brotliStream = zlib.createBrotliCompress();
    const outputStream = fs.createWriteStream((path.join(destinationPath, `${path.parse(sourcePath).name}.txt`)));

    inputStream.pipe(brotliStream).pipe(outputStream);
};