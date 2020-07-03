const crypto = require ('crypto');
const {parentPort} = require('worker_threads');

let tgt = '000000f000000000000000000000000000000000000000000000000000000000';

parentPort.on('message', msg => {
    let data = msg.data;
    let nonce = mine(data);
    parentPort.postMessage({nonce : nonce});
});

function mine(data) {
    
    for (let i = 0; ; ++i)
    {
        hashed = crypto.createHash('sha256').update(data + i).digest('hex');
        if (hashed < tgt)
            return i; 
    }
}