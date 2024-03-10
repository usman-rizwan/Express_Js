import mongoose from "mongoose";
import 'dotenv/config.js'
mongoose.connect(
  `mongodb+srv://Usman:${process.env.DB_NAME}@practiceproject.bxk1syw.mongodb.net/Practice?retryWrites=true&w=majority&appName=PracticeProject`
);

export default mongoose;
