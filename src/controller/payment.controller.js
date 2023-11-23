const {genHash, compareHash, genId, genUnique} = require("../helpers");
const sendResponse = require("../helpers/response");
const query = require("../helpers/query");
const {FLW_SECRET_KEY, FLW_PUBLIC_KEY, FLW_ENCRYPTION_KEY} = require("../config");
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(FLW_PUBLIC_KEY,FLW_SECRET_KEY);

class PaymentController {
    async verify(req, res, tranId) {
        let {user} = req;
        
        try {
            let result = await query("SELECT * FROM topup WHERE transaction_id = ?", [tranId]);
            if(result.length !== 0){
                return sendResponse(res, 200, true, "Transaction Success", {});
            }
            
            let tran = await flw.Transaction.verify({ id: tranId });
            tran = tran.data;

            console.log(tran);

            if(tran.status === "successful"){
                await query("INSERT INTO topup(transaction_id,amount,user_id) VALUES(?,?,?)",[tranId,tran.amount,user.id]);
                let balance = (await query("SELECT balance FROM users WHERE id = ?", [user.id]))[0].balance;
                let new_balance = balance + tran.amount;
                await query("UPDATE users SET balance = ? WHERE id = ?", [new_balance, user.id]);
            }
            
            sendResponse(res, 200, true, "Transaction Success", {});
        } catch (error) {
            sendResponse(res, 500, false, "Transaction Error", {});
            console.log(error);
        }
    }

    async event(res, payload) {
        console.log(payload);
        sendResponse(res, 200, true, "Active!!!", {});
    }
}

module.exports = PaymentController;
