import os from "os";
import path from "path";
import fs from "fs";
import {printCurrentDirectory} from "./app.js";

export const goToUpperDirectory = (currentDirectory) => {
    if (currentDirectory !== os.homedir()) {
        return path.resolve(currentDirectory, '..');
    } else {
        console.log('Cannot go above root directory');
    }
}
export const changeDirectory = (currentDirectory, targetDirectory) => {
    const resolvedPath = path.resolve(currentDirectory, targetDirectory);
    console.log(currentDirectory);
    console.log(resolvedPath);
    if (resolvedPath === currentDirectory) {
        console.log('Invalid directory: Cannot go above root directory');
    } else {
        if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
            return resolvedPath;
        } else {
            console.log('Invalid directory');
            console.log(currentDirectory);
            console.log(resolvedPath);
        }
    }
};

export  const listDirectoryContents = (currentDirectory) => {
    const list = [];
    fs.readdir(currentDirectory, (err, files) => {
        files = files.sort();
        files.forEach((file, index) => {
            if ((path.extname(file) ? 'file' : 'directory') === 'directory') {
                files.splice(files.findIndex(element => element === file), 1)
                files.unshift(file)
            }
        })
        files.forEach((file, index) => {
            list.push({index: index, name: file, type: path.extname(file) ? 'file' : 'directory'});
        })
    })
    setTimeout(() => {
        printTable(list);
    }, 5000); //I wrote the call in setTimeout to be sure the list is complete
};

export const printTable = (data) => {
    console.log('index\t\t\tName\t\tType');
    console.log('--------------------------------------------');

    data.forEach(({index, name, type}) => {
        console.log(`${index.toString().padEnd(5)}\t${name.padEnd(30)}\t${type}`);
    });

    printCurrentDirectory();
    process.stdout.write('FileManager>');
};

export const readContent = (currentDirectory, targetDirectory) => {
    const resolvedPath = path.resolve(currentDirectory, targetDirectory);
    if (resolvedPath === currentDirectory) {
        console.log('Invalid directory: Cannot go above root directory');
    } else {
        const readStream = fs.createReadStream(resolvedPath, {encoding: 'utf8'});
        readStream.on('data', (data) => {
            process.stdout.write(data);
        });
    }
}

export const copyFile = (sourcePath, destinationPath) => {
    const sourceStream = fs.createReadStream(sourcePath);
    const destinationStream = fs.createWriteStream(destinationPath);

    sourceStream.on('error', (err) => {
        console.error('Error reading source file:', err);
    });

    destinationStream.on('error', (err) => {
        console.error('Error writing to destination file:', err);
    });

    destinationStream.on('finish', () => {
        console.log(`File copied from ${sourcePath} to ${destinationPath} successfully.`);
    });

    sourceStream.pipe(destinationStream);
};

export const moveFile = (sourcePath, destinationPath) => {
    const sourceStream = fs.createReadStream(sourcePath);
    const destinationStream = fs.createWriteStream(path.join(destinationPath, path.basename(sourcePath)));

    sourceStream.on('error', (err) => {
        console.error('Error reading source file:', err);
    });

    destinationStream.on('error', (err) => {
        console.error('Error writing to destination file:', err);
    });


    sourceStream.pipe(destinationStream);

    destinationStream.on('finish', () => {
        fs.unlink(sourcePath, (err) => {
            if (err) {
                console.error('Error deleting source file:', err);
            } else {
                console.log(`File moved from ${sourcePath} to ${destinationPath} successfully.`);
            }
        });
    });

};

export const addFile = (currentDirectory, commandArgs) => {
    fs.writeFile(path.join(currentDirectory, commandArgs[0]), '', (err) => {
        if (err) {
            console.error('Error creating file:', err);
        } else {
            console.log(`Empty file "${commandArgs[0]}" created successfully.`);
        }
    });
}

export const renameFile = (sourcePath, fileName) => {
    const destinationPath = path.join(path.dirname(sourcePath), fileName);

    try {
        if (!fs.existsSync(sourcePath) || fs.existsSync(destinationPath)) {
            throw new Error('FS operation failed');
        }

        fs.rename(sourcePath, destinationPath, (error) => {
            if (error) {
                throw error;
            }
            console.log('File renamed successfully');
        });
    } catch (error) {
        throw error;
    }
}

export const removeFile = (path) => {
    fs.unlink(path, () => {})
};