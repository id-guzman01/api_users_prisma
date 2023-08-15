import { config } from "dotenv";

config();

export default {
    SECRET_KEY: process.env.SECRET_KEY || ""
}