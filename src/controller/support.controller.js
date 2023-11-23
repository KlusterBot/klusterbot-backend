const sendResponse = require("../helpers/response");
const Fetch = require("../utils/fetch");
const db = require("../services/db");
const query = require("../helpers/query");

class SupportControler {
    async getSupports(res){
        const {id} = res.user;
        try {
            const supports = await query("SELECT id, user_id, name, email, picture, status FROM supports WHERE user_id = ? ORDER BY status DESC",[id]);
            sendResponse(res, 200, true, "Fetched All Supports", supports);
        } catch (error) {
            sendResponse(res, 400, false, "Error Fetching Supports", error);
        }
    }

    async getSupport(res, supportId){
        const {id} = res.user;
        console.log(supportId);
        
        try {
            const sql = await query("SELECT id, user_id, name, email, picture, status FROM supports WHERE (user_id = ? AND id = ?)",[id,supportId]);
            sendResponse(res, 200, true, "Fetched Support", sql[0] || {});
        } catch (error) {
            sendResponse(res, 400, false, "Error Fetching Support", error);
        }
    }

    async updateSupportInfo(res, supportId, payload){
        const {name, email} = payload;
        
        try {
            const sql = await query("UPDATE supports SET name = ?, email = ? WHERE (id = ?)",[name,email,supportId]);
            sendResponse(res, 200, true, "Updated Info", {name, email});
        } catch (error) {
            sendResponse(res, 400, false, "Error Updating Info", error);
        }
    }

    async updateSupport(res, supportId, payload){
        const {id} = res.user;
        const {name, note} = payload;
        console.log(supportId);
        try {
            const sql = await query("UPDATE supports SET name = ?, note = ? WHERE (user_id = ? AND visitor_id = ?)",[name,note,id,supportId]);
            sendResponse(res, 200, true, "Updated Support", {});
        } catch (error) {
            sendResponse(res, 400, false, "Error Updating Support", error);
        }
    }
}

module.exports = SupportControler;
