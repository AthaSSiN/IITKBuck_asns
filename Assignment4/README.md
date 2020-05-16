Run the program using  

```bash
node readTxn.js
>>> Enter the relative path to the binary file to be read:
cbbee9817ab2585079ce0490369ea016808df2349a736a2ae19db4247cc9b96e.dat
```

The default file is chosen as 010.dat with the hash 92a7c6d00b98e7824efe0a61bed2c9c7bbe7d787a15ff7dd8117bded3b74654d.
The outputs are displayed in the console in the following format:  

```bash
Transaction ID: <in hex format>  
Number of inputs: <an integer>  
    Input 1:  
        Transaction ID: <in hex format>  
        Index: <an integer>  
        Length of the signature: <an integer>  
        Signature: <in hex format>  
    Input 2:  
        Transaction ID: <in hex format>  
        Index: <an integer>  
        Length of the signature: <an integer>  
        Signature: <in hex format>  
    ...  
Number of outputs: <an integer>  
    Output 1:  
        Number of coins: <an integer>  
        Length of public key: <an integer>  
        Public key: <in PEM format>  
    Output 2:  
        Number of coins: <an integer>  
        Length of public key: <an integer>  
        Public key: <in PEM format>  
    ...  
```
