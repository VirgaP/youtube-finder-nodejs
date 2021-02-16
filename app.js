const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 8080;

const app = express();
app.use(express.json()); 
app.use(cors())

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://admin:Tel422004!@cluster0.exyhg.mongodb.net/adminDB?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.listen(port, () => { console.log('Server is runningon port : ' + port) });

var recordSchema = new mongoose.Schema({
    query: String,
    create_date: { 
        type: Date,
        default: Date.now
    }
});

var Query = mongoose.model("Query", recordSchema, "query-logger");

app.post("/api/add-query", (req, res) => {
    var myData = new Query(req.body);
    myData.save()
        .then(item => {
            res.send(item.query + " Query saved to database");
        })
        .catch(err => {
            res.status(400).send("Error while saving to database");
        });
});

var videoSchema = new mongoose.Schema({
    videoId: String,
    create_date: { 
        type: Date,
        default: Date.now
    }
});

var Video = mongoose.model("Video", videoSchema, "video-logger");

app.post("/api/add-video", (req, res) => {
    var myData = new Video(req.body);
    myData.save()
        .then(item => {
            res.send(item.videoId + " Video saved to database");
        })
        .catch(err => {
            res.status(400).send("Error while saving to database");
        });
});
