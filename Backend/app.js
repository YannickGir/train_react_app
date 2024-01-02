const express = require('express')
const app = express()
const { connectToDatabase } = require('./database/connection');
const userRoute = require('./routes/user_routes')
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/', userRoute)

async function startServer() {

    try {
        await connectToDatabase();
        const port = 3000;
        app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
      } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
      }
    }
    startServer();
