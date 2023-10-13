import {MapSchema, Schema as ColyseusSchema, type as ColyseusType} from '@colyseus/schema';

import {BlockRoomSchema} from '@shared/colyseus/schemas';

import {AiAgent} from './AiAgent';
import {Spectator} from './Spectator';

export class BlockRoomState extends ColyseusSchema implements BlockRoomSchema {
    @ColyseusType('string')
    public mapId: string;

    @ColyseusType({map: AiAgent})
    public aiAgents = new MapSchema<AiAgent>();

    // ---------------------------------------------------------------------------

    public spectators = new Map<string, Spectator>();
}
