const express = require('express');
const path = require("path");

//DATABASE INTEGRATION
const mongoose = require("mongoose");

//MULTER & GRID FS (UPLOAD PART)
const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");


const dbURI =
    "mongodb+srv://dbUser:dbUser@mycluster-jzhgv.azure.mongodb.net/elk_logs?retryWrites=true&w=majority";

//creating the storage engine
const storage = new GridFsStorage({
    url: dbURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: "elk-logs",
                dateAdded: Date(),
                fileType: `SLURM ${path.extname(file.originalname)} log type.`
            };
            resolve(fileInfo);
        });
    }
});
const mongoupload = multer({ storage: storage });

module.exports = mongoupload;