const { io } = require("socket.io-client");
const { api } = require("./config");
const Call = require("./call");
const Stage = require("./stage");
const CONSTANTS = require("./constants");

let showDebug = false;

const debug = (...args) => {
    if (showDebug) {
        console.log(...args);
    }
};

function Kluster(token, info) {
    this.token = token;
    this.info = info || {};
    (this.name = info?.name || ""),
        (this.logo = info?.logo || ""),
        (this.id = null);
    this.ignoreUsers = [];
    let self = this;

    this.stage = {};
    this.stageEventsCapture = {};

    let events = {};

    const socket = io(api, {
        query: {
            token,
            type: "node",
            name: info?.name || "",
            logo: info?.logo || "",
            info: info?.info || "",
        },
    });

    self.socket = socket;

    let callFuncs = (event, data) => {
        let { id } = data;

        if (self?.stage[id] && self?.stageEventsCapture[id]?.includes(event)) {
            return self.stage[id](event, data);
        }

        if (events[event]) {
            events[event].forEach((func) => {
                func(data);
            });
        }
    };

    const isIgnored = (id) => {
        return self.ignoreUsers.includes(id);
    };

    self.addStage = (id, stageManager) => {
        if (!self.stageEventsCapture[id]) {
            self.stageEventsCapture[id] = ["message"];
        }
        self.stage[id] = stageManager;
    };

    self.removeStage = (id) => {
        delete self.stage[id];
    };

    self.stageEvents = (id, events) => {
        self.stageEventsCapture[id] = events;
    };

    self.debug = () => {
        showDebug = true;
    };

    self.on = (event, cb) => {
        if (!events[event]) {
            events[event] = [cb];
        } else {
            events[event].push(cb);
        }
    };

    self.startTyping = (id) => {
        if (isIgnored(id)) {
            return;
        }
        socket.emit("callInfo", {
            type: "typing",
            id: id,
        });
    };

    self.stopTyping = (id) => {
        if (isIgnored(id)) {
            return;
        }
        socket.emit("callInfo", {
            type: "typingEnd",
            id: id,
        });
    };

    self.sendMessage = (id, message, stopTyping) => {
        if (stopTyping === true || stopTyping === undefined) {
            self.stopTyping(id);
        }

        setTimeout(() => {
            if (isIgnored(id)) {
                return;
            }
            socket.emit("sendMessage", {
                id,
                message,
                name: self.name,
                picture: self.logo,
            });
            socket.emit("callInfo", {
                type: "newMessage",
                id,
                message,
                name: self.name,
                picture: self.logo,
            });
        }, 100);
    };

    self.sendButtons = (id, message, buttons = []) => {
        if (isIgnored(id)) {
            return;
        }
        setTimeout(() => {
            socket.emit("sendMessageButtons", {
                id,
                message,
                buttons,
                name: self.name,
                picture: self.logo,
            });
            socket.emit("callInfo", {
                type: "newMessage",
                id,
                message,
                name: self.name,
                picture: self.logo,
            });
        }, 100);
    };

    self.trigger = (id, trigger, message) => {
        socket.emit("callInfo", {
            type: "trigger",
            id,
            name: trigger,
            text: message,
        });
    };

    self.popupText = (id, message) => {
        socket.emit("callInfo", {
            type: "popupText",
            id,
            message,
        });
    };

    socket.on("connect", (data) => {
        self.id = socket.id;
        console.log("Connected as", self.id);
    });

    socket.on("event", (data) => {
        if (data.type == "ignoreUsers") {
            self.ignoreUsers = data.users;
            return;
        }

        callFuncs("event", data);
    });

    socket.on("callInfo2", (data) => {
        // console.log(data);

        if (isIgnored(data.id)) {
            return;
        }

        let reply = (response) => {
            self.sendMessage(data.id, response);
        };

        let typing = (time = 3000) => {
            self.startTyping(data.id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(time);
                }, time);
            });
        };

        let sendButtons = (response, buttons) => {
            self.sendButtons(data.id, response, buttons);
        };

        let declineCall = () => {
            socket.emit("callInfo", {
                type: "declineCall",
                id: data.id,
            });
        };

        if (data.type === "typing") {
            let { id, message } = data;
            callFuncs("typing", { id, message });
        } else if (data.type === "newMessage") {
            let { id, message, fromMe, token } = data;

            if (fromMe) {
                return;
            }

            callFuncs("message", {
                id,
                message,
                reply,
                typing,
                sendButtons,
                token,
            });
        } else if (data.type === "call") {
            let { id, message, key, supports, token } = data;

            let index = supports.indexOf(socket.id);

            if (index > -1) {
                supports.splice(index, 1);
            }

            callFuncs("call", {
                id,
                key,
                supports,
                reply,
                typing,
                sendButtons,
                declineCall,
                token,
            });
        } else {
            callFuncs(data.type, { ...data });
        }
    });

    socket.on("connect_error", (error) => {
        callFuncs("error", error);
    });

    // return self;
}

module.exports = { Kluster, Stage, Call, CONSTANTS };
