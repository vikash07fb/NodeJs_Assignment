const bodyParser = require("body-parser");
const express = require("express");

// const router = express.Router();
const apiRoutes = require("./routes/index");

const connectToMongo = require('./db.js')



const { PORT } = require("../src/config/serverConfig");
const startAuthService = async function () {


   const app = express();
   
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use('/api', apiRoutes);
   //connect to mongodb
   connectToMongo();

   app.get('/',function(req,res){
       res.json({
        data: "Hello"
       })
   });
   app.listen(PORT,async function () {
      console.log(`Server started at ${PORT}`);
     
   });

}

startAuthService()