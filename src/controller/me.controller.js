const sendResponse = require("../helpers/response");
const { genId, toHash, genUnique } = require("../helpers");
const Fetch = require("../utils/fetch");
const db = require("../services/db");
const query = require("../helpers/query");
const fs = require("fs");
const path = require("path");

class MeControler {
    async #getVisitor(id) {
        const visitor = await query(
            "SELECT * FROM visitors WHERE visitor_id = ?",
            [id]
        );
        return visitor[0];
    }

    async getMe(res) {
        const { id } = res.user;
        let user;

        const users = await query("SELECT * FROM users WHERE id = ?", [id]);

        if (users[0]) {
            user = users[0];
            delete user["password"];
        }

        const modelPath = __dirname + `/../models/${user.token}.txt`;
        let about = "";

        try {
            about = fs.readFileSync(modelPath, "utf-8");
        } catch (error) {}

        return sendResponse(res, 200, true, "User", {
            ...user,
            about,
        });
    }

    async updateMe(res, payload) {
        const { id } = res.user;
        const { company, website, about, theme } = payload;

        try {
            await query(
                "UPDATE users SET company = ?, website = ?, about = ?, theme = ? WHERE id = ?",
                [company, website, about, theme, id]
            );

            return sendResponse(res, 200, true, "Company Info Updated", {
                ...payload,
            });
        } catch (error) {
            console.log(error);
            return sendResponse(
                res,
                500,
                false,
                "Company Info Failed to Updated",
                {
                    ...payload,
                }
            );
        }
    }

    async getCalls(res) {
        const self = this;
        const { id } = res.user;
        let newCalls = [];

        let calls = await query(
            "SELECT * FROM calls WHERE user_id = ? ORDER BY time DESC LIMIT 3",
            [id]
        );

        for (let i = 0; i < calls.length; i++) {
            let call = calls[i];

            let visitor = await self.#getVisitor(call.visitor_id);
            let newCall = { ...call, ...visitor };
            newCalls.push(newCall);

            if (i == calls.length - 1) {
                sendResponse(res, 200, true, "Calls", {
                    calls: newCalls,
                });
            }
        }
    }

    async getTrigger(res, id) {
        try {
            const result = await query(
                "SELECT * FROM triggers WHERE user_id = ?",
                [id]
            );
            sendResponse(res, 200, true, "Got User Triggers", result || []);
        } catch (error) {
            sendResponse(res, 400, false, "Error Fetching User Triggers", {});
        }
    }

    async getEmbed(res, id) {
        try {
            let user;
            const users = await query("SELECT * FROM users WHERE id = ?", [id]);

            if (users[0]) {
                user = users[0];
                delete user["password"];
            }

            if (!user) {
                return res.send("console.log('Invalid embed link')");
            }

            let klusterText = fs.readFileSync(
                __dirname + "/../services/kluster.js",
                "utf-8"
            );
            klusterText = klusterText
                .split("API_URL")
                .join(process.env.API_URL)
                .split("KLUSTER_URL")
                .join(process.env.KLUSTER_URL)
                .split("API_KEY")
                .join(user.id)
                .split("USER_THEME")
                .join(user.theme);

            res.send(klusterText);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MeControler;
