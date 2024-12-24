import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function connectToDatabase() {
  try {
    await mongoose.connect(config.mongoUri as string);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    process.exit(1);
  }
}

connectToDatabase();

app.listen(config.port, () => {
  console.log(`Server is running on ${config.port}`);
});
