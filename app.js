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
import {getArchitecture, getCpus, getEOL, getHomedir, getUsername} from "./os-info.js";
import {fileManagerLog, printCurrentDirectory} from "./constant-functions.js";
import {handleError} from "./errorHandler.js";

//npm run start -- --username=your_username

const args = process.argv.slice(2);
const usernameArgIndex = args[0].indexOf('--username');
const username = args[0].slice(usernameArgIndex + 11);

let currentDirectory = os.homedir();

process.stdout.write(`Welcome to the File Manager, ${username}! \n`);
printCurrentDirectory(currentDirectory);
fileManagerLog();

process.stdin.on('data', (data) => {
    const args = data.toString().trim().split(' ');
    const commandArgs = args.slice(1);

    try {
        let operation = data.toString().trim();
        switch (operation) {
            case 'os --EOL': {
                process.stdout.write(`${getEOL()} \n`);
            }
                break;
            case 'os --cpus': {
                process.stdout.write(`${getCpus()}\n`);
            }
                break;
            case 'os --homedir': {
                process.stdout.write((`${getHomedir()} \n`));
            }
                break;
            case 'os --username': {
                process.stdout.write(`${getUsername()} \n`);
            }
                break;
            case 'os --architecture': {
                process.stdout.write(`${getArchitecture()} \n`);
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
            printCurrentDirectory(currentDirectory);
            fileManagerLog();
        }, 1000);

    } catch (error) {
        handleError(error);
    }
})

process.stdin.on('error', (err) => {
    handleError(err);
});

process.once('SIGINT', () => {
    process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
})
