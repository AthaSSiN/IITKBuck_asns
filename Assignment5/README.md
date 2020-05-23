## Assignment 5

To run:
```bash
node blockHash.js
```

A sample block body file is 015.dat

The format for block Header, and the hence formed concatenated string that is used to calculate the block Hash:

 - The first 4 bytes represent an integer. This is the index of the block.
 - The next 32 bytes represent the SHA256 hash of the parent block.
 - The next 32 bytes represent the SHA256 hash of the block body.
 - The next 32 bytes represent the target value.
 - The next 8 bytes represent a 64-bit integer. This is the timestamp.
 - The next 8 bytes represent a 64-bit integer. This is the nonce value.

Hence the concatenated string will be of 116 bytes

### Test run:

Using the following values:

```
Index: 5
Hash of parent block: 2b21ef8ab698e7daf03ccf0110acb4d844fabb5b9513221285f96593d4d4a573
Target: 0000000f00000000000000000000000000000000000000000000000000000000
Block body: 015.dat
```

The obtained results were:
```
Block Hash: 0000000376f659010b9d4fbeea7b8fd9b046465298f509215828c373e7bb3cda
Timestamp: 1590238754956864372
Nonce: 58680625
Time taken: 481s
```