export const printCurrentDirectory = (currentDirectory) => {
    console.log(`You are currently in ${currentDirectory}`);
};

export const fileManagerLog = () => {
    process.stdout.write('FileManager>');
}