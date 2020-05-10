const { generateKeyPair } = require('crypto');
const fs = require('fs');

generateKeyPair('rsa', 
{
  modulusLength: 4096,
  publicKeyEncoding: 
  {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: 
  {
    type: 'pkcs8',
    format: 'pem'
  }
},  function(err, pubKey, privKey) 
    {
        if(err)
        {
            console.log("Error encountered: ", err);
        }
        else
        {
            console.log("Key pair generated successfully")
            fs.writeFileSync("pubKey.pem", pubKey);
            fs.writeFileSync("privKey.pem", privKey);
            console.log("contents written to ./pubKey.pem and ./privKey.pem");

        }
    });