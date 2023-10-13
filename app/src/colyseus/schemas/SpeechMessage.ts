import {SpeechMessageSchema} from '@shared/colyseus/schemas';

import {Schema as ColyseusSchema, type as ColyseusType} from '@colyseus/schema';

export class SpeechMessage extends ColyseusSchema implements SpeechMessageSchema {
    @ColyseusType('string')
    public text = '';

    @ColyseusType('number')
    public timestamp: number;

    public constructor(text?: string, date?: Date) {
        super();
        if (text) this.text = text;
        if (date) this.timestamp = date.getTime();
        else this.timestamp = (new Date()).getTime();
    }
}
