Run the server using:
```bash
node server.js
```

NOTE: server.js hosts on localhost:8000 and dummy.js hosts on localhost:9000

So, make a URL using ngrok

```bash
ngrok http 800
```

Add the peer URLs in the peers list of server.js ( for testing use the dummy.js server)

Send requests to the server:  

1. Adding to the map:
```
http --json http://path.to.url/add key:=19 value="abc"
```

2. Getting contents from the map:
```
http http://path.to.url/list
```