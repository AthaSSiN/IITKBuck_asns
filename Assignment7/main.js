const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const Worker = require('worker_threads');
 
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

let mined = false;
let nonce = -1;

const worker = new Worker('./worker.js');

app.post('/start', (req, res) => {
    let msg = req.body.data;
    worker.postMessage({data : msg});
    res.status(200).send("Mining started");
});

worker.on('message', msg => {
    nonce = msg.nonce;
    mined = true;
});

app.get('/result', (req, res) => {
    let data;
    if (mined === true) 
        data = {"result" : "found", "nonce" : nonce};
    else 
        data = {"result" : "searching", "nonce" : nonce};
    
    data = JSON.stringify(data);
    res.send(data);
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
