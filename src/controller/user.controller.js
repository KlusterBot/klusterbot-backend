const { genId, toHash } = require("../helpers");
const { createTransaction } = require("../services/transaction");
const sendResponse = require("../helpers/response");
const Fetch = require("../utils/fetch");
const db = require("../services/db");
const query = require("../helpers/query");

class UserControler {
    async getUser(res, id){
        try {
            const result = await query("SELECT company,logo,status,callable,website,theme,about,legit FROM users WHERE id = ?", [id]);
            sendResponse(res, 200, true, "Got User", result[0] || {});
        } catch (error) {
            sendResponse(res, 400, false, "Error Getting User", {});
        }
    }
}

module.exports = UserControler;
