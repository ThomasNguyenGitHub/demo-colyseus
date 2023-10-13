// import http from 'http';
import {Client, Room} from '@colyseus/core';

import {WsHandler} from '@app/api/ws/WsHandler';

import {BlockRoomState} from '../schemas/BlockRoomState';
import {Spectator} from '../schemas/Spectator';
import {logger} from "@app/infra/logger";

export interface BlockRoomCreateOptions {
    maxClients: number;
    // ---
    mapId: string;
}
export class BlockRoom extends Room<BlockRoomState> {
    private wsHandler: WsHandler;

    public override onCreate(options: BlockRoomCreateOptions): void {
        this.autoDispose = false;
        this.maxClients = options.maxClients;
        const roomState = new BlockRoomState();

        roomState.mapId = options.mapId;
        this.setState(roomState);

        // TODO Disable agent, move to next phase
        // this.wsHandler = new WsHandler(roomState);
        // this.wsHandler.start()
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    // public override onAuth(client: Client, options: any, request: http.IncomingMessage): void {}

    // When client successfully join the room
    public override onJoin(client: Client): void {
        this.state.spectators.set(client.sessionId, new Spectator(client.sessionId));
        logger.info('onJoin: ', client)
    }

    // When a client leaves the room
    public override onLeave(client: Client): void {
        if (this.state.spectators.has(client.sessionId)) {
            this.state.spectators.delete(client.sessionId);
            console.log(JSON.stringify(client));
            logger.info('onLeave: ', client)
        }
    }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    public override onDispose(): void {
        this.wsHandler.stop();
    }
}
