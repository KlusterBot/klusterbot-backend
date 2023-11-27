const { genHash, compareHash, genId, genUnique } = require("../helpers");
const sendResponse = require("../helpers/response");
const query = require("../helpers/query");
const pm2 = require("../services/pm2");

const fs = require("fs");
const path = require("path");

class AIController {
    async add(res, payload) {
        const { id } = res.user;
        const { company, website, document } = payload;

        const users = await query("SELECT * FROM users WHERE id = ?", [id]);
        const { token } = users[0];

        const modelPath = path.join(__dirname, `../models/${token}.txt`);
        const appPath = path.join(__dirname, `../bot/kluster.js`);

        try {
            fs.writeFileSync(modelPath, document);
            pm2.hasApp(token, async (status) => {
                if (status) {
                    await pm2.restartApp(token);
                    await query(
                        "UPDATE users SET verified = 'true', company = ?, website = ? WHERE id = ?",
                        [company, website, id]
                    );
                    sendResponse(
                        res,
                        200,
                        true,
                        "Chatbot Restarted Successfully"
                    );
                } else {
                    await pm2.startApp(token, modelPath, appPath);
                    await pm2.checkAppStatus(token, async (status) => {
                        if (status) {
                            await query(
                                "UPDATE users SET verified = 'true', company = ?, website = ? WHERE id = ?",
                                [company, website, id]
                            );
                            sendResponse(
                                res,
                                200,
                                true,
                                "Chatbot Started Successfully"
                            );
                        } else {
                            sendResponse(
                                res,
                                500,
                                true,
                                "Something went wrong"
                            );
                        }
                    });
                }
            });
        } catch (e) {
            console.log(e);
            sendResponse(res, 500, true, "Something went wrong");
        }
    }

    async delete(res) {
        const { id } = res.user;

        const users = await query("SELECT * FROM users WHERE id = ?", [id]);
        const { token } = users[0];

        const modelPath = path.join(__dirname, `../models/${token}.txt`);

        try {
            fs.unlinkSync(modelPath);
            pm2.hasApp(token, async (status) => {
                if (status) {
                    await pm2.stopApp(token);
                    await pm2.deleteApp(token);
                    sendResponse(
                        res,
                        200,
                        true,
                        "Chatbot Deleted Successfully"
                    );
                } else {
                    sendResponse(
                        res,
                        200,
                        true,
                        "Chatbot Deleted Successfully"
                    );
                }
            });
        } catch (e) {
            console.log(e);
            sendResponse(res, 500, true, "Something went wrong");
        }
    }

    async stop(res) {
        const { id } = res.user;

        const users = await query("SELECT * FROM users WHERE id = ?", [id]);
        const { token } = users[0];

        try {
            pm2.hasApp(token, async (status) => {
                if (status) {
                    await pm2.stopApp(token);
                    sendResponse(
                        res,
                        200,
                        true,
                        "Chatbot Stopped Successfully"
                    );
                } else {
                    sendResponse(
                        res,
                        200,
                        true,
                        "Chatbot Stopped Successfully"
                    );
                }
            });
        } catch (e) {
            console.log(e);
            sendResponse(res, 500, true, "Something went wrong");
        }
    }

    async start(res) {
        const { id } = res.user;

        const users = await query("SELECT * FROM users WHERE id = ?", [id]);
        const { token } = users[0];

        const modelPath = path.join(__dirname, `../models/${token}.txt`);
        const appPath = path.join(__dirname, `../bot/kluster.js`);

        try {
            pm2.hasApp(token, async (status) => {
                if (status) {
                    await pm2.restartApp(token);
                    sendResponse(
                        res,
                        200,
                        true,
                        "Chatbot Started Successfully"
                    );
                } else {
                    await pm2.startApp(token, modelPath, appPath);
                    await pm2.checkAppStatus(token, (status) => {
                        if (status) {
                            sendResponse(
                                res,
                                200,
                                true,
                                "Chatbot Started Successfully"
                            );
                        } else {
                            sendResponse(
                                res,
                                500,
                                true,
                                "Something went wrong"
                            );
                        }
                    });
                }
            });
        } catch (e) {
            console.log(e);
            sendResponse(res, 500, true, "Something went wrong");
        }
    }

    async stats(res) {
        const { id } = res.user;

        const users = await query("SELECT * FROM users WHERE id = ?", [id]);
        const { token } = users[0];

        try {
            const visitors = await query(
                "SELECT * FROM visitors WHERE user_id = ?",
                [id]
            );
            const messages = await query(
                "SELECT * FROM messages WHERE msg_from = ? OR msg_to = ?",
                [id, id]
            );

            let average = 0;
            if (visitors.length > 0) {
                average = messages.length / visitors.length;
            }

            sendResponse(res, 200, false, "Chatbot Stats", {
                visitors: visitors.length,
                messages: messages.length,
                average,
            });
        } catch (e) {
            console.log(e);
            sendResponse(res, 500, true, "Something went wrong");
        }
    }

    async notify(res, payload) {
        const { id, reason } = payload;

        try {
            const visitors = await query("SELECT * FROM visitors WHERE visitor_id = ?", [id]);
            const { name, email, user_id } = visitors[0];

            const users = await query("SELECT * FROM users WHERE id = ?", [user_id]);
            const user_email = users[0].email;

            fetch("https://api.useplunk.com/v1/track", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.PLUNK_API_KEY}`,
                },
                body: JSON.stringify({
                    event: "human-required",
                    email: user_email,
                    data: {
                        email: email,
                        name: name,
                        reason: reason,
                    },
                }),
            }).then((res) => {
                sendResponse(res, 200, true, "Email Sent Successfully");
            }).catch((e) => {
                console.log(e);
                sendResponse(res, 500, true, "Something went wrong");
            });

        } catch (e) {
            console.log(e);
            sendResponse(res, 500, true, "Something went wrong");
        }
    }
}

module.exports = AIController;
