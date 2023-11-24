const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

class PM2 {
    async startApp(token, modelPath, appPath) {
        // Start the app
        return exec(
            `pm2 start ${appPath} --name ${token} -- ${token} ${modelPath}`,
            { cwd: process.cwd() }
        )
            .then(() => {
                console.log("App Started");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async stopApp(token) {
        // Stop the app
        return exec(`pm2 stop ${token}`, { cwd: process.cwd() })
            .then(() => {
                console.log("App Stopped");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async restartApp(token) {
        // Restart the app
        return exec(`pm2 restart ${token}`, { cwd: process.cwd() })
            .then(() => {
                console.log("App Restarted");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async deleteApp(token) {
        // Delete the app
        return exec(`pm2 delete ${token}`, { cwd: process.cwd() })
            .then(() => {
                console.log("App Deleted");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async checkAppStatus(token, callback) {
        // Check the app status
        return exec(`pm2 show ${token}`, { cwd: process.cwd() })
            .then((res) => {
                callback(true);
            })
            .catch((err) => {
                callback(false);
            });
    }

    async hasApp(token, callback) {
        // Check if app exists
        return exec(`pm2 show ${token}`, { cwd: process.cwd() })
            .then(() => {
                callback(true);
            })
            .catch((err) => {
                callback(false);
            });
    }
}

module.exports = new PM2();
