const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

io.question('Enter message to be signed: ', msg => {
    let sign = signer(msg);
    if(sign !== null)
    {
        console.log("Signing successful");
        console.log(sign);
        fs.writeFileSync("sign", sign, 'hex');
        io.close();
    }
})

function signer(str) 
{
    let privKey = fs.readFileSync("privKey.pem");
    const sign = crypto.createSign("SHA256");
    sign.write(str);
    sign.end();
    const signature = sign.sign({key : privKey, padding : crypto.constants.RSA_PKCS1_PSS_PADDING}, 'hex');
    return signature;
}