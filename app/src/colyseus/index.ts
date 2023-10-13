import {matchMaker, Server} from '@colyseus/core';

import {BlockRoom, BlockRoomCreateOptions} from './rooms/BlockRoom';
import {isGracefullyShuttingDown} from "@colyseus/core/build/MatchMaker";

export async function initColyseusServer(gameServer: Server): Promise<void> {
    gameServer.define('block', BlockRoom);

    const roomOptions = {
        mapId: '1',
        maxClients: 100,
        isGracefullyShuttingDown : true,

        // locked = false;
        // private = false,
        publicAddress : 'c3-gameplay.proudpond-8890b9fe.eastasia.azurecontainerapps.io:443'
    };
    await matchMaker.createRoom('block', roomOptions);
}
