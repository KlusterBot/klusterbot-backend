const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const http = require("http");
const fs = require("fs");
const multer = require("multer");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
const serveStatic = require("serve-static");
const contentDisposition = require("content-disposition");

const { customlimiter } = require("./middlewares/rateLimiting");
const authRouter = require("./routes/auth.router");
const visitorRouter = require("./routes/visitor.router");
const meRouter = require("./routes/me.router");
const messageRouter = require("./routes/message.router");
const waitlistRouter = require("./routes/waitlist.router");
const userRouter = require("./routes/user.router");
const walletRouter = require("./routes/wallets.router");
const aiRouter = require("./routes/ai.router");
const storeRouter = require("./routes/store.router");
const paymentRouter = require("./routes/payment.router");
const supportRouter = require("./routes/support.router");
const Fetch = require("./utils/fetch");
const Socket = require("./utils/socket");
const { PORT } = require("./config");
const { genUnique } = require("./helpers");
const sendResponse = require("./helpers/response");
const cookieParser = require("cookie-parser");
const isLoggedIn = require("./middlewares/auth");
const query = require("./helpers/query");

// Middlewares
app.use(
    cors({
        credentials: false,
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// router  middlewares
// app.use(customlimiter);

app.get("/", (req, res) => {
    res.send(`WELCOME`);
});

app.get("/kluster.css", (req, res) => {
    res.sendFile(__dirname + "/services/kluster.css");
});

//Socket
Socket(io);

// Authentication
app.use("/api/auth", authRouter);

// Visitor
app.use("/api/visitor", visitorRouter);

// Support
app.use("/api/support", supportRouter);

// Me
app.use("/api/me", meRouter);

// Message
app.use("/api/message", messageRouter);

// Waitlist
app.use("/api/waitlist", waitlistRouter);

// User
app.use("/api/user", userRouter);

// Wallets
app.use("/api/wallet", walletRouter);

// AI
app.use("/api/ai", aiRouter);

// Transaction
app.use("/api/store", storeRouter);

// Payment
app.use("/api/payment", paymentRouter);

// User logos
app.use("/logo", express.static("profiles"));

// User and Visitors files

// Set header to force download
function setHeaders(res, path) {
    res.setHeader("Content-Disposition", contentDisposition(path));
}

app.use(
    "/files",
    serveStatic("uploads", {
        index: false,
        setHeaders: setHeaders,
    })
);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.cwd()}/uploads/`);
    },
    filename: (req, file, cb) => {
        try {
            cb(
                null,
                file.fieldname +
                    "-" +
                    genUnique() +
                    "." +
                    file.originalname
                        .split(".")
                        [file.originalname.split(".").length - 1].toLowerCase()
            );
        } catch (error) {
            cb(null, file.fieldname + "-" + genUnique());
        }
    },
});

const upload = multer({ dest: "uploads/", storage });

// User Logo Upload
app.post(
    "/api/upload",
    upload.single("logo"),
    isLoggedIn,
    async function (req, res) {
        let { id, type } = res.user;
        const { filename, path, destination } = req.file;

        if (type === "support") {
            id = res.user.support_id;
        }

        try {
            await fs.renameSync(path, `${process.cwd()}/profiles/${id}.png`);
            if (type === "admin") {
                await query("UPDATE users SET logo = ? WHERE id = ?", [
                    `${id}.png`,
                    id,
                ]);
            } else {
                await query("UPDATE supports SET picture = ? WHERE id = ?", [
                    `${id}.png`,
                    id,
                ]);
            }
            sendResponse(res, 200, true, "Uploaded Image", {
                filename: `${id}.png`,
            });
        } catch (error) {
            console.log(error);
            try {
                if (type === "admin") {
                    await query("UPDATE users SET logo = ? WHERE id = ?", [
                        filename,
                        id,
                    ]);
                } else {
                    await query(
                        "UPDATE supports SET picture = ? WHERE id = ?",
                        [filename, id]
                    );
                }

                sendResponse(res, 200, true, "Uploaded Image", { filename });
            } catch (error) {
                sendResponse(res, 500, false, error.message, error);
            }
        }
    }
);

// Chat File Upload (User)
app.post(
    "/api/upload/:visitorId",
    upload.single("file"),
    isLoggedIn,
    async function (req, res) {
        let { id, name, picture } = res.user;
        const { filename, path, destination } = req.file;
        const visitorId = req.params.visitorId;
        const type = req.body.type === "file" ? "file" : "image";
        const message =
            req.body.type === "file" ? "You sent a file" : "You sent a photo";

        picture = process.env.API_URL + "/logo/" + picture;

        try {
            await query(
                "INSERT INTO messages(msg_from,msg_to,type,data,message,seen,name,picture) VALUES(?,?,?,?,?,?,?,?)",
                [id, visitorId, type, filename, message, "true", name, picture]
            );
            sendResponse(res, 200, true, "Uploaded File", { filename });
        } catch (error) {
            sendResponse(res, 500, false, error.message, error);
        }
    }
);

// Chat File Upload (Visitor)
app.post(
    "/api/upload/:visitorId/:id",
    upload.single("file"),
    async function (req, res) {
        const id = req.params.id;
        const { filename, path, destination } = req.file;
        const visitorId = req.params.visitorId;
        const type = req.body.type === "file" ? "file" : "image";
        const message =
            req.body.type === "file"
                ? "You received a file"
                : "You received a photo";

        console.log(req.file, id, visitorId);

        try {
            await query(
                "INSERT INTO messages(msg_to,msg_from,type,data,message,seen) VALUES(?,?,?,?,?,?)",
                [id, visitorId, type, filename, message, "false"]
            );
            sendResponse(res, 200, true, "Uploaded File", { filename });
        } catch (error) {
            sendResponse(res, 500, false, error.message, error);
        }
    }
);

server.listen(PORT || 2020, () => {
    console.log(`Server listening @ http://localhost:${PORT}`);
});
