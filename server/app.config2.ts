// process.env.DEBUG="colyseus:*";
//
// import * as http from "http";
// import * as express from "express";
// import * as bodyParser from "body-parser";
// import * as WebSocket from "uws";
// import { Server, ServerOptions, Transport } from '@colyseus/core';
//
// // import { Server } from "../src/Server";
// import { MyRoom } from "src/rooms/MyRoom";
// import { RedisDriver, RedisPresence } from "colyseus";
//
// const port = Number(process.env.PORT || "2567");
// const endpoint = "localhost";
//
// const app = express();
//
// // Create HTTP & WebSocket servers
// // const server = http.createServer(app);
// const gameServer = new Server({
//     verifyClient: (info, next) => {
//         // console.log("custom verifyClient!");
//         next(true);
//     },
//     presence: new RedisPresence(),
//     // engine: WebSocket.Server,
//     // server: server
// });
//
// // Register ChatRoom as "chat"
// gameServer.re("chat", MyRoom).
//     // demonstrating public events.
//     on("create", (room) => console.log("handler: room created!", room.roomId)).
// on("join", (room, client) => console.log("handler: client", client.sessionId, "joined", room.roomId)).
// on("leave", (room, client) => console.log("handler: client", client.sessionId, "left", room.roomId)).
// on("dispose", (room) => console.log("handler: room disposed!", room.roomId));
//
// app.use(express.static(__dirname));
// app.use(bodyParser.json());
//
// gameServer.listen(port);
//
// console.log(`Listening on http://localhost:${ port }`)
