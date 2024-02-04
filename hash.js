import { createHash } from 'node:crypto';
import fs from 'fs';
export const calculateHash = (path) => {
    const hash = createHash('sha256');
    const readableStream = fs.createReadStream(path);

    readableStream.on('data', (data)=>{
        hash.update(data);
    })
    readableStream.on('error', (error) => {
        console.error(`Error reading the file: ${error.message}`);
    });
    readableStream.on('end', () => {
        console.log(hash.digest('hex'));
    });
};