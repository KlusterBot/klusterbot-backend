const query = require("../helpers/query");
const { genUnique } = require("../helpers");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const UAParser = require("ua-parser-js");
const { createRxDatabase } = require("rxdb");
const { getRxStorageMemory } = require("rxdb/plugins/storage-memory");

const admins = {};
const visitors = {};

let db;

const usersSchema = {
    title: "users",
    description: "Users Database",
    version: 0,
    type: "object",
    primaryKey: "socket_id",
    properties: {
        id: {
            type: "string",
        },
        name: {
            type: "string",
        },
        profile: {
            type: "string",
        },
        type: {
            type: "string",
        },
        user_id: {
            type: "string",
        },
        socket_id: {
            type: "string",
            maxLength: 100,
        },
    },
};

const visitorsLockSchema = {
    title: "visitorsLock",
    description: "Visitors Locked from bot",
    version: 0,
    type: "object",
    primaryKey: "user_id",
    properties: {
        id: {
            type: "string",
        },
        user_id: {
            type: "string",
            maxLength: 100,
        },
    },
};

createRxDatabase({
    name: "klusterDB",
    storage: getRxStorageMemory(),
})
    .then(async (DB) => {
        db = DB;

        await db.addCollections({
            users: {
                schema: usersSchema,
                statics: {
                    async addUser(id, name, profile, type, user_id, socket_id) {
                        return this.upsert({
                            id,
                            name,
                            profile,
                            type,
                            user_id,
                            socket_id,
                        });
                    },
                },
            },
        });

        await db.addCollections({
            visitorsLock: {
                schema: visitorsLockSchema,
                statics: {
                    async addVisitor(id, user_id) {
                        return this.upsert({ id, user_id });
                    },
                },
            },
        });
    })
    .catch(console.log);

const users = {};

const addVisitor = async (id, key) => {
    try {
        const check = await query(
            "SELECT * FROM visitors WHERE visitor_id = ?",
            [id]
        );
        if (check.length == 0) {
            await query(
                "INSERT INTO visitors(visitor_id,user_id) VALUES(?,?)",
                [id, key]
            );
        }
    } catch (error) {
        throw error;
    }
};

const setOnline = (id) => {
    query("UPDATE visitors SET status = ? WHERE visitor_id = ?", [
        "online",
        id,
    ]);
};

const setOffline = (id) => {
    query("UPDATE visitors SET status = ? WHERE visitor_id = ?", [
        "offline",
        id,
    ]);
};

const getVisitor = async (id) => {
    return await query("SELECT * FROM visitors WHERE visitor_id = ?", [id]);
};

const setVisitorName = (id, name) => {
    query("UPDATE visitors SET name = ? WHERE visitor_id = ?", [name, id]);
};

const setVisitorEmail = (id, email) => {
    query("UPDATE visitors SET email = ? WHERE visitor_id = ?", [email, id]);
};

const setVisitorPhone = (id, phone) => {
    query("UPDATE visitors SET phone = ? WHERE visitor_id = ?", [phone, id]);
};

const setVisitorCountry = (id, country) => {
    query("UPDATE visitors SET country = ? WHERE visitor_id = ?", [
        country,
        id,
    ]);
};

const getUserBalance = async (id) => {
    let balance = await query("SELECT balance FROM users WHERE id = ?", [id]);
    return Number(balance[0].balance);
};

const getUserId = (socketId) => {
    let id = null;
    Object.keys(admins).forEach(function (key) {
        if (admins[key] == socketId) {
            id = key;
        }
    });
    return id;
};

const addCall = async (visitor_id, user_id) => {
    let balance = await query("SELECT balance FROM users WHERE id = ?", [
        user_id,
    ]);
    balance = Number(balance[0].balance) || 0;

    if (balance != 0) {
        let newBalance = balance - 1;
        //Charge User
        await query("UPDATE users SET balance = ? WHERE id = ?", [
            newBalance,
            user_id,
        ]);

        // Store call
        await query("INSERT INTO calls(user_id, visitor_id) VALUES(?,?)", [
            user_id,
            visitor_id,
        ]);
        return true;
    }
    return false;
};

