# server_combo

Currently has two server/client pairs
One is for udp 
The other is for a secure websocket

The goal is to set up a secure websocket then use the udp server in conjunction


To test currently in three terminals:
1. node combo_server.js
2. node TLS_Socket_Client.js
3. node test_udp_client.js