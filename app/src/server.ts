import 'module-alias/register';

import {matchMaker, Server} from '@colyseus/core';
import { MongooseDriver } from '@colyseus/mongoose-driver';
import {RedisDriver} from '@colyseus/redis-driver';
import {RedisPresence} from '@colyseus/redis-presence';
import {WebSocketTransport} from '@colyseus/ws-transport';
import {createServer} from 'http';

import {createApp} from './api/rest/app';
import {initColyseusServer} from './colyseus';
import {config} from './config';
import {logger} from './infra/logger';
import {getMongoDbURL} from "@app/infra/mongodb";
import {error} from "winston";

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

async function main(): Promise<void> {
    const expressApp = createApp();

    const {port, host} = config.server;

    // Restrict the client-side from creating rooms
    matchMaker.controller.exposedMethods = ['join', 'joinById', 'reconnect', 'joinOrCreate'];

    await sleep(2000);
    const gameServer = new Server({
        greet: true,
        devMode:true,
        transport: new WebSocketTransport({
            server: createServer(expressApp),
        }),
        presence: new RedisPresence({
            host: config.redis.host,
            port: config.redis.port,
            db: 3,
            password:config.redis.password,
            // prefix: config.redis.prefix,
        }),
        // driver: new MongooseDriver(getMongoDbURL('c3'))
        //TODO

        driver: new RedisDriver({
            host: config.redis.host,
            port: config.redis.port,
            db: 3,
            password:config.redis.password,
            // prefix: config.redis.prefix,
        }),
    });

    gameServer.onShutdown(async () => {
        logger.info('closing colyseus...');
    });

    await initColyseusServer(gameServer);

    gameServer.listen(port, host).then(r =>{
        logger.info('Colyseus start');
    })

}

main();
