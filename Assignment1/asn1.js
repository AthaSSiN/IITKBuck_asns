var express = require("express");
var crypto = require("crypto");

var app = express();

app.get('/hash', (req, res) => {
    let i = 0;
    var str = req.query.string;
    var input;
    var output;
    do 
    {
        i++;
        input = str + i;
        output = crypto.createHash('sha256').update(input).digest('hex');
    } while(output.substring(0,4) !== "0000");
    var send = `For the string \"${str}\" <br> Magic Number : ${i} <br> SHA256 hash in hex : ${output}`;
    res.send(send);
})

app.listen(8000);

console.log("Listening on port 8000")