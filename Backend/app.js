const express = require("express");
const app = express();
const { connectToDatabase } = require("./database/connection");
const userRoute = require("./routes/user_routes");
const data_userImages_routes = require("./routes/data_userImages_routes");
const cors = require("cors");
const { getImages } = require("./controller/images");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", userRoute);
app.use("/", data_userImages_routes);

async function startServer() {
  try {
    await connectToDatabase();
    const port = 8800;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}
startServer();
