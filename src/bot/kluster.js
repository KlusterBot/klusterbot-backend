const { Kluster, Stage, CONSTANTS } = require("./index");
const axios = require("axios");
const fs = require("fs");

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log("Please provide a token and path to ai model!");
    process.exit(1);
}

const token = args[0];
const modelPath = args[1];

const model = fs.readFileSync(modelPath, "utf-8");

let kluster = new Kluster(token, {
    name: "Kluster Bot",
    logo: "https://cdn-icons-png.flaticon.com/128/630/630426.png",
});

// kluster.debug();

// const AI_SERVER = "http://localhost:4000/";
const AI_SERVER = "https://ai.kluster-ai.online/";
const API_SERVER = "https://api.kluster-ai.online/";

kluster.on(
    "message",
    async ({ id, message, reply, typing, sendButtons, token }) => {
        let msg = "";
        let aiStage = new Stage();

        let humanAttentionStage = new Stage();

        humanAttentionStage.add(async (next) => {
            reply("Please enter your reason!");

            next();
        });

        humanAttentionStage.add(async (event, { message }, next) => {
            if (message.split(" ").length < 5) {
                return reply("Please enter a reason with upto 5 words!");
            }

            try {
                const response = await axios.post(
                    API_SERVER + "api/ai/notify",
                    {
                        id,
                        reason: message,
                    }
                );
            } catch (error) {
                console.log(error);
            }

            aiStage.run(id, kluster);

            next();
        });

        aiStage.add(async (next) => {
            if (msg !== "") {
                reply(msg);
                msg = "";
                return;
            }
            typing();

            try {
                const response = await axios.post(AI_SERVER, {
                    message,
                    id,
                    model,
                });

                if (response.data.action === "support") {
                    msg = response.data.response;
                    return humanAttentionStage.run(id, kluster);
                }

                reply(response.data.response);
            } catch (error) {
                console.log(error);
                reply("Something went wrong!, Try again later.");
            }
            next();
        });

        aiStage.add(async (event, { message }, next) => {
            typing();

            try {
                const response = await axios.post(AI_SERVER, {
                    message,
                    id,
                    model,
                });

                if (response.data.action === "support") {
                    msg = response.data.response;
                    return humanAttentionStage.run(id, kluster);
                }

                reply(response.data.response);
            } catch (error) {
                console.log(error);
                reply("Something went wrong!, Try again later.");
            }
        });

        aiStage.run(id, kluster);
    }
);

kluster.on("event", ({ id, type, data }) => {
    if (type === "popupClosed") {
        // kluster.popupText(id, "How can we help you!");
    }
    console.log({ id, type, data });
});

kluster.on("error", (error) => {
    console.log("Error", error.message);
});