const Socket = (io) => {
    io.use(async (socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            let token = socket.handshake.query.token;

            if (socket.handshake.query.type) {
                try {
                    let user = await query(
                        "SELECT * FROM users WHERE (token = ? AND token != '')",
                        [token]
                    );
                    if (user.length !== 0) {
                        let bot = user[0];

                        // //Add Bot to database
                        const name =
                            socket.handshake.query?.name === ""
                                ? bot.name
                                : socket.handshake.query?.name;
                        const logo =
                            socket.handshake.query?.logo === ""
                                ? bot.logo
                                : socket.handshake.query?.logo;

                        try {
                            await db.users.addUser(
                                bot.id,
                                name,
                                logo,
                                "bot",
                                bot.id,
                                socket.id
                            );
                        } catch (error) {}

                        socket.user = user[0];
                        return next();
                    } else {
                        return next(new Error("Authentication error"));
                    }
                } catch (error) {
                    return next(new Error("Authentication error"));
                }
            }

            jwt.verify(
                socket.handshake.query.token,
                JWT_SECRET,
                async function (err, decoded) {
                    if (err) return next(new Error("Authentication error"));
                    socket.user = decoded;

                    let admin = (
                        await query("SELECT * FROM users WHERE (id = ?)", [
                            decoded.id,
                        ])
                    )[0];

                    //Add Admin to database
                    try {
                        await db.users.addUser(
                            admin.id,
                            admin.name,
                            admin.logo,
                            decoded.type,
                            admin.id,
                            socket.id
                        );
                    } catch (error) {}

                    // Change Active Status
                    if (decoded.type === "admin") {
                        await query(
                            "UPDATE users SET status = ? WHERE id = ?",
                            ["online", decoded.id]
                        );
                    } else {
                        await query(
                            "UPDATE supports SET status = ? WHERE id = ?",
                            ["online", decoded.support_id]
                        );
                    }

                    next();
                }
            );
        } else if (
            socket.handshake.query &&
            socket.handshake.query.key &&
            socket.handshake.query.id
        ) {
            const key = socket.handshake.query.key;
            const id = socket.handshake.query.id;
            const sql = await query("SELECT * FROM users WHERE id = ?", [key]);
            if (sql.length == 0) {
                next(new Error("Authentication error"));
            } else {
                await addVisitor(id, key);
                setOnline(id);

                let ua = new UAParser(
                    socket.request.headers["user-agent"]
                ).getResult();
                let name = `${
                    ua.device.model || ua.device.vendor || ua.browser.name || ""
                } (${ua.os.name + " " + ua.os.version})`;

                // console.log(name, ua);

                await query(
                    "UPDATE visitors SET name = ? WHERE (name = 'Unknown' AND visitor_id = ?)",
                    [name, id]
                );
                next();
            }
        } else {
            next(new Error("Authentication error"));
        }
    }).on("connection", async function (socket) {
        const id = socket.handshake.query.id;
        const key = socket.handshake.query.key || socket.user.id;
        const token = socket.handshake.query.token;
        let visitor = await getVisitor(id);

        const updateBotIgnoreList = async () => {
            const users = await db.visitorsLock
                .find({
                    selector: {
                        id: key,
                    },
                })
                .exec();

            let ignoreUsers = [];

            for (let i = 0; i < users.length; i++) {
                ignoreUsers.push(users[i].user_id);
            }

            sendToAll(key, "event", {
                type: "ignoreUsers",
                users: ignoreUsers,
            });
        };

        // helpers

        const sendToAll = async (key, type, data = "") => {
            const users = await db.users
                .find({
                    selector: {
                        id: key,
                    },
                })
                .exec();

            if (users.length === 0) {
                return;
            }

            users.forEach((user) => {
                io.to(user.socket_id).emit(type, data);
            });
        };

        if (visitor.length != 0) {
            visitor = visitor[0];
            sendToAll(visitor.user_id, "newUser", "");
        }

        if (id) {
            visitors[id] = socket.id;
            // console.log("a user connected: " + id);

            if (admins[key] && admins[key]?.length != 0) {
                io.to(socket.id).emit("online", {});
            }
        }

        if (token) {
            let user = socket.user;
            if (!admins[user.id]) {
                admins[user.id] = [];
            }
            admins[user.id].push(socket.id);
            console.log(admins[user.id].length + " connected admins");

            Object.values(visitors).forEach((visitor) => {
                io.to(visitor).emit("online", {});
            });

            const bots = await db.users
                .find({
                    selector: {
                        id: key,
                        type: "bot",
                    },
                })
                .exec();

            if (bots.length != 0) {
                sendToAll(key, "botState", {
                    id: null,
                    isBot: true,
                    isUserLocked: null,
                });
            }

            await updateBotIgnoreList();
        }

        const isLockedFromBot = async (id, user_id) => {
            const visitors = await db.visitorsLock
                .find({
                    selector: {
                        id,
                        user_id,
                    },
                })
                .exec();

            const isUserLocked = visitors.length == 0 ? false : true;

            return isUserLocked;
        };

        socket.on("botState", async ({ id }) => {
            const bots = await db.users
                .find({
                    selector: {
                        type: "bot",
                    },
                })
                .exec();

            const user = await db.visitorsLock
                .find({
                    selector: {
                        user_id: {
                            $eq: id,
                        },
                    },
                })
                .exec();

            const isBot = bots.length > 0 ? true : false;
            const isUserLocked = user.length == 0 ? false : true;

            sendToAll(key, "botState", {
                id,
                isBot,
                isUserLocked,
            });
        });

        socket.on("lockFromBot", async ({ id, status }) => {
            try {
                if (status) {
                    await db.visitorsLock.addVisitor(key, id);
                } else {
                    await db.visitorsLock
                        .find({
                            selector: {
                                user_id: {
                                    $eq: id,
                                },
                            },
                        })
                        .remove();
                }

                await updateBotIgnoreList();

                sendToAll(key, "botState", {
                    id,
                    isBot: true,
                    isUserLocked: status,
                });
            } catch (error) {
                console.log(error);
            }
        });

        socket.on("event", (data) => {
            console.log("event", id);
            sendToAll(key, "event", data);
        });

        socket.on(
            "sendMessage",
            async ({ id, name, picture, message, buttons }) => {
                let user = key;

                try {
                    await query(
                        "INSERT INTO messages(msg_from,msg_to,message,name,picture) VALUES(?,?,?,?,?)",
                        [user, id, message, name, picture]
                    );
                } catch (error) {}
            }
        );

        socket.on(
            "sendMessageButtons",
            async ({ id, name, picture, message, buttons }) => {
                // console.log({id, message, buttons});
                let user = key;

                try {
                    buttons = buttons.join(",");
                    await query(
                        "INSERT INTO messages(msg_from,msg_to,message,data,type,name,picture) VALUES(?,?,?,?,?,?,?)",
                        [
                            user,
                            id,
                            message,
                            buttons,
                            "textButton",
                            name,
                            picture,
                        ]
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        );

        socket.on("focus", () => {
            visitors[id] = socket.id;
        });

        socket.on("trigger", async ({ command, info }) => {
            try {
                let result = await query(
                    "SELECT * FROM triggers WHERE (user_id = ? AND name = ?)",
                    [key, command]
                );
                if (result.length == 0) {
                    await query(
                        "INSERT INTO triggers(user_id,name,info) VALUES(?,?,?)",
                        [key, command, info]
                    );
                } else {
                    await query(
                        "UPDATE triggers SET info = ? WHERE (user_id = ? AND name = ?)",
                        [info, key, command]
                    );
                }
            } catch (error) {}
        });

        socket.on("info", function (data) {
            sendToAll(key, "info", { id, data });
        });

        socket.on("updateInfo", (data) => {
            let { name, email, country, phone } = data;

            if (name) {
                setVisitorName(id, name);
            }

            if (email) {
                setVisitorEmail(id, email);
            }

            if (phone) {
                setVisitorPhone(id, phone);
            }

            if (country) {
                setVisitorCountry(id, country);
            }
        });

        socket.on("call", async function (data) {
            let visitor = visitors[data.id];
            let user = getUserId(socket.id);

            let payload = await query(
                "SELECT company,logo FROM users WHERE id = ?",
                [socket.user.id]
            );
            data.info = payload[0];
            data.callerId = socket.id;

            try {
                let balance = await getUserBalance(user);
                if (balance <= 0) {
                    return io
                        .to(socket.id)
                        .emit("callInfo2", { type: "lowBalance" });
                }
            } catch (error) {
                console.error(error);
            }

            io.to(visitor).emit("incomingcall", data);
        });

        socket.on("callInfo", async function (data) {
            let visitor = visitors[data.id];
            data.callerId = socket.id;

            if (data.type == "callReconnectOffer") {
                let payload = await query(
                    "SELECT company,logo FROM users WHERE id = ?",
                    [socket.user.id]
                );
                data.info = payload[0];
            }

            if (data?.type == "newMessage") {
                let newData = data;
                newData.fromMe = true;
                sendToAll(key, "callInfo2", newData);
            }

            io.to(visitor).emit("callInfo", data);
            // console.log("call info to visitor: ",visitor,data)
        });

        socket.on("callInfo2", async function (data) {
            let to = data.callerId;

            //Focus visitor
            visitors[id] = socket.id;

            try {
                if (data.type == "answer") {
                    let canMakeCall = await addCall(id, key);
                    if (!canMakeCall) {
                        io.to(visitor.id).emit("callInfo", { type: "endCall" });
                        return io
                            .to(to)
                            .emit("callInfo2", { type: "lowBalance" });
                    }
                }

                if (data.type == "call") {
                    const supports = await db.users
                        .find({
                            selector: {
                                $or: [{ type: "admin" }, { type: "support" }],
                                id: key,
                            },
                        })
                        .exec();

                    const bot = await db.users
                        .findOne({
                            selector: {
                                type: "bot",
                                id: key,
                            },
                        })
                        .exec();

                    data.supports = supports;

                    const isLocked = await isLockedFromBot(key, data.id);

                    if (bot && !isLocked) {
                        return io.to(bot.socket_id).emit("callInfo2", data);
                    }

                    if (supports.length == 0) {
                        return io
                            .to(visitor.id)
                            .emit("callInfo", { type: "endCall" });
                    }

                    return io.to(supports[0].socket_id).emit("callInfo2", data);
                }

                if (data.type == "newMessage") {
                    return sendToAll(key, "callInfo2", data);
                }
            } catch (error) {
                console.error(error);
            }

            if (!to) {
                sendToAll(key, "callInfo2", data);
            }

            io.to(to).emit("callInfo2", data);
        });

        socket.on("endCall", async function (data) {
            let visitor = visitors[data];
            io.to(visitor).emit("endCall", {});
        });

        socket.on("ipinfo", function (data) {
            if (visitor.name.trim() == "Unknown") {
                setVisitorName(id, data.ip);
            }
            sendToAll(key, "ipinfo", { id, data });
        });

        socket.on("screenshot", function (data) {
            sendToAll(key, "screenshot", { id, data });
            console.log(data);
        });

        socket.on("disconnect", async function () {
            if (id) {
                sendToAll(key, "offline", { id });
                setOffline(id);
            } else {
                await db.users
                    .find({
                        selector: {
                            socket_id: {
                                $eq: socket.id,
                            },
                        },
                    })
                    .remove();

                const bots = await db.users
                    .find({
                        selector: {
                            id: key,
                            type: "bot",
                        },
                    })
                    .exec();

                if (bots.length == 0) {
                    sendToAll(key, "botState", {
                        id: null,
                        isBot: false,
                        isUserLocked: null,
                    });
                }

                const index = admins[key].indexOf(socket.id);

                if (index > -1) {
                    admins[key].splice(index, 1);
                }

                // Change Active Status
                if (socket.user.type !== "admin") {
                    await query("UPDATE supports SET status = ? WHERE id = ?", [
                        "offline",
                        socket.user.support_id,
                    ]);
                }

                // Change Active Status
                if (admins[key].length == 0) {
                    // Change Active Status
                    await query("UPDATE users SET status = ? WHERE id = ?", [
                        "offline",
                        socket.user.id,
                    ]);

                    Object.values(visitors).forEach((visitor) => {
                        io.to(visitor).emit("offline", {});
                    });

                    // Remove all locks
                    try {
                        await db.visitorsLock
                            .find({
                                selector: {
                                    id: {
                                        $eq: key,
                                    },
                                },
                            })
                            .remove();
                    } catch (error) {}
                }
            }
        });
    });
};

module.exports = Socket;
