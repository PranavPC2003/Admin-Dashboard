import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://root:comp@cluster0.aefr1bn.mongodb.net/admin_teams", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

mongoose.connection.on('error', (err) => {
  console.error("MongoDB connection error:", err.message);
});

export default connectDB;
