const mongoose = require('mongoose');


const connectToMongo =async function() {
  await   mongoose.connect('mongodb://0.0.0.0:27017/auth_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

  console.log("connected to mongodb");
}

module.exports = connectToMongo;
