const node_ssh = require('node-ssh');
const deploymentTarget = require('./deployment.target.js');
const chalk = require('chalk');

async function sshLiveExec(ssh, command, options = {}) {
    await ssh.execCommand(command, {
        ...options,
        onStdout: (chunk) => console.log(chunk.toString()),
        onStderr: (chunk) => console.log(chulk.red(chunk.toString())),
    });
}

async function copyFiles(ssh, localDirPath, remoteDirPath) {    
    await sshLiveExec(ssh, 'cd ~');
    console.log(chalk.green('connected, copying files...'));
    const success = await ssh.putDirectory(localDirPath, remoteDirPath, {
        recursive: true,
        tick: function(localPath, remotePath, error) {
            if (error) {
                console.log(chalk.red(`failed copying ${localPath} into ${remotePath}: ${error}`));
            } else {
                console.log(chalk.green(`copied ${localPath} into ${remotePath}`));
            }
        }      
    });
    if (!success) {
        console.log(chalk.red("couldn't copy some files"));
        throw new Error("couldn't copy some files");
    }
    console.log(chalk.green('done copying files.'));               
}

async function restartServer(ssh) {
    console.log(chalk.blue("Killing active node processes..."));        
    await sshLiveExec(ssh, 'killall -q node');
    console.log(chalk.blue("Installing NPM packages..."));
    await sshLiveExec(ssh, 'cd ~/www && npm install --only=prod --loglevel=error');
    console.log(chalk.blue("starting node server..."));
    await sshLiveExec(ssh, 'cd ~/www && LISTENING_PORT=80 screen -d -m node server.js');
    console.log(chalk.green("node server started."));
}

async function main() {    
    console.log(chalk.blue(`connecting to ${deploymentTarget.host}...`));    
    ssh = new node_ssh()
    await ssh.connect(deploymentTarget);
    try {
        await copyFiles(ssh, './dist', 'www');
        await ssh.putFile('./package.json', 'www/package.json');
        await restartServer(ssh);
    }
    finally {
        ssh.dispose();
    }    
}

main();