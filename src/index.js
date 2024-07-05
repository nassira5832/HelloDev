const express = require("express");
const app     = express();
const cors    = require("cors");
const fs      = require('fs');
const dotenv  = require("dotenv");
dotenv.config();
const multer          = require("multer");
const databaseConnect = require("./utils/databaseConnect");
const fileModel       = require("./models/files");
const pageNotFound    = require("./middlewares/pageNotFound");
const requestLogger   = require("./middlewares/requestLogger");


// TODO: move it to the config
const uploader = multer({
    "dest": "../res/users_files/"
});


app.use(express.json());
app.use(cors());
app.use(requestLogger);


//TODO: Create a router "/file"
// app.get("/file", async function (req, res) {
//     const filesData = await fileModel.find({});

//     res.status(200).json(filesData);
// });
app.get("/file/:id", async function (req, res) {
    const id = req.params.id;
    const fileData = await fileModel.findOne({
        _id: id
    });

    res.status(200).json(fileData);
});
app.post("/file", uploader.single("file"), async function (req, res) {
    const file = req.file;

    if (!file)
    {
        res.status(400).json(`File missing`);
        return;
    }
    // console.log(file);

    try {
        await fileModel.create({
            fieldname: file.fieldname,
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            destination: file.destination,
            filename: file.filename,
            path: file.path,
            size: file.size
        });
    
        res.status(200).json(`File Uploaded Successfully`);
    } catch (error) {
        res.status(500).json(`File Uploaded UnSuccessfully`);
        console.error(`Error, file can't be saved to DB:${error}`);
    }
});
app.put("/file/:id", uploader.single("file"), async function (req, res) {
    const file = req.file;

    if (!file)
    {
        res.status(400).json(`File missing`);
        return;
    }
    // console.log(file);

    const id = req.params.id;

    try {
        const fileData = await fileModel.findOne({
            _id: id
        });

        if (!fileData)
        {
            res.status(400).json(`File ID not Found`);
            return;
        }
        // console.log(fileData);

        fs.rmSync(fileData.path);
    
        fileData.fieldname = file.fieldname;
        fileData.originalname = file.originalname;
        fileData.encoding = file.encoding;
        fileData.mimetype = file.mimetype;
        fileData.destination = file.destination;
        fileData.filename = file.filename;
        fileData.path = file.path;
        fileData.size = file.size;
    
        await fileData.save();
    
        res.status(200).json(`File Uploaded Successfully`);
    } catch (error) {
        res.status(500).json(`File Updated UnSuccessfully`);
        console.error(`Error, file can't be saved to DB:${error}`);
    }
});
app.delete("/file/:id", async function (req, res) {
    const id = req.params.id;

    try {
        const fileData = await fileModel.findOne({
            _id: id
        });

        if (!fileData)
        {
            res.status(400).json(`File ID not Found`);
            return;
        }
        // console.log(fileData);
        
        await fileModel.deleteOne({
            _id: id
        });
        fs.rmSync(fileData.path);

        res.status(200).json(`File Deleted Successfully`);
    } catch (error) {
        res.status(500).json(`File Deleted UnSuccessfully`);
        console.error(`Error, file can't be Deleted:${error}`);
    }
});


app.use(pageNotFound);


const PORT = 80;
const dbName = "filesDB";

// TODO: move it to utils
async function start() {
    try {
        await databaseConnect(process.env.DATABASE_URL, dbName, `Connect to the DB:${dbName}`);
        
        app.listen(PORT, function () {
            console.log(`My server started at port:${PORT}`);
        });
    } catch (error) {
        console.error(`Error, server can't start:${error}`);
    }
}


start()
