const dotenv = require("dotenv")
let devEnv = "./.env.development"

if(process.env.NODE_ENV === "production"){
    devEnv = "./.env";
}

dotenv.config({ path: devEnv });

const JWT_SECRET = process.env.JWT_SECRET;

const DATABASE_URL = process.env.DATABASE_URL;

const MAX_API_REQUEST = process.env.MAX_API_REQUEST_COUNT;

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

const FLW_PUBLIC_KEY = process.env.FLW_PUBLIC_KEY;

const FLW_ENCRYPTION_KEY = process.env.FLW_ENCRYPTION_KEY;

const PORT = process.env.PORT;

module.exports = {
    JWT_SECRET,
    DATABASE_URL,
    MAX_API_REQUEST,
    FLW_SECRET_KEY,
    FLW_PUBLIC_KEY,
    FLW_ENCRYPTION_KEY,
    PORT
}