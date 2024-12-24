import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV,
  bcryptSalt: process.env.BCRYPT_SALT,
};
