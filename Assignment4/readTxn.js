const fs = require('fs');
const readline = require('readline');
const Transaction = require("../classes/Transaction");
const Output = require("../classes/Output");
const Input = require("../classes/Input");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter the hash of the transaction to be read: ", hash => {
    let str;
    try {
        let check = hash.toString().concat(".dat");
        str = fs.readFileSync(hash);
    } catch(err) {
        hash = "cbbee9817ab2585079ce0490369ea016808df2349a736a2ae19db4247cc9b96e";
        console.log("File not found, reading the sample file cbbee9817ab2585079ce0490369ea016808df2349a736a2ae19db4247cc9b96e.dat");
        str = fs.readFileSync("cbbee9817ab2585079ce0490369ea016808df2349a736a2ae19db4247cc9b96e.dat");
    }
    let txn = new Transaction;
    txn.numInputs = readInt(str, 0,4);
    let start = 4;

    for (let i = 0; i < txn.numInputs; ++i)
    {
        let input = new Input;
        input.txnID = str.toString("hex", start, start + 32);
        start += 32;
        input.index = readInt(str, start, start + 4);
        start += 4;
        input.sigLength = readInt(str, start, start + 4);
        start += 4;
        input.sig = str.toString("hex", start, start + input.sigLength/2);
        start += input.sigLength/2;
        txn.pushInputs(input);
    }

    txn.numOutputs = readInt(str, start, start + 4);
    start += 4;
    
    for (let i = 0; i < txn.numOutputs; ++i)
    {
        let output = new Output;
        output.coins = readInt(str, start, start + 8);
        start += 8;
        output.pubKeyLen = readInt(str, start, start + 4);
        start += 4;
        output.pubKey = str.toString("utf-8", start, start + output.pubKeyLen);
        start += output.pubKeyLen;
        txn.pushOutputs(output);
    }

    console.log(`Transaction ID : ${hash}\n`);
    console.log(`Number of inputs: ${txn.numInputs}\n`);

    let inputs = txn.getInputs();
    let i = 1;
    for(let input of inputs)
    {
        console.log(`   Input ${i}:`);
        console.log(`       Transaction ID: ${input.txnID}`);
        console.log(`       Index: ${input.index}`);
        console.log(`       Length of Signature: ${input.sigLength}`);
        console.log(`       Signature: ${input.sig}\n`);
        i++;
    }

    console.log(`Number of outputs: ${txn.numOutputs}\n`); 

    let outputs = txn.getOutputs();
    i = 1;
    for(let output of outputs)
    {
        console.log(`   Output ${i}:`);
        console.log(`       Number of coins: ${output.coins}`);
        console.log(`       Length of public Key: ${output.pubKeyLen}`);
        console.log(`       Public Key: ${output.pubKey}\n`);
        i++;
    }
    rl.close();
})

function readInt(str, start, end)
{
    let size = end - start;
    if(size === 4)
    {
        let ans = 0;
        for(let i = 0; i < size; ++i)
        {
            ans = ans << 8;
            ans += str[i + start];
        }
        return ans;
    }

    else
    {
        let ans = 0n;
        for (let i = 0; i < size; ++i)
        {
            ans = ans * 256n;
            ans += BigInt(str[i+start])
        }
        return ans;
    }
}