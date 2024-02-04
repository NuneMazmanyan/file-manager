import os from 'os';
import {
    addFile,
    changeDirectory,
    goToUpperDirectory,
    listDirectoryContents,
    moveFile,
    readContent, removeFile,
    renameFile, copyFile
} from './fs.js';
import {calculateHash} from "./hash.js";
import {compressFile, decompressFile} from "./zip.js";

//npm run start -- --username=your_username

const args = process.argv.slice(2);
const usernameArgIndex = args[0].indexOf('--username');
const username = args[0].slice(usernameArgIndex + 11);

let currentDirectory = os.homedir();

export const printCurrentDirectory = () => {
    console.log(`You are currently in ${currentDirectory}`);
};

process.stdout.write(`Welcome to the File Manager, ${username}! \n`);
printCurrentDirectory();
process.stdout.write('FileManager>');

process.stdin.on('data', (data) => {
    const args = data.toString().trim().split(' ');
    const commandArgs = args.slice(1);

    try {
        let operation = data.toString().trim();
        switch (operation) {
            case 'os --EOL': {
                process.stdout.write(`${os.EOL} \n`);
            }
                break;
            case 'os --cpus': {
                process.stdout.write(`${os.cpus().length}\n`);
            }
                break;
            case 'os --homedir': {
                process.stdout.write((`${os.homedir()} \n`));
            }
                break;
            case 'os --username': {
                process.stdout.write(`${os.userInfo().username} \n`);
            }
                break;
            case 'os --architecture': {
                process.stdout.write(`${process.arch} \n`);
            }
                break;
        }

        switch (operation.split(' ')[0]) {
            case 'up':
                currentDirectory = goToUpperDirectory(currentDirectory);
                break;
            case 'cd':
                currentDirectory = changeDirectory(currentDirectory, commandArgs[0]);
                break;
            case 'ls':
                listDirectoryContents(currentDirectory);
                break;

            case 'cat':
                readContent(currentDirectory, commandArgs[0]);
                break;
            case 'add':
                addFile(currentDirectory, commandArgs);
                break;
            case 'rn':
                renameFile(commandArgs[0], commandArgs[1]);
                break;
            case 'cp':
                copyFile(commandArgs[0], commandArgs[1]);
                break;
            case 'mv':
                moveFile(commandArgs[0], commandArgs[1]);
                break;
            case 'rm':
                removeFile(commandArgs[0]);
                break;

            case 'hash':
                calculateHash(commandArgs[0]);
                break;

            case 'compress':
                compressFile(commandArgs[0], commandArgs[1]);
                break;

            case 'decompress':
                decompressFile(commandArgs[0], commandArgs[1]);
                break;

            case '.exit':
                process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!`);
                process.exit(0);
                break;

            default:
                process.stdout.write('Invalid input \n');
                break;
        }

        setTimeout(() => {
            printCurrentDirectory()
            process.stdout.write('FileManager>');
        }, 1000);

    } catch (error) {
        console.error('Operation failed:', error.message);
    }
})

process.stdin.on('error', (err) => {
    console.error('Error occurred:', err);
});

process.once('SIGINT', () => {
    process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
})
