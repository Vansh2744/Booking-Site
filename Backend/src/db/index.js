import mongoose from "mongoose";

const connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URI}/booking`
    );
    console.log(
      `connected to db successfully : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("connection to db failed : ", error.message);
    process.exit(1);
  }
};

export default connect;
