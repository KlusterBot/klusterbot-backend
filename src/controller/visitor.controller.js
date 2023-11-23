const sendResponse = require("../helpers/response");
const Fetch = require("../utils/fetch");
const db = require("../services/db");
const query = require("../helpers/query");

class VisitorControler {
    async getVisitors(res){
        const {id} = res.user;
        try {
            const sql = await query("SELECT * FROM visitors WHERE user_id = ? ORDER BY status DESC",[id]);
            let visitors = [];
            for(let i = 0; i < sql.length; i++){
                let each = sql[i];
                each.message = (await query("SELECT * FROM messages WHERE (msg_from = ? AND msg_to = ?) OR (msg_from = ? AND msg_to = ?) ORDER BY time DESC LIMIT 1", [each.visitor_id, id, id, each.visitor_id]))[0];
                if(each.message?.msg_from == id){
                    each.message.isMine = true;
                }
                visitors.push(each);
            }
            sendResponse(res, 200, true, "Fetched All Visitors", visitors);
        } catch (error) {
            sendResponse(res, 400, false, "Error Fetching Visitors", error);
        }
    }

    async getVisitor(res, visitorId){
        const {id} = res.user;
        console.log(visitorId);
        try {
            const sql = await query("SELECT * FROM visitors WHERE (user_id = ? AND visitor_id = ?)",[id,visitorId]);
            sendResponse(res, 200, true, "Fetched Visitor", sql[0] || {});
        } catch (error) {
            sendResponse(res, 400, false, "Error Fetching Visitor", error);
        }
    }

    async updateVisitorInfo(res, visitorId, payload){
        const {name, email} = payload;
        try {
            const sql = await query("UPDATE visitors SET name = ?, email = ? WHERE (visitor_id = ?)",[name,email,visitorId]);
            sendResponse(res, 200, true, "Updated Info", {name, email});
        } catch (error) {
            sendResponse(res, 400, false, "Error Updating Info", error);
        }
    }

    async updateVisitor(res, visitorId, payload){
        const {id} = res.user;
        const {name, note} = payload;
        console.log(visitorId);
        try {
            const sql = await query("UPDATE visitors SET name = ?, note = ? WHERE (user_id = ? AND visitor_id = ?)",[name,note,id,visitorId]);
            sendResponse(res, 200, true, "Updated Visitor", {});
        } catch (error) {
            sendResponse(res, 400, false, "Error Updating Visitor", error);
        }
    }
}

module.exports = VisitorControler;
