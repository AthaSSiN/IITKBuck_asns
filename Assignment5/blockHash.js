const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto')
const now = require('nano-time');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter index of the block: ", index => {
    rl.question("Enter hash of the parent block: ", pHash=> {
        if(pHash.length != 64)
        {
            console.log("Set to default:  2b21ef8ab698e7daf03ccf0110acb4d844fabb5b9513221285f96593d4d4a573");
            pHash = "2b21ef8ab698e7daf03ccf0110acb4d844fabb5b9513221285f96593d4d4a573";
        }
        rl.question("Enter the target hash: ", tHash => {
            if(tHash.length != 64)
            {
                console.log("Set to default:  0000000f00000000000000000000000000000000000000000000000000000000");
                tHash = "0000000f00000000000000000000000000000000000000000000000000000000";
            }
            rl.question("Enter the name of the file containing the block body: ", str => {
                blockHash(index, pHash, tHash, str);
                rl.close();
            })
        })
    })
})

function blockHash(index, pHash, tHash, str)
{
    let mainBuf = Buffer.alloc(116);
    mainBuf.write(writeInt(index, 4), 0, 4, 'hex');
    mainBuf.write(pHash, 4, 32, 'hex');
    
    let buf;

    try {
        buf = fs.readFileSync(str);
    } catch (err) {
        console.log("Reading default file 015.dat");
        buf = fs.readFileSync("015.dat");
    }

    let bHash = crypto.createHash('sha256').update(buf).digest('hex');

    mainBuf.write(bHash, 36, 32, 'hex');
    mainBuf.write(tHash, 68, 32, 'hex');

    console.log(mainBuf.toString('hex'));
    
    let start, end, hash;
    for(let i = 0n; ; i += 1n)
    {
        if(!i)
        {
            start = BigInt(now());
            end  = start;
        }
        else
        {
            end = BigInt(now());
        }
        mainBuf.write(writeInt(end,8), 100, 8, 'hex');
        mainBuf.write(writeInt(i, 8), 108, 8, 'hex');

        hash = crypto.createHash('sha256').update(mainBuf).digest('hex');
        
        if(hash < tHash)
        {
            console.log(`Block Hash: ${hash}`);
            console.log(`Timestamp: ${end}`);
            console.log(`Nonce: ${i}`);
            console.log(`Time taken: ${(end-start)/10n**9n}s`);
            break;
        }
    }
}

function writeInt(num, size = 4)
{
    let arr = new Uint8Array(size);
    if(size === 4)
        for(let i = 0; i < size; ++i)
        {
            arr[size-i-1] = num%256;
            num = num >> 8;
        }
    else
        for(let i = 0; i < size; ++i)
        {
            arr[size-i-1] = parseInt(num%256n);
            num = num/256n;
        }
    return Buffer.from(arr).toString('hex');
}