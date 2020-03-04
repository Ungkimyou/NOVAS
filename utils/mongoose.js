const mongoose = require("mongoose");
const config = require("../config.json")


module.exports = {
  init: () => {
    const dbOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      reconnectTries: Number.Max_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };

    mongoose.connect(config.URL, dbOptions);
    mongoose.set("useFindAndModify", false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
      console.log("Database [Connected]");
    });

    mongoose.connection.on("err", err => {
      console.log(`Database [Error] \n ${err.stack}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log(`Database [Disconnected]`);``
    });
    

  }
}  