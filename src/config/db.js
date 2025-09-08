import { connect } from "mongoose";
const dbConnect = async () => {
  try {
    const dbConnection= await connect(process.env.CONNECTION_URL);
    console.log(`databased connected : ${dbConnection.connection.host}`)
  } catch (error) {
    console.log(`Database connection failed: ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
