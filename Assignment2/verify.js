const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

io.question("Enter path to public key: ", str =>{
    let pubKey
    try {
        pubKey = fs.readFileSync(str);
    } catch (err) {
        console.log("Wrong public Key file")
        console.log("Using defult pubKey.pem")
        pubKey = fs.readFileSync("pubKey.pem")
    }
    io.question("Enter signature's file name or directly enter signature: ", str => {
        let sign;
        try {
            sign = fs.readFileSync(str);
        } catch(err) {
            sign = Buffer.from(str, 'hex');
        }
        console.log(sign);
        io.question("Enter claimed message text: ", str => {
            const verify = crypto.createVerify("RSA-SHA256");
            verify.write(str);
            verify.end();
            let res = verify.verify({key:pubKey, padding:crypto.constants.RSA_PKCS1_PSS_PADDING}, sign, 'hex');
            console.log(res);
            if(res === true)
                console.log("Verified, Message Correct! :)");
            else
                console.log("Incorrect msg! :(");
            io.close();
        }) 
    })
})