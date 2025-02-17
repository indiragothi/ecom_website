const express = require('express');
const app = express()
const cors = require('cors')
const multer = require('multer')
const md5 = require('md5')
const path = require('path')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const dotenv = require('dotenv')
const compression = require('compression');
const errormidleware = require('./middleware/error')

app.use(compression());
app.use(express.json())
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config({ path: './config/config.env' })
require('./config/conn')
 
app.use(cors());
 
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const product = require('./Routes/productroute')
const user = require('./Routes/userrouter')
const category = require('./Routes/categoryroute')
const brand = require('./Routes/brandroute')
const cart = require('./Routes/cartroute')
const wishlist = require('./Routes/wishlistroute')

app.use("/uploads/", express.static("uploads/"));
app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", category);
app.use("/api/v1/", brand);
app.use("/api/v1/", cart)
app.use("/api/v1/", wishlist)


app.post('/uploading', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, callback) {
      callback(null, md5(Date.now()) + path.extname(file.originalname));
    }
  });

  const uploaFile = multer({
    storage: storage,
  }).single('image');

  uploaFile(req, res, async (err) => {

    if (!req.file) {
      res.status(500).send({
        sucecess: false,
        data: [],
        message: "Select File"
      });

    } else if (err) {
      res.status(500).send({
        sucecess: false,
        data: [],
        message: "not upload"
      });

    } else {

      res.status(200).send({
        sucecess: true,
        data: { filepath_url: req.file.filename, url: process.env.MAIN_URL + "uploads/" + req.file.filename },
        message: "",
      });

    }
  });
})


app.use(errormidleware);
app.listen(process.env.PORT, () => {
  console.log(`server builded ${process.env.PORT}`)
})