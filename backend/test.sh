#!/bin/bash

# Start the API server in the background
#python api.py &
#server_pid=$!

# Wait for the server to start (give it some time)
#sleep 2

# Test endpoints
curl -X GET http://127.0.0.1:5000/notes
curl -X GET http://127.0.0.1:5000/notes/test.txt
curl -X PUT -H "Content-Type: application/json" -d '{"content": "This is a test"}' http://127.0.0.1:5000/notes/test.txt
curl -X GET http://127.0.0.1:5000/notes/test.txt

# Stop the API server
#kill $server_pid
