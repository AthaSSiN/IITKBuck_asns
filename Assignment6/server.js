const express = require('express');
const request = require('request');

const app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let peers = ['1261fcf5.ngrok.io', 'cb47f473.ngrok.io'];

let dict = new Map();
  
function updateClient(url, data){
    let clientServerOptions = {
        uri: 'http://'+url+'/add',
        body: data,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, (err, res, body) => {
        console.log(body);
        return;
    });
}


app.post('/add', (req,res) => {
    let key = req.body.key;
    let value = req.body.value;
    let data = JSON.stringify({key: key, value: value})
    if(dict.has(key) === false)
    {
        dict.set(key, value);
        console.log(`AthaSSiN: Set ${key}: ${value}`);
        for(let url of peers)
        {
            updateClient(url, data);
            console.log(`AthaSSiN: Sent ${key}: ${value} to ${url}`)
        }
        res.send(`AthaSSiN: Set ${key}: ${value} and told ${peers.length} peer(s) about it`);
    }
    else
    {
        res.send(`AthaSSiN: Key already exists`);
    }
})

app.get('/list', (req,res) => {
    console.log("*****LIST*****");
    let obj = Object.fromEntries(dict);
    obj = JSON.stringify(obj);
    console.log(obj);
    res.send(obj);
})

app.listen(8000);

console.log("Listening on port 8000")
