import {BlockRoomState} from '@app/colyseus/schemas/BlockRoomState';
import {AiAgent} from '@app/colyseus/schemas/AiAgent';

import {YeagerEvent} from './event';

export abstract class YeagerHandler {
    public constructor(protected roomState: BlockRoomState) {
    }

    public abstract execute(msgObj: YeagerEvent): Promise<void>;

    protected getAiAgentFromMsg(msgObj: YeagerEvent): AiAgent {
        let aiAgent = this.roomState.aiAgents.get(msgObj.sender_id);
        if (!aiAgent) {
            aiAgent = new AiAgent(msgObj.sender_id);
            this.roomState.aiAgents.set(msgObj.sender_id, aiAgent);
        }
        return aiAgent;
    }
}
