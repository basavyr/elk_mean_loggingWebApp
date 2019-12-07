const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//DATABASE INTEGRATION
const mongoose = require("mongoose");

//MULTER & GRID FS (UPLOAD PART)
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

//FILESYSTEM
const path = require("path");
const fs = require("fs");
//USE EXPRESS
const app = express();
//SERVER PORT
const PORT = 8083;

const JSONFOLDER =
    "/home/robert.poenaru/elk/elk_mean_loggingWebApp/backend/data/";

//IMPORT MODULES
const diskupload = require("./services/diskUpload");
const mongoupload = require("./services/mongoDBUpload");
const fileLister = require("./services/listFiles");
//middle-ware
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//mongo DATA
const dbURI =
    "mongodb+srv://dbUser:dbUser@mycluster-jzhgv.azure.mongodb.net/elk_logs?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
// mongoose.connect(bdURI, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.createConnection(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//init gfs
let gfs;

conn.once("open", () => {
    //initialize the stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("elk-logs");
});
/* 
//set storage engine with multer
// SET STORAGE ON DISK (LOCAL SERVER)
const diskstorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname + '/uploads/'));
        // cb(null, '/home/robert.poenaru/PIPELINE/DevWorkspace/NODEJS/elasticServer/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const diskupload = multer({ storage: diskstorage });
 */
const uploadFiles = (req, res, next) => {
    diskupload.single("SLURMlog")(req, res, next);
    mongoupload.single("SLURMlog")(req, res, next);
};

app.get("/mongo", (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({ err: "No files" });
        } else {
            var arr = [];
            files.forEach(element => {
                arr.push({
                    id: element._id,
                    FileName: element.filename,
                    dateAdded: Date()
                });
            });
            return res.send(arr);
        }
    });
});

app.get("/disk", async(req, res) => {
    try {
        var fileList = [];
        await fileLister.checkFolder(fileList);
        for (let index = 0; index < fileList.length; index++) {
            await fileLister.showStats(fileList[index].FileName, index, fileList);
        }
        let data = JSON.stringify(fileList);
        fs.writeFile(path.join(JSONFOLDER, "data.json"), data, "utf-8", err => {
            if (err) throw err;
            console.log("Created JSON data...");
        });
        res.send(fileList);
    } catch (err) {
        console.log(err);
        res.send("not good");
    }
});

app.get("/index", (req, res) => {
    res.render(path.join(__dirname + "/views/" + "index.ejs"));
});

app.post("/upload", uploadFiles, (req, res) => {
    console.log({ file: req.file });
    // res.send(req.file);
    res.redirect("/disk");
    // res.send({ file: req.file });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));