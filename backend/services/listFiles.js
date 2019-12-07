const fs = require("fs");
const path = require("path");

const FOLDERPATH = path.join(__dirname + "/../" + "/uploads/");
const FOLDERPATH_exact = '/home/robert.poenaru/elk/elk_mean_loggingWebApp/backend/uploads/';
/* 
function checkFolder(fileList) {
    return new Promise((resolve, reject) => {
        var files = fs.readdir(FOLDERPATH, (err, files) => {
            var count = 0;
            files.forEach(file => {
                count += 1;
                fileList.push({
                    id: count,
                    FileName: file,
                    LastMod: 1,
                    Details: `SLUM log file @DFCTI server`
                });
            });
            if (count != 0) {
                resolve();
            } else {
                reject('Empty folder');
            }
        });
    })
}

const showStats = (testfile, count, filelist) => {
    return new Promise((resolve, reject) => {
        var t = fs.stat(testfile, (err, stats) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                filelist[count].LastMod = stats.mtime;
                resolve(showStats);
            };
        })
    })
} */

module.exports = {
    checkFolder: fileList => {
        return new Promise((resolve, reject) => {
            fs.readdir(FOLDERPATH, (err, files) => {
                var count = 0;
                files.forEach(file => {
                    count += 1;
                    fileList.push({
                        id: count,
                        FileName: file,
                        LastMod: 11,
                        Details: `SLUM log file @DFCTI server`
                    });
                });
                if (count != 0) {
                    resolve();
                } else {
                    reject("Empty folder");
                }
            });
        });
    },
    showStats: (testfile, count, filelist) => {
        return new Promise((resolve, reject) => {
            fs.stat('/home/robert.poenaru/elk/elk_mean_loggingWebApp/backend/uploads/SLURMlog-1575732544448.log', (err, stats) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(stats.mtime);
                    filelist[count].LastMod = stats.mtime;
                    resolve();
                }
            });
        });
    }
};