const sendResponse = require("../helpers/response");
const Fetch = require("../utils/fetch");
const {genUnique} = require("../helpers");
const db = require("../services/db");
const query = require("../helpers/query");

class MessageControler {
    async getMessages(res, visitorId, id, limit) {
        if(!id){
            id = res.user.id;
        }

        // Update Seen Status
        try {
            if(res?.user?.id){
                await query("UPDATE messages SET seen = ? WHERE (msg_from = ? AND msg_to = ?) OR (msg_from = ? AND msg_to = ?) ORDER BY time DESC", ["true", visitorId, id, id, visitorId]);
            }

            const length = (await query("SELECT * FROM messages WHERE (msg_from = ? AND msg_to = ?) OR (msg_from = ? AND msg_to = ?) ORDER BY time DESC", [visitorId, id, id, visitorId,Number(limit)])).length;

            if(limit > length){
                limit = length;
            }

            const result = await query("SELECT * FROM (SELECT * FROM messages WHERE (msg_from = ? AND msg_to = ?) OR (msg_from = ? AND msg_to = ?) ORDER BY time DESC LIMIT ?) AS sub ORDER BY time ASC", [visitorId, id, id, visitorId,Number(limit)]);

            sendResponse(res, 200, true, "Fetched Visitor's Messages", result);
        } catch (error) {
            console.log(error);
            sendResponse(res, 400, false, "Error Fetching Visitor's Messages", {});
        }
    }

    async sendMessage(res, payload,visitorId){
        let id = res?.user?.id
        let {message, message_id, type} = payload;

        message = message.trim();

        let name = "";
        let picture = res?.user?.picture || "";
        
        if(!id){
            id = payload.id;
        }else{
            name = res?.user?.name;
            picture = process.env.API_URL + "/logo/" + picture;
        }

        if(message_id){
            try {
                await query("UPDATE messages SET type = ?, time = time WHERE id = ?",[type,message_id]);
            } catch (error) {
                
            }
        }

        try {
            await query("INSERT INTO messages(msg_from,msg_to,message,name,picture) VALUES(?,?,?,?,?)",[id,visitorId,message,name,picture]);
        } catch (error) {
            console.log(error)
            sendResponse(res, 400, false, "Error Sending Message", {});
        }

        sendResponse(res, 200, true, "Message Sent", {});
    }

}

module.exports = MessageControler;
