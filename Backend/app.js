const express = require("express");
const app = express();
const { connectToDatabase } = require("./database/connection");
const userRoute = require("./routes/user_routes");
const data_userImages_routes = require("./routes/data_userImages_routes");
const cors = require("cors");

const multer = require('multer');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", userRoute);
app.use("/", data_userImages_routes);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../train_react_app/public/uploads/'); // folder to save files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // to use original name of file
    },
  });
  
  const upload = multer({ storage: storage });

  
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded!');
  });

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
