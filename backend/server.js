const debug = require("debug")("node-angular");
const http = require("http");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8001;

app.use(cors());
// app.use(bodyParser.json());
// Body parser configuration
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use("/images",express.static(path.join(__dirname,"images")));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL).then(() => {
  console.log("MongoDB connection success!");
  debug("MongoDB connection success!");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
  debug("MongoDB connection error:", error);
});

const allowedOrigins = ["http://localhost:4200/","http://localhost:3000/"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if(allowedOrigins.includes(origin)){
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// const corsOptions = {
//   origin: 'http://localhost:4200',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions))



// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });



// routers
const postRouter = require("./routes/posts")
const userRouter = require("./routes/user")
const categoryRouter = require("./routes/category")
const ascaoriginUser = require("./routes/ascaoriginUser")
const fire  = require("./routes/fire")
app.use("/api/post",postRouter);
app.use("/api/user",userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/asca_user",ascaoriginUser)
app.use("/api/fire",fire)



app.listen(PORT,()=>{
    console.log(`Server is running PORT ${PORT}`);
});