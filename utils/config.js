require("dotenv").config();

const PORT = process.env.PORT || 3500;

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";

const SECRET = process.env.SECRET || "secret";

const ENV = process.env.ENV || 'LOCAL'

const JWT_EXPIRY = process.env.JWT_EXPIRY || '12h'


module.exports = {
    PORT,
    MONGO_URI,
    SECRET,
    ENV,
    JWT_EXPIRY,
};