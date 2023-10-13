import { Room, Client } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";
import { logger } from "@colyseus/core";


export class MyRoom extends Room<MyRoomState> {
  // maxClients = 1;
  autoDispose = false;
  seatReservationTime = 500;

  // locked = false;
  private = false;
  publicAddress = 'c3-gameplay.proudpond-8890b9fe.eastasia.azurecontainerapps.io:443'
  processId = 'one'
  // roomId: string;
  // createdAt: Date;
  // unlisted: boolean;

  onCreate (options: any) {

    // ensure clock timers are enabled

    this.onMessage("*", (client: Client, type, message) => {
      logger.info(`[${type}] retrieve msg: ${JSON.stringify(message)}`);
      // this.presence.
    });

    this.onMessage("send_chat", (client: Client, message) => {
      logger.info(`${client.sessionId}[send_chat]: ${JSON.stringify(message)}`);
      this.broadcast('recieve_chat', message);
    });

  }

  onJoin (client: Client, options: any) {
    logger.info(`${client.sessionId} joined!`);
  }

  onLeave (client: Client, consented: boolean) {
    logger.info(`${client.sessionId} left!`);
  }

  onDispose() {
    logger.info(`room ${this.roomId} disposing...`);

  }
}
