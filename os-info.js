import os from 'os';

export const getEOL = () => {
    return os.EOL;
}

export const getCpus = () => {
    return os.cpus().length;
}

export const getHomedir = () => {
    return os.homedir();
}

export const getUsername = () => {
    return os.userInfo().username;
}
export const getArchitecture = () => {
    return os.arch();
}