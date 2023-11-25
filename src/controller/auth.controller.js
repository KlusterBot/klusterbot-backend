const { genHash, compareHash, genId, toHash, genToken } = require("../helpers");
const sendResponse = require("../helpers/response");
const { validateEmail, validatePhonenumber } = require("../utils/validate");
const { genAccessToken, genRefreshToken } = require("../helpers/token");
const Fetch = require("../utils/fetch");
const db = require("../services/db");
const query = require("../helpers/query");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

class AuthControler {
    async login(res, payload) {
        const self = this;
        if (res === undefined) {
            throw new Error("expected a valid 'res' object but got none ");
        }
        if (Object.entries(payload).length === 0) {
            return sendResponse(
                res,
                400,
                false,
                "failed to log In, missing payload."
            );
        }

        let { email, password } = payload;

        if (email === "") {
            return sendResponse(res, 400, false, "email is missing");
        }

        if (password === "") {
            return sendResponse(res, 400, false, "password is missing");
        }

        if (!validateEmail(email)) {
            return sendResponse(res, 400, false, "email given is invalid");
        }

        db.query(
            {
                sql: "SELECT * FROM users WHERE (email = ?)",
                timeout: 40000,
                values: [email],
            },
            async function (error, results, fields) {
                if (error) {
                    return sendResponse(res, 400, false, "An Error Occured!");
                }

                if (results.length === 0) {
                    const supports = await query(
                        "SELECT * FROM supports WHERE (email = ?)",
                        [email]
                    );

                    if (supports.length === 0) {
                        return sendResponse(res, 500, false, "User not found!");
                    }

                    if (toHash(password) !== supports[0].password) {
                        return sendResponse(
                            res,
                            400,
                            false,
                            "Incorrect Password!"
                        );
                    }

                    if (supports.length !== 0) {
                        const support = supports[0];

                        const user = (
                            await query("SELECT * FROM users WHERE id = ?", [
                                support.user_id,
                            ])
                        )[0];

                        const userPayload = {
                            id: support?.user_id,
                            support_id: support?.id,
                            username: user?.username,
                            email: support?.email,
                            name: support?.name,
                            picture: support?.picture,
                            verified: user?.verified == "false" ? false : true,
                            type: "support",
                        };

                        const accessToken = genAccessToken(userPayload);

                        return sendResponse(
                            res,
                            200,
                            true,
                            "Login Successful",
                            {
                                ...userPayload,
                                accessToken,
                            }
                        );
                    }

                    return sendResponse(res, 400, false, "User not found!");
                }

                if (toHash(password) !== results[0].password) {
                    return sendResponse(res, 400, false, "Incorrect Password!");
                }

                const userPayload = {
                    id: results[0]?.id,
                    username: results[0]?.username,
                    email: results[0]?.email,
                    name: results[0]?.name,
                    picture: results[0]?.logo,
                    verified: results[0]?.verified == "false" ? false : true,
                    type: "admin",
                };
                const refreshToken = genRefreshToken(userPayload);
                const accessToken = genAccessToken(userPayload);

                return sendResponse(res, 200, true, "Login Successful", {
                    ...userPayload,
                    accessToken,
                });
            }
        );
    }

    async register(res, payload) {
        const self = this;
        if (res === undefined) {
            throw new Error("expected a valid 'res' object but got none ");
        }
        if (Object.entries(payload).length === 0) {
            return sendResponse(
                res,
                400,
                false,
                "Failed to register, missing payload."
            );
        }

        const { name, email, password } = payload;

        if (email === undefined) {
            return sendResponse(res, 400, false, "Email is missing");
        }

        if (name === undefined) {
            return sendResponse(res, 400, false, "Name is missing");
        }

        if (password === undefined) {
            return sendResponse(res, 400, false, "Password is missing");
        }

        if (!validateEmail(email)) {
            return sendResponse(res, 400, false, "Email given is invalid");
        }

        db.query(
            {
                sql: "SELECT * FROM users WHERE (email = ?)",
                timeout: 40000,
                values: [email],
            },
            async function (error, results, fields) {
                if (results.length > 0) {
                    return sendResponse(
                        res,
                        400,
                        false,
                        "User with this email already exists!"
                    );
                }

                const userId = genId();
                const token = genToken();

                // Save user data
                db.query(
                    {
                        sql: "INSERT INTO users(id,name,password,email,verified,token) VALUES(?,?,?,?,?,?)",
                        timeout: 40000,
                        values: [
                            userId || "",
                            name || "",
                            toHash(password) || "",
                            email || "",
                            "false",
                            token,
                        ],
                    },
                    function (error, results, fields) {
                        if (error) {
                            return sendResponse(
                                res,
                                400,
                                false,
                                "Error: " + error
                            );
                        }
                        db.query(
                            {
                                sql: "SELECT * FROM users WHERE (email = ?)",
                                timeout: 40000,
                                values: [email],
                            },
                            function (error, results, fields) {
                                if (error)
                                    return sendResponse(
                                        res,
                                        400,
                                        false,
                                        "An Error Occured!"
                                    );
                                if (results.length === 0)
                                    return sendResponse(
                                        res,
                                        400,
                                        false,
                                        "User not found!"
                                    );

                                const userPayload = {
                                    id: results[0]?.id,
                                    username: results[0]?.username,
                                    email: results[0]?.email,
                                    name: results[0]?.name,
                                    picture: results[0]?.logo,
                                    verified:
                                        results[0]?.verified == "false"
                                            ? false
                                            : true,
                                };
                                const refreshToken =
                                    genRefreshToken(userPayload);
                                const accessToken = genAccessToken(userPayload);

                                return sendResponse(
                                    res,
                                    200,
                                    true,
                                    "Sign Up Successful",
                                    {
                                        ...userPayload,
                                        accessToken,
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }

    async email(res, payload) {
        return sendResponse(res, 200, true, "Email Sent", payload);
    }

    async isLoggedIn(res, req) {
        let tokens = req.headers["authorization"];

        if (!tokens) {
            return res
                .status(400)
                .json({
                    message: "Authorization header is required",
                    error: true,
                });
        }
        try {
            let bearer = tokens.split(" ")[1];
            let decode = jwt.verify(bearer, JWT_SECRET);
            return sendResponse(res, 200, true, "User Logged In", decode);
        } catch (e) {
            console.log(e);
            return res
                .status(403)
                .json({ message: "Invalid Token", error: true });
        }
    }
}

module.exports = AuthControler;
