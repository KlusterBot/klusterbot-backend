const mailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config({ path: "../.env" });

const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;
const host = process.env.MAIL_HOST;

let transporter = mailer.createTransport({
    host,
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: mailUser, // generated ethereal user
        pass: mailPass, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false,
        ciphers: "SSLv3",
    },
});

const COMPANY = "Kluster";
const URL = "https://kluster.online";
const LOGO = "https://kluster.online/icon.png";

function makeTemplate(name, email, title, message) {
    let mail = fs.readFileSync(__dirname + "/email.html", "utf-8");
    return mail
        .replaceAll("{{company}}", COMPANY)
        .replaceAll("{{logo}}", LOGO)
        .replaceAll("{{url}}", URL)
        .replaceAll("{{name}}", name)
        .replaceAll("{{email}}", email)
        .replaceAll("{{text}}", message)
        .replaceAll("{{title}}", title);
}

async function sendMail(name, email, title, message) {
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Kluster " <hello@kluster.online>', // sender address
        to: email, // list of receivers
        subject: title, // Subject line
        html: makeTemplate(name, email, title, message), // html body
    });
    console.log(info);
}

module.exports = { sendMail };
