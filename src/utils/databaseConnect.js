const mongoose = require("mongoose");

async function databaseConnect(url, dbName, log) {
    await mongoose.connect(url, {
        dbName: dbName
    });

    console.log(log);
}


module.exports = databaseConnect;